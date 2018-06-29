import ResultTimeExpiredView from '../views/result-time-expired-view';
import Application from '../application';


export default () => {
  const resultTimeExpiredView = new ResultTimeExpiredView();
  resultTimeExpiredView.onClick = () => {
    Application.tryAgain();
  };

  return resultTimeExpiredView;
};
