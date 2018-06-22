import GenreView from '../views/genre-view';
import {gameScreen} from '../state';

export default class Genre {
  constructor(level, state) {
    const {mistakes} = state.get();
    this.genreView = new GenreView(level, mistakes);

    this.genreView.onClick = () => {
      const currentState = state.get();
      const userAnswer = this.genreView.getUserAnswers();
      const newAnswer = {
        userAnswer,
        isRight: this.genreView.checkUserAnswersRight(level.answers, userAnswer),
        time: state.get().answerTimeBegin - state.get().TOTAL_TIME
      };

      gameScreen.state({
        userAnswers: [...currentState.userAnswers, newAnswer],
        mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
      });

      gameScreen.onGetNextLevel();
    };
  }
}
