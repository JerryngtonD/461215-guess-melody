import AbstracktView from '../views/abstract-view';
import {getElementFromTemplate} from '../utils';


export default class ArtistView extends AbstracktView {

  get template() {
    return `
  <div class="holder">
  <div class="flying-notes">
    <div class="note note-schema">
      <svg width="144px" height="160px" viewBox="0 0 144 160" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs></defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="music" fill="#ff9749">
                <polygon id="Shape" points="56 36 124 24 124 116 144 116 144 0 36 20 36 136 56 136"></polygon>
                <path d="M56,136 C56,149.254 43.469,160 28,160 C12.531,160 0,149.254 0,136 C0,122.746 12.531,112 28,112 C43.469,112 56,122.746 56,136 Z" id="Shape"></path>
                <path d="M144,116 C144,129.254 131.469,140 116,140 C100.531,140 88,129.254 88,116 C88,102.746 100.531,92 116,92 C131.469,92 144,102.746 144,116 Z" id="Shape"></path>
            </g>
        </g>
      </svg>
    </div>
  </div>
</div>`;
  }

  startLoading() {
    const loaderElement = this.element;
    const layerLoader = document.querySelector(`body`);
    layerLoader.appendChild(loaderElement);
  }

  stopLoading() {
    const layerLoader = document.querySelector(`body`);
    const loaderElement = layerLoader.querySelector(`.holder`);
    layerLoader.removeChild(loaderElement);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }


  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
    const acAnimated = {Plugins: {}};
    acAnimated.Plugins.addObjects = function (element, noteSchema) {
      for (let i = 0; i <= 5; i++) { // set count in css too for number of elements
        const note = document.createElement(`div`);
        note.className = `note note` + String(i + 1);
        note.innerHTML = noteSchema;
        element.appendChild(note);
      }
    };
    acAnimated.Plugins.addObjects(this._element.querySelector(`.flying-notes`), this._element.querySelector(`.note-schema`).innerHTML);
  }

}


