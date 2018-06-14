import {getElementFromTemplate} from '../utils';

const template = `<!-- Приветствие -->
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>`;

const welcomeScreen = getElementFromTemplate(template);

export default (callback) => {
  const screen = welcomeScreen.cloneNode(true);

  const playBtn = screen.querySelector(`.main-play`);


  playBtn.addEventListener(`click`, callback);

  return screen;
};
