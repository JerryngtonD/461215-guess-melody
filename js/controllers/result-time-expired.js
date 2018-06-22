import ResultTimeExpiredView from '../views/result-time-expired-view';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {GameScreen} from './GameScreen';
import {Game} from "../data/game";


export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    showScreen(getWelcomeScreen(new GameScreen().onGetNextLevel()).element);
  };

  return resultTimeExpiredView;
};
