
import ArtistView from '../views/artist-view';
import {gameScreen} from '../state';

export default class Artist {
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

      gameScreen.state({
        userAnswers: [...currentState.userAnswers, newAnswer],
        mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
      });

      gameScreen.onGetNextLevel();
    };
  }

  getArtist() {
    return this.artistView;

  }
}
