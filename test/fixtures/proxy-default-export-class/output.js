import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

class Foob {
  someMethod() {
    return 'cool';
  }

}

Foob = _$rwProx(Foob, "Foob", () => Foob, val => Foob = val);
Foob.staticProp = {
  nice: 'test'
};
export default Foob;
export { _$rwRuntime as __RewireAPI__ };