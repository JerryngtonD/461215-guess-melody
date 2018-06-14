import {getElementFromTemplate} from '../utils';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default () => {
  const template = `<!-- Результат игры: проигрыш закончились попытки -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  const screen = getElementFromTemplate(template);
  const replayBtn = screen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, () => showScreen(getWelcomeScreen(onGetNextLevel)));

  return screen;
};
