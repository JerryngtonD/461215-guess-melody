import ArtistView from '../views/artist-view';
import ClarifyScreen from '../splash/ClarifyScreen';


export default (level, state, onGetNextLevel, startTimer, stopTimer) => {
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
    const clarifyScreen = new ClarifyScreen(startTimer);
    stopTimer();
    clarifyScreen.showClarify();
  };

  return artistView;
};
