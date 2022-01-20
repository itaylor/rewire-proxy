import _rewireProxyRuntime from '/Users/itaylor/os/babel-plugin-rewire-exports/src/rewireProxyRuntime';

const {
  _$rwRuntime,
  _$rwProx
} = _rewireProxyRuntime();

var ListenerType;

(function (ListenerType) {
  ListenerType["mouse"] = "mouse";
  ListenerType["touch"] = "touch";
  ListenerType["keyboard"] = "keyboard";
})(ListenerType || (ListenerType = {}));

export { ListenerType, _$rwRuntime as __RewireAPI__ };