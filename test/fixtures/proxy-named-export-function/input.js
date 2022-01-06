const foo = {
  bar: 'bar'
};

export function barFn() {
  const secondLevelVar = foo.bar;
  return secondLevelVar + ' bat';
}