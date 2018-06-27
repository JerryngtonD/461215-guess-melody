import GenreView from '../views/genre-view';
import Application from "../Application";

export default (level, state, onGetNextLevel) => {
  const {mistakes} = state.get();
  const genreView = new GenreView(level, mistakes);

  genreView.onClick = () => {
    const currentState = state.get();
    const userAnswer = genreView.getUserAnswers();
    const newAnswer = {
      userAnswer,
      isRight: genreView.checkUserAnswersRight(level.answers, userAnswer),
      time: state.get().answerTimeBegin - state.get().TOTAL_TIME
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  };

  genreView.goToWelcome = () => {
    Application.startGame();
  };

  return genreView;
};
