import { foo } from "../../import/fakeLibrary";

export class Foob {
  someMethod() {
    return 'cool';
  }
}

Foob.staticProp = { nice: 'test' };

class Bar {
  doThing() {
    return 0;
  }
}

export { Bar };