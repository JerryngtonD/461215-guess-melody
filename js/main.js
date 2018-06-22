import GameModel from './data/game-model';


const dataModel = new GameModel(null);


document.addEventListener(`DOMContentLoaded`, dataModel.startGame());
