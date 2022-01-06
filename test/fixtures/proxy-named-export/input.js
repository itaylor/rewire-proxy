const foo = {
  bar: 'bar'
};

const fooFn = () => {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' baz';
};

function barFn() {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}

export { fooFn, barFn };
