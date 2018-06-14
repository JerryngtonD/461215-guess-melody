import {getElementFromTemplate} from '../utils';
import showScreen from '../show-screen';
import getWelcomeScreen from './welcome';
import {onGetNextLevel} from '../main';

export default ({min, sec, mistakes, comparison, scores, fastScores}) => {
  const template = `<!-- Результат игры: выигрыш -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За&nbsp;${min}&nbsp;минуты и ${sec}&nbsp;секунд
        <br>вы&nbsp;набрали ${scores} баллов (${fastScores} быстрых)
        <br>совершив ${mistakes} ошибки</div>
      <span class="main-comparison">${comparison}</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
    </section>`;
  const screen = getElementFromTemplate(template);
  const replayBtn = screen.querySelector(`.main-replay`);
  replayBtn.addEventListener(`click`, () => showScreen(getWelcomeScreen(onGetNextLevel)));

  return screen;
};
