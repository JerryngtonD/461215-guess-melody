import {loseFrame as loseCauseTimeFrame} from "./loseCauseTime";
import {loseFrame as loseCauseAttemptsFrame} from "./loseCauseAttempts";
import levelGenre from "./level-genre";
import levelArtist from './level-artist';
import welcomeScreen from "./welcome-screen";
import winFrame from "./winFrame";
import {changeScreen} from "./util";


export const goToRandomPage = () => {
  const sendAnswerButton = levelGenre.querySelector(`.genre-answer-send`);
  let probableFrames = [loseCauseTimeFrame, loseCauseAttemptsFrame, winFrame];
  sendAnswerButton.addEventListener(`click`, () => {
    let predictedFrame = probableFrames[Math.floor(Math.random() * probableFrames.length)];

    let genreAnswersChecked = levelGenre.querySelectorAll(`[name='answer']:checked`);
    genreAnswersChecked.forEach((answer) => {
      answer.checked = false;
    });

    changeScreen(predictedFrame);

    let letsPlayButton = document.querySelector(`.main-replay`);
    letsPlayButton.addEventListener(`click`, () => {
      changeScreen(welcomeScreen);
    });

  });
};


export const answerClick = () => {
  const answers = levelArtist.querySelectorAll(`.main-answer`);
  answers.forEach((answer) => {
    answer.addEventListener(`click`, () => {
      changeScreen(levelGenre);
    });
  });
};

export const playAgainFromArtistsPage = () => {
  let playAgainButton = levelArtist.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    changeScreen(welcomeScreen);
  });
};

export const playAgainFromGenresPage = () => {
  let playAgainButton = levelGenre.querySelector(`.play-again`);
  playAgainButton.addEventListener(`click`, () => {
    changeScreen(welcomeScreen);
  });
};


export const startGame = () => {
  const playButton = welcomeScreen.querySelector(`.main-play`);
  playButton.addEventListener(`click`, () => {
    changeScreen(levelArtist);
  });
};

export const goToWelcomePage = () => {
  changeScreen(welcomeScreen);
};

