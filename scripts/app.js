// 程式碼寫這裡
const timer = document.querySelector(".timer");
const progressBar = document.querySelector(".progress-bar");
const timeForm = document.querySelector("#timeForm");
const minutesInput = document.querySelector("#minutesInput");
const secondsInput = document.querySelector("#secondsInput");

let defaultSeconds = 120;
let totalSeconds = 0;
let durationSeconds = defaultSeconds;
let running = false;
let timerID;
let paused = false;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readInputsAsSeconds() {
  const mins = clamp(Number(minutesInput.value) || 0, 0, 99);
  const secs = clamp(Number(secondsInput.value) || 0, 0, 59);
  minutesInput.value = String(mins);
  secondsInput.value = String(secs);
  return mins * 60 + secs;
}

function setProgress(secondsLeft, duration) {
  if (!progressBar || duration <= 0) {
    if (progressBar) progressBar.style.width = "0%";
    return;
  }
  const ratio = clamp(secondsLeft / duration, 0, 1);
  progressBar.style.width = ratio * 100 + "%";
}

// 設定時鐘呈現的內容
function updateTimer(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  timer.textContent = mins + ":" + secs;
  setProgress(seconds, durationSeconds);

  if (seconds === 0) {
    timer.classList.add("times-up");
  } else {
    timer.classList.remove("times-up");
  }
}

function applyConfiguredTime() {
  const seconds = readInputsAsSeconds();
  if (seconds <= 0) {
    minutesInput.focus();
    return false;
  }
  defaultSeconds = seconds;
  durationSeconds = seconds;
  if (!running) {
    totalSeconds = seconds;
    updateTimer(seconds);
  }
  return true;
}

function timesUp() {
  clearInterval(timerID);
  running = false;
  paused = false;
  updateTimer(0);
  setProgress(0, durationSeconds);
  playSound();
  setInputsDisabled(false);
}

function playSound() {
  const sound = new Audio("sounds/news.mp3");
  sound.play();
}

function setInputsDisabled(disabled) {
  minutesInput.disabled = disabled;
  secondsInput.disabled = disabled;
  document.querySelector("#setTimeBtn").disabled = disabled;
}

function initTimer() {
  if (!applyConfiguredTime()) return;
  running = true;
  paused = false;
  totalSeconds = defaultSeconds;
  durationSeconds = defaultSeconds;
  updateTimer(totalSeconds);
  setInputsDisabled(true);
  setupTimer();
}

function setupTimer() {
  clearInterval(timerID);
  timerID = setInterval(() => {
    if (totalSeconds > 1) {
      totalSeconds--;
      updateTimer(totalSeconds);
    } else {
      timesUp();
    }
  }, 1000);
}

function pauseTimer() {
  paused = true;
  clearInterval(timerID);
}

function resumeTimer() {
  paused = false;
  setupTimer();
}

timeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (running) return;
  applyConfiguredTime();
});

document.addEventListener("keyup", (e) => {
  // 在輸入框內時，空白鍵不攔截；Enter 由表單處理
  const tag = (e.target && e.target.tagName) || "";
  if (tag === "INPUT" || tag === "BUTTON") {
    if (e.key === "Enter" && !running && tag !== "INPUT") {
      // button Enter handled by form
    }
    if (e.key === " " || (e.key === "Enter" && tag === "INPUT")) {
      return;
    }
  }

  switch (e.key) {
    case "Enter":
      if (!running) {
        initTimer();
      }
      break;
    case " ":
      e.preventDefault();
      if (running) {
        if (paused) {
          resumeTimer();
        } else {
          pauseTimer();
        }
      }
      break;
  }
});

// 初始顯示
updateTimer(defaultSeconds);
