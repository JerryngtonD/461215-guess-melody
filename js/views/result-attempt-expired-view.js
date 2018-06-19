import AbstracktView from './abstract-view';

export default class ResultAttemptExpiredView extends AbstracktView {
  get template() {
    return `<!-- Результат игры: проигрыш закончились попытки -->
    <section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
  
      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`;
  }

  onClick() {
    throw new Error(`You need to create handler first!`);
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);
    replayBtn.addEventListener(`click`, this.onClick);
  }
}
