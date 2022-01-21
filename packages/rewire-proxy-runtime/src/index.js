const proxyMap = new WeakMap();
const proxyHandlerMap = new WeakMap();
const proxySet = new WeakSet();
const recursionMarker = Symbol('recursionMarker');
const allRewired = new Set();

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

    if ((type === 'function' || type === 'object') && (obj && !obj._isMockFunction)) {
      let p;
      if (proxySet.has(obj)) {
        p = obj;
      }
      if (!p && proxyMap.has(obj)) {
        p = proxyMap.get(obj);
      }
      if (!p) {
        const ph = makeObjectProxyHandler({});
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
    rewire: (name, val) => {
      const rw = _rewireObjects[name];
      if (!rw) {
        _toRewireObjects[name] = val;
        return;
      }
      let needsSetWithSetter = true;
      if (rw.proxy) {
        if (typeof val === 'function') {
          that.rewireProxy(name, makeFunctionProxyHandler(val));
          needsSetWithSetter = false;
        }
        if (typeof val === 'object') {
          that.rewireProxy(name, makeObjectProxyHandler(val));
          needsSetWithSetter = false;
        }
      }
      if (needsSetWithSetter) {
        if (rw.preRewired === undefined) {
          rw.preRewired = rw.getterFn();
        }
        rw.setterFn(val);
      }
      allRewired.add(rw);
      return () => that.restore(name);
    },
    restore: function (name) {
      if (_toRewireObjects[name]) {
        delete _toRewireObjects[name];
      }

      const rw = _rewireObjects[name];
      if (!rw) return;

      restoreOne(rw); 
    },
    grab: function (name) {
      return _rewireObjects[name]?.getterFn();
    }
  };
  that.__get__ = that.grab;
  that.__set__ = that.rewire;
  that.__Rewire__ = that.rewire;
  that.__ResetDependency__ = that.restore;
  that.__GetDependency__ = that.grab;
  that.restoreAll = restoreAll;
  return {
    _$rwProx,
    _$rwRuntime: that
  };
}

function restoreAll() {
  allRewired.forEach((rw) => {
    restoreOne(rw);
    allRewired.delete(rw);
  });
}

function restoreOne(rw) {
  if (rw.proxy) {
    const ph = proxyHandlerMap.get(rw.proxy);
    Object.keys(ph).forEach(k => delete ph[k]);
    const newPh = makeObjectProxyHandler({});
    Object.keys(newPh).forEach(k => ph[k] = newPh[k]);
  } else if (rw.setterFn) {
    if (rw.preRewired !== undefined) {
      rw.setterFn(rw.preRewired);
      delete rw.preRewired;
    }
  }
}

function makeFunctionProxyHandler(val) {
  return  {
    apply: (target, thisArg, args) => {
      if (val[recursionMarker]) {
        delete val[recursionMarker];
        return Reflect.apply(target, thisArg, args);
      } else {
        val[recursionMarker] = true;
        try {
          return val(...args);
        } finally {
          delete val[recursionMarker];
        }
      }
    },
    construct: (target, args) => {
      if (val[recursionMarker]) {
        delete val[recursionMarker];
        return Reflect.construct(target, args);
      }
      val[recursionMarker] = true;
      try {
        const result = new val(...args);
        return result;
      } finally {
        delete val[recursionMarker];
      }
    }
  };
}

function makeObjectProxyHandler(val) {
  return {
    get: (target, prop, receiver) => {
      if (val[prop] !== undefined) {
        return val[prop];
      }
      const result = Reflect.get(target, prop, receiver);
      if (typeof result === 'function' && Object.keys(result).length === 0) {
        return result.bind(target);
      }
      return result;
    }
  };
}

globalThis.__rewire_reset_all__ = restoreAll;
