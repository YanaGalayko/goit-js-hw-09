import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectors = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

selectors.form.addEventListener('submit', onCreatePromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay)
  })
};

function onCreatePromise(e) {
  e.preventDefault();

  let valueDelay = Number(selectors.delay.value);
  let valueStep = Number(selectors.step.value);
  let valueAmount = Number(selectors.amount.value);

  for( let i = 0; i < valueAmount; i += 1){
    const position = i + 1;
    const delay = valueDelay + valueStep * i;

    createPromise(position, delay)
    .then(({ position, delay }) => {
      Notify.success(
        `✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(
        `❌ Rejected promise ${position} in ${delay}ms`);
    });
    console.log(position, delay);
  }
}
