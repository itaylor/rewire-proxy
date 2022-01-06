import template from '@babel/template';

export default function ({types: t}) {
  const VISITED = Symbol('visited');

  const defaultIdentifier = t.identifier('default');

  // TODO: bundle as separate package
  const buildRewireObjects = template(`
    import _rewireProxyRuntime from '@itaylor/babel-plugin-rewire-proxy/lib/rewireProxyRuntime.js'
    const _$rwRuntime = _rewireProxyRuntime();
    const _$rwProx = _$rwRuntime._add;
    export { _$rwRuntime as __RewireAPI__ }`);

  const proxyTemplate = template(`
    let EXTERNALNAME = _$rwProx(INTERNALNAME, EXTERNALNAMESTR, () => EXTERNALNAME , (val) => EXTERNALNAME = val);`);

  const functionDeclProxyTemplate = template(`
    const INTERNALNAME = FUNCDECL;
    let PROXYNAME = _$rwProx(INTERNALNAME, EXTERNALNAMESTR, () => EXTERNALNAME );
    function EXTERNALNAME(...args) {
      return PROXYNAME(...args);
    }`);
  
  function buildProxyTemplate(externalName) {
    return proxyTemplate({
      EXTERNALNAME: t.identifier(externalName),
      INTERNALNAME: t.identifier(`${externalName}_rewire`),
      EXTERNALNAMESTR: t.stringLiteral(externalName),
    });
  }

  function markVisited(node) {
    node[VISITED] = true;
    return node;
  }

  return {
    name: 'rewire-proxies',
    visitor: {
      Program: {
        enter(_, state) {
          state.exports = [];
        },
        exit(path, {exports}) {
          // // de-duplicate the exports (do we really need this???)
          // const unique = exports.reduce((acc, e) => {
          //   const key = e.external.name;
          //   if (!acc[key]) {
          //     acc[key] = e;
          //   }
          //   return acc;
          // }, {});
          // exports = Object.keys(unique).map(k => unique[k]);
          
          if (exports.length) {
            path.pushContainer('body', markVisited(
              t.exportNamedDeclaration(null, exports.map(e => {
                return t.exportSpecifier(e.local, e.external)
              }))
            ));
          }          
          path.unshiftContainer('body', buildRewireObjects({}).map(markVisited));
        }
      },
      VariableDeclaration(path) {
        if (path.node[VISITED]) return;
        if (path?.scope?.block?.type === 'Program') {
          // only modify top level variables 
          // don't modify "private" funcs prefixed with _ (babel adds some)
          const name = path?.node?.declarations[0]?.id?.name;
          if (name && name.startsWith('_')) return;
          
          const newDecls = path.node.declarations.map((d) => {
            const cloned = t.cloneNode(d, true);
            const origName = cloned.id.name;
            cloned.id.name = `${origName}_rewire`;
            return { origName, newName: cloned.id.name, node:cloned };
          })
          path.replaceWith(t.variableDeclaration('const', newDecls.map(nd => nd.node)));
          markVisited(path.node);
          newDecls.reverse().forEach(({ origName }) => {
            path.insertAfter(markVisited(buildProxyTemplate(origName)));
          });
        }
      },
      ClassDeclaration(path) {
        if (path.node[VISITED]) return;
        if (path?.parent?.type === 'Program') {
          const cloned = t.cloneNode(path.node);
          const origName = cloned.id.name;
          cloned.id.name = `${origName}_rewire`;
          path.replaceWith(markVisited(cloned));
          path.insertAfter(markVisited(buildProxyTemplate(origName)));
        }
      },
      FunctionDeclaration(path) {
        if (path.node[VISITED]) return;
        if (path?.parent?.type === 'Program') {
          // only modify top level functions

          // in order to preserve function hoisting behavior
          // we need to convert in the following way:
          //  * rename original function decl
          //  * make const var for proxy of original fn
          //  * make passthrough function decl with original name that calls to proxy
          const origId = path.node.id.name;
          // don't modify "private" funcs prefixed with _ (babel adds some)
          if (origId.startsWith('_')) return;

          const newFnExpression = t.cloneNode(path.node);
          newFnExpression.type = 'FunctionExpression'; //A functionExpression is just like a FunctionDeclaration, without a name.
          delete newFnExpression.id;
          const statements = functionDeclProxyTemplate({
            PROXYNAME: t.identifier(`${origId}_proxy_rewire`),
            FUNCDECL: newFnExpression,
            INTERNALNAME: t.identifier(`${origId}_rewire`),
            EXTERNALNAME: t.identifier(origId),
            EXTERNALNAMESTR: t.stringLiteral(origId),
          });
          statements.forEach(markVisited);
          path.replaceWithMultiple(statements);
        }
      },      
      ImportDeclaration(path) {
        if (path.node[VISITED]) return;
        const specifiers = path.node.specifiers;
        for (const s of specifiers) {
          if (s.type === 'ImportDefaultSpecifier' || s.type === 'ImportSpecifier' || s.type === 'ImportNamespaceSpecifier' ) {
            const externalName = s.local.name;
            if (externalName.endsWith('_rewire')) {
              //don't mess with imports of rewire functions
              continue;
            }
            const internalName = `${externalName}_rewire`;
            s.local.name = internalName;
            path.insertAfter(markVisited(buildProxyTemplate(externalName)));
          }
        }
        path.replaceWith(markVisited(t.ImportDeclaration(specifiers, path.node.source)));
      },
      // export default
      ExportDefaultDeclaration(path, {exports}) {
        if (path.node[VISITED]) return;
        
        const declaration = path.node.declaration;
        const isIdentifier = t.isIdentifier(declaration);
        const binding = isIdentifier && path.scope.getBinding(declaration.name);
        if (isIdentifier && binding) {
          // export default foo
          exports.push({ local: declaration.id, external: defaultIdentifier });
        } else if(t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
          // export default class {
          // export default function {}
          declaration.id = path.scope.generateUidIdentifier('default');
          exports.push({ local: declaration.id, external: defaultIdentifier });
          path.replaceWith(declaration);
        } else {
          // export default "somevalue"
          const id = path.scope.generateUidIdentifier('default');
          path.replaceWith(t.variableDeclaration('const', [t.variableDeclarator(id, declaration)]));
          exports.push({ local: id, external: defaultIdentifier});
        }
      },
      // export {}
      ExportNamedDeclaration(path, {exports}) {
        if (path.node[VISITED]) return;
        // export { foo } from './bar.js'
        if (path.node.source) return;

        const declaration = path.node.declaration;
        if (t.isVariableDeclaration(declaration)) {
          // export const foo = bar, biff = baz;
          const newDeclarations = [];
          path.node.declaration.declarations.forEach((d) => {
            newDeclarations.push(t.variableDeclaration(path.node.declaration.kind, [d]));
            exports.push({ local: d.id, external: d.id });
          });
          path.replaceWithMultiple([
            ...newDeclarations,
          ]);
        } else if (t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
          // export class foo {
          // export function foo() {}
          const id = path.node.declaration.id;
          path.replaceWithMultiple([
            declaration,
          ]);
          exports.push({ local: id, external: id });
        } else {
          // export {foo}
          // move the named exports to the end of the file
          path.node.specifiers.forEach((s) => exports.push({ local: s.local, external: s.exported }));
          path.remove();
        }
     }
    }
  };
}
