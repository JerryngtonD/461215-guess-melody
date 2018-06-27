export const getElementFromTemplate = (str) => {
  const element = document.createElement(`div`);
  element.innerHTML = str;

  const fragment = [...element.children].reduce((res, child) => {
    res.appendChild(child);

    return res;
  }, document.createDocumentFragment());

  return fragment;
};

export const getRandom = (max = 1, min = 0) => {
  return Math.round((Math.random() * (max - min) + min));
};

export const times = (n, obj) => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result[i] = Object.assign({}, obj);
  }

  return result;
};

export const mixArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};


export const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};
