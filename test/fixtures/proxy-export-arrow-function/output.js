import _rewireProxyRuntime from '@itaylor/rewire-proxy-runtime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var FooComponent = (state, props) => {
  return props.children;
};

FooComponent = _$rwProx(FooComponent, "FooComponent", () => FooComponent, val => FooComponent = val);

var BarComponent = (state, props) => {
  return props.children;
};

BarComponent = _$rwProx(BarComponent, "BarComponent", () => BarComponent, val => BarComponent = val);

if (FooComponent.name !== 'FooComponent' || BarComponent.name !== 'BarComponent') {
  throw new Error('Function name was lost!');
}

export { FooComponent, BarComponent, _$rwRuntime as __RewireAPI__ };