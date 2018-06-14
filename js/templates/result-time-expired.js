import {getElementFromTemplate} from '../utils';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default () => {
  const template = `<!-- Результат игры: проигрыш время вышло -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Увы и ах!</h2>
      <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  const screen = getElementFromTemplate(template);
  const replayBtn = screen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, () => showScreen(getWelcomeScreen(onGetNextLevel)));

  return screen;
};
