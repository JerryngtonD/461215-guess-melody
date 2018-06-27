import ResultView from '../views/result-view';
import Application from '../Application';

export default (data) => {
  const resultView = new ResultView(data);
  resultView.onClick = () => {
    Application.startGame();
  };

  return resultView;
};
