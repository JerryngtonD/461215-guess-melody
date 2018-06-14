import {Game} from '../data/game';

const getMistakes = (mistakeCount) => {
  let html = ``;
  for (let i = 0; i < Game.MISTAKES_COUNT - mistakeCount; i++) {
    html += `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;
  }

  return html;
};

export default (mistakes) => {
  return `<div class="main-mistakes">
    ${getMistakes(mistakes)}
  </div>`;
};
