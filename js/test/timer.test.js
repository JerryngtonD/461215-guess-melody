import {assert} from 'chai';

import getTimer from '../timer';

describe(`Create time function`, () => {
  describe(`return object`, () => {
    it(`if args are correct - return object`, () => {
      assert.isObject(getTimer(555));
    });

    it(`object include tick method`, () => {
      assert.isFunction(getTimer(1).tick);
    });
  });

  describe(`function get time as argument`, () => {
    it(`return -1 if isn't integer `, () => {
      assert.equal(-1, getTimer());
      assert.equal(-1, getTimer({}));
      assert.equal(-1, getTimer([]));
      assert.equal(-1, getTimer(`123`));
      assert.equal(-1, getTimer(NaN));
      assert.equal(-1, getTimer(null));
    });
  });
});
