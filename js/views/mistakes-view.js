import AbstracktView from './abstract-view';
import {Game} from '../data/game';

export default class MistakesView extends AbstracktView {
  constructor(mistakeCount = 0) {
    super();
    this.mistakeCount = mistakeCount;
  }

  renderImages() {
    let html = ``;
    for (let i = 0; i < Game.MISTAKES_COUNT - this.mistakeCount; i++) {
      html += `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
    }

    return html;
  }

  get template() {
    return `<div class="main-mistakes">
      ${this.renderImages()}
    </div>`;
  }
}
