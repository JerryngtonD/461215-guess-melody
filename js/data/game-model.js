import {INITIAL_STATE} from "./game";

export class GameModel {
  constructor() {
    this.state = Object.assign({}, INITIAL_STATE);
    this.timer = null;
    this.statistics = [];
  }

  get state() {
    return this.state;
  }

  set state(newState) {
    this.state = Object.assign({}, this.state, newState);
  }

  clear() {
    this.state = Object.assign({}, INITIAL_STATE);
  }
}
