export const FooComponent = (state, props) => {
  return props.children;
};

const BarComponent = (state, props) => {
  return props.children;
};
export { BarComponent };

if (FooComponent.name !== 'FooComponent' || BarComponent.name !== 'BarComponent') {
  throw new Error('Function name was lost!');
}