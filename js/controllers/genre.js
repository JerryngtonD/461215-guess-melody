import GenreView from '../views/genre-view';
import {GameScreen} from '../data/GameScreen';


export class Genre {
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

      state.set({
        userAnswers: [...currentState.userAnswers, newAnswer],
        mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
      });

      new GameScreen(state).onGetNextLevel();
    };
  }
}
