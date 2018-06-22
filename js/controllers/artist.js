
import ArtistView from '../views/artist-view';
import {dataModel} from '../dataModel';

export default (level, state) => {
  const {mistakes} = state.get();
  const artistView = new ArtistView(level, mistakes);


  artistView.onClick = (userAnswer) => {
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

    dataModel.onGetNextLevel();
  };

  return artistView;
};
