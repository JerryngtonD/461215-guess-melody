import {getElementFromTemplate} from '../utils';
import {onGetNextLevel} from '../main';
import getSvgMarkup from './svg';
import getMistakesMarkup from './mistakes';

const getAnswerMarkup = (src, number) => {
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
};

export default (level, state) => {
  const template = `
  <section class="main main--level main--level-genre">
    ${getSvgMarkup()}
    ${getMistakesMarkup(state.get().mistakes)}

    <div class="main-wrap">
      <h2 class="title">${level.question}</h2>
      <form class="genre">
        ${level.answers.map((answer, i) => getAnswerMarkup(answer.track.src, i))}
        <button class="genre-answer-send" type="submit" disabled="true">Ответить</button>
      </form>
    </div>
  </section>`;

  const genteScreen = getElementFromTemplate(template);


  const screen = genteScreen.cloneNode(true);
  const sendBtn = screen.querySelector(`.genre-answer-send`);
  const answers = screen.querySelectorAll(`input[name=answer]`);
  const answerButtons = screen.querySelectorAll(`.player-control`);
  const audioURLs = [...level.answers].map((answer) => answer.track.src);

  const playAudioObjects = [];
  audioURLs.forEach((audioURL) => {
    playAudioObjects.push(new Audio(audioURL));
  });

  const findTrackIndex = (trackSrc, arrURLs) => {
    let trackIndex = null;
    arrURLs.forEach((element, numberIndex) => {
      if (element === trackSrc) {
        trackIndex = numberIndex;
      }
    });
    return trackIndex;
  };

  let previousButton = null;
  let previousIndexTrack = null;
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

  const isAnswersExist = () => {

    return [...answers].some((input) => input.checked === true);
  };

  const getUserAnswers = () => {

    return [...answers].filter((input) => input.checked === true).map((item) => {
      const number = item.id.substr(item.id.indexOf(`-`) + 1);

      return level.answers[number];
    });
  };

  const checkUserAnswersRight = (levelAnswers, userAnswers) => {

    return [...levelAnswers].every((levelAnswer) => {
      const answer = userAnswers.find((item) => item.track.src === levelAnswer.track.src && item.track.artist === levelAnswer.track.artist) || {isRight: false};
      return levelAnswer.isRight === answer.isRight || levelAnswer.isRight === answer.checked;
    });
  };

  [...answers].forEach((answer) => {
    answer.addEventListener(`change`, () => {
      const answersExist = isAnswersExist();

      if (answersExist && sendBtn.getAttribute(`disabled`)) {
        sendBtn.removeAttribute(`disabled`);
      } else if (!answersExist) {
        sendBtn.setAttribute(`disabled`, `true`);
      }
    });
  });

  sendBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    if (previousIndexTrack) {
      playAudioObjects[previousIndexTrack].pause();
    }
    const currentState = state.get();
    const userAnswer = getUserAnswers(level.answers);
    const newAnswer = {
      userAnswer,
      isRight: checkUserAnswersRight(level.answers, userAnswer),
      time: 20
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  });

  return screen;
};

