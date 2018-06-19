import AbstracktView from './abstract-view';

export default class WelcomeView extends AbstracktView {
  get template() {
    return `<!-- Приветствие -->
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
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    this.element.querySelector(`.main-play`).onclick = (evt) => {
      evt.preventDefault();
      this.onClick();
    };
  }
}
