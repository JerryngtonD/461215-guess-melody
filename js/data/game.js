import {mixArray, getRandom} from '../utils';

export const INITIAL_STATE = {
  levels: [],
  currentLevel: 0,
  userAnswers: [],
  mistakes: 0
};

export const TYPES = {
  GENRE: `levelGenre`,
  ARTIST: `levelArtist`
};

export const Game = {
  TOTAL_QUESTIONS: 10,
  TYPES,
  MISTAKES_COUNT: 3,
  ARTIST_COUNT: 3,
  QUICK_ANSWER_TIME: 20,
  GENRE_COUNT: 4,
  TOTAL_TIME: 300
};

export const tracks = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];


const getRandomArtistLevel = () => {
  const tracksList = mixArray(tracks.slice());
  const levelArtist = {
    type: Game.TYPES.ARTIST,
    question: `Кто исполняет эту песню?`,
    track: null,
    answers: []
  };

  levelArtist.track = tracksList.pop();
  levelArtist.answers.push({
    track: levelArtist.track,
    isRight: true
  });

  tracksList.slice(0, Game.ARTIST_COUNT - 1).forEach((track) => {
    levelArtist.answers.push({
      track,
      isRight: false
    });
  });

  levelArtist.answers = mixArray(levelArtist.answers);
  return levelArtist;
};

const getRandomGenreLevel = () => {
  const tracksList = mixArray(tracks.slice());
  const track = tracksList.pop();
  const levelGenre = {
    type: Game.TYPES.GENRE,
    question: `Выберите ${track.genre} треки`,
    answers: []
  };

  levelGenre.answers.push({
    track,
    isRight: true
  });

  tracksList.slice(0, Game.GENRE_COUNT - 1).forEach((item) => {
    levelGenre.answers.push({
      track: item,
      isRight: false
    });
  });

  levelGenre.answers = mixArray(levelGenre.answers);
  return levelGenre;
};


const createLevel = [getRandomArtistLevel, getRandomGenreLevel];

export const getRandomLevels = () => {
  const randomLevels = [];
  for (let i = 0; i < Game.TOTAL_QUESTIONS; i++) {
    randomLevels.push(createLevel[getRandom()]());
  }

  return randomLevels;
};
