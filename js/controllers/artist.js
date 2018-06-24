import ArtistView from '../views/artist-view';
import Application from '../Application';


export default (level, state, onGetNextLevel) => {
  const {mistakes} = state.get();
  const artistView = new ArtistView(level, mistakes);


  artistView.onClick = (userAnswer) => {
    const currentState = state.get();
    const answerTime = state.get().answerTimeBegin - state.get().TOTAL_TIME;
    const newAnswer = {
      userAnswer,
      isRight: level.track.artist === userAnswer,
      time: answerTime
    };

    state.set({
      userAnswers: [...currentState.userAnswers, newAnswer],
      mistakes: newAnswer.isRight ? currentState.mistakes : currentState.mistakes + 1
    });

    onGetNextLevel();
  };

  artistView.goToWelcome = () => {
    Application.showWelcome();
  };

  return artistView;
};
