import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

document.body.style.backgroundColor = '#c2d6f1';

const selectors = {
    input: document.querySelector('#datetime-picker'),
    btnStart: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
};

selectors.btnStart.disabled = true;
selectors.btnStart.addEventListener('click', timerStart);

let intervalId = null;
let selectedDate = null;
let currentDate = null;
let remainingTime = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      chooseDate(selectedDates[0])
    },
  };

flatpickr(selectors.input, options);

Report.info(
  'Welcome!',
  'Please, select a date and click start',
  'Okay'
);

function chooseDate(day) {
    selectedDate = day.getTime();
    currentDate = Date.now();
    if(selectedDate < currentDate){
        Report.failure(
         'Error',
         'Please, choose a date in the future',
         'Okay')
    } else {
        selectors.btnStart.disabled = false;
        selectors.input.disabled = true;
        Report.success(
            'Perfectly!',
            'Click on the Start',
            'Okay')
    }
    return selectedDate;
};

function timerStart() {
    intervalId = setInterval(() => {
    currentDate = new Date().getTime();

    if(selectedDate - currentDate <= 1000){
       clearInterval(intervalId);
       selectors.btnStart.disabled = true;
       selectors.input.disabled = false;
       Report.info(
        'Timer stopped!',
        'To start again, select a date and click Start or refresh the page',
        'Okay');
        return;
    } else {
        selectors.btnStart.disabled = false;
        selectors.input.disabled = true;
        currentDate += 1000;
        remainingTime = Math.floor(selectedDate - currentDate);
        convertMs(remainingTime);
    }
    }, 1000)
};

function createMarkup({ days, hours, minutes, seconds }) {
    selectors.days.textContent = days;
    selectors.hours.textContent = hours;
    selectors.minutes.textContent = minutes;
    selectors.seconds.textContent = seconds;
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    createMarkup({ days, hours, minutes, seconds });

    return { days, hours, minutes, seconds };
  };
  


