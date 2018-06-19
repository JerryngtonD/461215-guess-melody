import WelcomeView from '../views/welcome-view';

export default (callback) => {
  const welcomeView = new WelcomeView();

  welcomeView.onClick = callback;

  return welcomeView;
};
