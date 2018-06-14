import {INITIAL_STATE} from './game';

let _state;
const get = () => {
  return Object.freeze(Object.assign({}, _state));
};

const set = (newState) => {
  _state = Object.assign({}, _state, newState);
};

const clear = () => {
  _state = Object.assign({}, INITIAL_STATE);
};

export default {
  get,
  set,
  clear
};
