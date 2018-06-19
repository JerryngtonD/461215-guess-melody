import GenreView from '../views/genre-view';
import {onGetNextLevel} from '../main';

export default (level, state) => {
  const {mistakes} = state.get();
  const genreView = new GenreView(level, mistakes);

  genreView.onClick = () => {
    const currentState = state.get();
    const userAnswer = genreView.getUserAnswers();
    const newAnswer = {
      userAnswer,
      isRight: genreView.checkUserAnswersRight(level.answers, userAnswer),
      time: 20
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  };

  return genreView;
};
