
const selectors = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.body
};

let timerId = null;

selectors.btnStart.addEventListener('click', handlerClickStart);
selectors.btnStop.addEventListener('click', handlerClickStop);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

function handlerClickStart() {
    selectors.btnStart.disabled = true;
    selectors.btnStop.disabled = false;
    timerId = setInterval(() => {
    selectors.body.style.backgroundColor = getRandomHexColor();
}, 1000);
};

function handlerClickStop() {
    selectors.btnStop.disabled = true;
    selectors.btnStart.disabled = false;
    clearInterval(timerId);
};


