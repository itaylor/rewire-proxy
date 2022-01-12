const proxyMap = new WeakMap();
const proxyHandlerMap = new WeakMap();
const proxySet = new WeakSet();

export default function createRewireProxyRuntime() {
  const _rewireObjects = {};
  const _toRewireObjects = {};

  function _$rwProx(obj, name, getterFn, setterFn) {
    const type = typeof obj;
    _rewireObjects[name] = {
      setterFn,
      getterFn
    };
    const rw = _rewireObjects[name];

    if ((type === 'function' || type === 'object') && !(obj instanceof RegExp) && !(obj instanceof Set) && !(obj instanceof Map) && (obj && !obj._isMockFunction)) {
      let p;
      if (proxySet.has(obj)) {
        p = obj;
      }
      if (!p && proxyMap.has(obj)) {
        p = proxyMap.get(obj);
      }
      if (!p) {
        const ph = {};
        p = new Proxy(obj, ph);
        proxyHandlerMap.set(p, ph);
        proxyMap.set(obj, p);
        proxySet.add(p);
      }
      rw.proxy = p;

      if (_toRewireObjects[name]) {
        that.__Rewire__(name, _toRewireObjects[name]);
      }

      return p;
    }

    rw.preRewired = obj;

    if (_toRewireObjects[name] !== undefined) {
      const val = _toRewireObjects[name];
      delete _toRewireObjects[name];
      return val;
    }

    return obj;
  }

  const that = {
    rewireProxy: (name, newProxyHandler) => {
      const rw = _rewireObjects[name];
      if (!rw || !rw.proxy) {
        throw new Error('Cannot rewire ' + name);
      }
      const ph = proxyHandlerMap.get(rw.proxy);

      Object.keys(ph).forEach(k => delete ph[k]);
      Object.keys(newProxyHandler).forEach(k => ph[k] = newProxyHandler[k]);
    },
    __Rewire__: (name, val) => {
      const rw = _rewireObjects[name];
      if (!rw) {
        _toRewireObjects[name] = val;
        return;
      }
      let needsSetWithSetter = true;
      if (rw.proxy) {
        if (typeof val === 'function') {
          that.rewireProxy(name, { apply: (target, thisArg, args) => val(...args) });
          needsSetWithSetter = false;
        }
        if (typeof val === 'object') {
          that.rewireProxy(name, {
            get: (target, prop, receiver) => {
              if (val[prop] !== undefined) {
                return val[prop];
              }
              return Reflect.get(target, prop, receiver);
            }
          });
          needsSetWithSetter = false;
        }
      }
      if (needsSetWithSetter) {
        if (!rw.setterFn) {
          throw new Error(`Tried to rewire a value to a type it cannot convert to: ${name}`);
        }
        rw.preRewired = rw.getterFn();
        rw.setterFn(val);
      }
    },
    __ResetDependency__: function (name) {
      if (_toRewireObjects[name]) {
        delete _toRewireObjects[name];
      }

      const rw = _rewireObjects[name];
      if (!rw) return; // throw new Error('Cannot rewire ' + name);

      if (rw.proxy) {
        const ph = proxyHandlerMap.get(rw.proxy);
        Object.keys(ph).forEach(k => delete ph[k]);
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