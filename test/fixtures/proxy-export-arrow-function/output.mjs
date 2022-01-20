import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/lib/rewireProxyRuntime.js';

console.log(_rewireProxyRuntime);
const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime.default();


var FooComponent = (state, props) => {
  return props.children;
};

var _FooComponent = FooComponent;
FooComponent = _$rwProx(_FooComponent, "FooComponent", () => FooComponent, val => FooComponent = val);

var BarComponent = (state, props) => {
  return props.children;
};

var _BarComponent = BarComponent;
BarComponent = _$rwProx(_BarComponent, "BarComponent", () => BarComponent, val => BarComponent = val);

if (FooComponent.name !== 'FooComponent' || BarComponent.name !== 'BarComponent') {
  throw new Error('Function name was lost!');
}

export { FooComponent, BarComponent, _$rwRuntime as __RewireAPI__ };