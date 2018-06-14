import {getElementFromTemplate} from '../utils';
import {onGetNextLevel} from '../main';
import getSvgMarkup from './svg';
import getMistakesMarkup from './mistakes';

const getPlayerMarkup = (src) => {
  return `<div class="player-wrapper">
    <div class="player">
      <audio class="track" src=${src}></audio>
      <button class="player-control"></button>
      <div class="player-track">
        <span class="player-status"></span>
      </div>
    </div>
  </div>`;
};

const getAnswerMarkup = ({image, artist}, number) => {
  return `<div class="main-answer-wrapper">
    <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
    <label class="main-answer" for="answer-${number}">
      <img class="main-answer-preview" src="${image}"
           alt="${artist}" width="134" height="134">
      ${artist}
    </label>
  </div>`;
};

export default (level, state) => {
  const template = `<section class="main main--level main--level-artist">
    ${getSvgMarkup()}
    ${getMistakesMarkup(state.get().mistakes)}
    <div class="main-wrap">
      <h2 class="title main-title">${level.question}</h2>
      ${getPlayerMarkup(level.track.src)}
      <form class="main-list">
        ${level.answers.map((answer, i) => getAnswerMarkup(answer.track, i))}
      </form>
    </div>
  </section>`;
  const artistScreen = getElementFromTemplate(template);

  const screen = artistScreen.cloneNode(true);

  const audio = screen.querySelector(`.player`);
  const playerControl = screen.querySelector(`.player-control`);

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


  const answers = screen.querySelectorAll(`.main-answer`);
  [...answers].forEach((answer) => {
    answer.addEventListener(`click`, (evt) => {
      if (playerControl.classList.contains(`player-control--pause`)) {
        playerControl.classList.remove(`player-control--pause`);
      }
      launchAudio.pause();
      const currentState = state.get();
      const userAnswer = evt.target.getAttribute(`alt`);
      const newAnswer = {
        userAnswer,
        isRight: level.track.artist === userAnswer,
        time: 20
      };

      state.set({
        userAnswers: [...currentState.userAnswers, newAnswer],
        mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
      });

      onGetNextLevel();
    });
  });

  return screen;
};

