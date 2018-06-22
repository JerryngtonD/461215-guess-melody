
import ArtistView from '../views/artist-view';
import {GameScreen} from '../data/GameScreen';

export class Artist {
  constructor(level, state) {
    const {mistakes} = state.get();
    this.artistView = new ArtistView(level, mistakes);

    this.artistView.onClick = (userAnswer) => {
      const currentState = state.get();
      const newAnswer = {
        userAnswer,
        isRight: level.track.artist === userAnswer,
        time: state.get().answerTimeBegin - state.get().TOTAL_TIME
      };

      state.set({
        userAnswers: [...currentState.userAnswers, newAnswer],
        mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
      });

      new GameScreen(state).onGetNextLevel();
    };
  }

  getArtist() {
    return this.artistView;

  }
}
