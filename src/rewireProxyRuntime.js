
export default function createRewireProxyRuntime() {
  const _rewireObjects = {};

  function _$rwProx(obj, name, getterFn, setterFn) {
    const type = typeof obj;
    _rewireObjects[name] = { setterFn, getterFn };
    if (type === 'function' || type === 'object') {
      const rwProx = {};
      _rewireObjects[name].proxyHandler = rwProx;
      _rewireObjects[name].original = obj;
      return new Proxy(obj, rwProx);
    }
    return obj;
  }

  const that = {
    rewireProxy: (name, proxyHandler) => {
      const rw = _rewireObjects[name];
      if (!rw || !rw.proxyHandler) {
        throw new Error('Cannot rewire ' + name);
      }
      Object.keys(rw.proxyHandler).forEach(k => delete rw.proxyHandler[k]);
      Object.keys(proxyHandler).forEach(k => rw.proxyHandler[k] = proxyHandler[k]);
    },
    __Rewire__: (name, val) => {
      const rw = _rewireObjects[name];
      if (!rw) {
        throw new Error('Cannot rewire ' + name);
      }
      if (rw.proxyHandler) {
        if (typeof rw.original === 'function' && typeof val === 'function') {
          that.rewireProxy(name, { apply: () => val() });
        }
        if (typeof rw.original === 'object' && typeof val === 'object') {
          that.rewireProxy(name, {
            get: (target, prop, receiver) => {
              if (val[prop] !== undefined) {
                return val[prop];
              }
              return Reflect.get(target, prop, receiver);
            }
          });
        }
      } else {
        rw.preRewired = rw.getterFn();
        rw.setterFn(val);
      }
    },
    __ResetDependency__: function (name) {
      const rw = _rewireObjects[name];
      if (!rw) throw new Error('Cannot rewire ' + name);
      if (rw.proxyHandler) {
        Object.keys(rw.proxyHandler).forEach(k => delete rw.proxyHandler[k]);
      } else if (rw.setterFn) {
        if (rw.preRewired) {
          rw.setterFn(rw.preRewired);
          delete rw.preRewired;
        }
      }
    }
  };
  return {
    _$rwProx,
    _$rwRuntime: that
  };
}