import AbstracktView from './abstract-view';
import getSvgMarkup from '../controllers/svg';
import getMistakesMarkup from '../controllers/mistakes';

export default class ArtistView extends AbstracktView {
  constructor(level, mistakes) {
    super();
    this._mistakes = mistakes;
    this._level = level;
  }

  get template() {
    return `<section class="main main--level main--level-artist">
      ${getSvgMarkup()}
      ${getMistakesMarkup(this._mistakes).template}
      <div class="main-wrap">
        <h2 class="title main-title">${this._level.question}</h2>
        ${this._getPlayerMarkup(this._level.track.src)}
        <form class="main-list">
          ${this._level.answers.map((answer, i) => this._getAnswerMarkup(answer.track, i))}
        </form>
      </div>
    </section>`;
  }

  _getPlayerMarkup(src) {
    return `<div class="player-wrapper">
    <div class="player">
      <audio class="track" src=${src}></audio>
      <button class="player-control"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
  }

  _getAnswerMarkup({image, artist}, number) {
    return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
      <img class="main-answer-preview" src="${image}"
           alt="${artist}" width="134" height="134">
      ${artist}
    </label>
  </div>`;
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    const audio = this.element.querySelector(`.player`);
    const playerControl = this.element.querySelector(`.player-control`);

    const srcString = audio.querySelector(`.track`).getAttribute(`src`);
    const launchAudio = new Audio(srcString);

    playerControl.addEventListener(`click`, () => {
      if (playerControl.classList.contains(`player-control--pause`)) {
        playerControl.classList.remove(`player-control--pause`);
        launchAudio.pause();
      } else {
        playerControl.classList.add(`player-control--pause`);
        launchAudio.play();
      }
    });


    const answers = this.element.querySelectorAll(`.main-answer`);

    [...answers].forEach((answer) => {
      answer.addEventListener(`click`, (evt) => {
        if (playerControl.classList.contains(`player-control--pause`)) {
          playerControl.classList.remove(`player-control--pause`);
        }
        launchAudio.pause();
        const userAnswer = evt.target.getAttribute(`alt`);
        this.onClick(userAnswer);
      });
    });

  }
}
