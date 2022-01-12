export const DoTheThing = functionFactory(()=>{});

function functionFactory(func) {
  return () => func();
}
