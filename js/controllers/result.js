import ResultView from '../views/result-view';
import Application from '../application';

export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    Application.startGame();
  };

  return resultView;
};
