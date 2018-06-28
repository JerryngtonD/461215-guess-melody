import AbstracktView from './abstract-view';
import getSvgMarkup from '../controllers/svg';
import getMistakesMarkup from '../controllers/mistakes';

export default class GenreView extends AbstracktView {
  constructor(level, mistakes) {
    super();
    this._mistakes = mistakes;
    this._level = level;
  }

  get template() {
    return `<section class="main main--level main--level-genre">
      <a class="play-again play-again__wrap" href="#">
          <img class="play-again__img" src="/img/melody-logo-ginger.png" alt="logo" width="177" height="76">
      </a>
        ${getSvgMarkup()}
        ${getMistakesMarkup(this._mistakes).template}
    
        <div class="main-wrap">
          <h2 class="title">${this._level.question}</h2>
          <form class="genre">
            ${this._level.answers.map((answer, i) => this._getAnswerMarkup(answer.track.src, i))}
            <button class="genre-answer-send" type="submit" disabled="true">Ответить</button>
          </form>
        </div>
      </section>`;
  }

  _getAnswerMarkup(src, number) {
    return `<div class="genre-answer">
    <div class="player-wrapper">
      <div class="player">
        <audio class="track" src=${src}></audio>
        <button class="player-control"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>
    <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
    <label class="genre-answer-check" for="a-${number}"></label>
  </div>`;
  }

  checkUserAnswersRight(levelAnswers, userAnswers) {

    return [...levelAnswers].every((levelAnswer) => {
      const answer = userAnswers.find((item) => item.track.src === levelAnswer.track.src && item.track.artist === levelAnswer.track.artist) || {isRight: false};
      return levelAnswer.isRight === answer.isRight || !levelAnswer.isRight === !answer.checked;
    });
  }

  getUserAnswers() {

    return [...this._answers].filter((input) => input.checked === true).map((item) => {
      const number = item.id.substr(item.id.indexOf(`-`) + 1);

      return this._level.answers[number];
    });
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  goToWelcome() {
    throw new Error(`You need to create handler first!`);
  }

  _onAnswerChange(answers, sendBtn) {
    const answersExist = [...answers].some((input) => input.checked === true);

    if (answersExist && sendBtn.getAttribute(`disabled`)) {
      sendBtn.removeAttribute(`disabled`);
    } else if (!answersExist) {
      sendBtn.setAttribute(`disabled`, `true`);
    }
  }


  bind() {
    const sendBtn = this.element.querySelector(`.genre-answer-send`);
    const answers = this.element.querySelectorAll(`input[name=answer]`);
    const answerButtons = this.element.querySelectorAll(`.player-control`);
    this._answers = answers;
    const audioURLs = [...this._level.answers].map((answer) => answer.track.src);

    const playAudioObjects = [];
    audioURLs.forEach((audioURL) => {
      playAudioObjects.push(new Audio(audioURL));
    });

    this.tracks = playAudioObjects;

    answerButtons[0].classList.add(`player-control--pause`);
    playAudioObjects[0].play();

    const findTrackIndex = (trackSrc, arrURLs) => {
      let trackIndex = null;
      arrURLs.forEach((element, numberIndex) => {
        if (element === trackSrc) {
          trackIndex = numberIndex;
        }
      });
      return trackIndex;
    };

    let previousButton = answerButtons[0];
    let previousIndexTrack = 0;
    answerButtons.forEach((answerButton, index) => {
      answerButton.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        if (previousButton !== null) {
          if (answerButton.classList.contains(`player-control--pause`) && previousButton === evt.currentTarget) {
            previousButton.classList.remove(`player-control--pause`);
            previousButton = null;
            playAudioObjects[previousIndexTrack].pause();
            previousIndexTrack = null;
          } else if (previousButton !== evt.currentTarget) {
            previousButton.classList.remove(`player-control--pause`);
            let currentButton = evt.currentTarget;

            currentButton.classList.add(`player-control--pause`);
            previousButton = currentButton;

            let currentTrack = evt.currentTarget.parentNode.querySelector(`.track`).getAttribute(`src`);
            playAudioObjects[previousIndexTrack].pause();
            previousIndexTrack = findTrackIndex(currentTrack, audioURLs);
            playAudioObjects[previousIndexTrack].play();
          }
        } else {
          let currentButton = evt.currentTarget;
          previousIndexTrack = index;
          previousButton = currentButton;
          answerButton.classList.add(`player-control--pause`);
          playAudioObjects[index].play();
        }
      });
    });

    [...answers].forEach((answer) => {
      answer.addEventListener(`change`, () => this._onAnswerChange(answers, sendBtn));
    });

    sendBtn.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      playAudioObjects.forEach((playAudioObject) => {
        playAudioObject.pause();
      });
      this.onClick();
    });


    const turnOffMusic = () => {
      if (previousButton) {
        previousButton.classList.remove(`player-control--pause`);
        previousButton = null;
      }
      playAudioObjects.forEach((playAudioObject) => {
        playAudioObject.pause();
      });
    };

    const welcomeLink = this.element.querySelector(`.play-again`);
    welcomeLink.addEventListener(`click`, () => {
      turnOffMusic();
      this.goToWelcome();
    });
  }
}
