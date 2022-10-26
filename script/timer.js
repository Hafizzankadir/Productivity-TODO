// * variable

let start = document.getElementById("start");
let stop = document.getElementById("pause");
let reset = document.getElementById("reset");

let workMin = document.getElementById("work_minutes");
let workSec = document.getElementById("work_seconds");

let breakMin = document.getElementById("break_minutes");
let breakSec = document.getElementById("break_seconds");

const workValue = localStorage.getItem("workTime");
const breakValue = localStorage.getItem("breakTime");

let workTitle = document.getElementById("work");
let breakTitle = document.getElementById("break");

let workTime = workValue;
let breakTime = breakValue;

let seconds = "00";

// * set the timer based on timer input in form page

window.onload = () => {
  workMin.innerText = workTime;
  workSec.innerText = seconds;
  breakMin.innerText = breakTime;
  breakSec.innerText = seconds;

  workTitle.classList.add("active");
};

// * start timer

let startTimer;

start.addEventListener("click", function () {
  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
    document.getElementById("start").style.display = "none";
    document.getElementById("pause").style.display = "inline";
  } else {
    alert("Timer is already running");
  }
});

// * reset timer

reset.addEventListener("click", function () {
  workMin.innerText = workTime;
  workSec.innerText = "00";

  breakMin.innerText = breakTime;
  breakSec.innerText = "00";

  document.getElementById("start").style.display = "inline";
  document.getElementById("pause").style.display = "none";

  stopInterval();
  startTimer = undefined;
});

// * pause the timer

stop.addEventListener("click", function () {
  stopInterval();
  startTimer = undefined;
  document.getElementById("start").style.display = "inline";
  document.getElementById("pause").style.display = "none";
});

// * timer function

function timer() {
  // work timer countdown

  if (workSec.innerText != 0) {
    workSec.innerText--;
  } else if (workMin.innerText != 0 && workSec.innerText == 0) {
    workSec.innerText = 59;
    workMin.innerText--;
  }

  // break timer countdown
  if (workMin.innerText == 0 && workSec.innerText == 0) {
    if (breakSec.innerText != 0) {
      breakSec.innerText--;
      workTitle.classList.remove("active");
      breakTitle.classList.add("active");
    } else if (breakMin.innerText != 0 && breakSec.innerText == 0) {
      breakSec.innerText = 59;
      breakMin.innerText--;
    }
  }

  // full cycle

  if (
    workMin.innerText == 0 &&
    workSec.innerText == 0 &&
    breakMin.innerText == 0 &&
    breakSec.innerText == 0
  ) {
    workTitle.classList.add("active");
    breakTitle.classList.remove("active");
    workMin.innerText = workTime;
    workSec.innerText = "00";
    breakMin.innerText = breakTime;
    breakSec.innerText = "00";
  }
}

// * stop timer function

function stopInterval() {
  clearInterval(startTimer);
}
