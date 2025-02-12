// 程式碼寫這裡
const timer = document.querySelector(".timer");
let defaultSesonds = 120;
let totalSeconds = 0;
let running = false;
let timerID;
let paused = false;

// 設定時鐘呈現的內容
function updateTimer(seconds) {
  let mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  let secs = String(seconds % 60).padStart(2, "0");

  timer.textContent = `${mins}:${secs}`;

  if (seconds === 0) {
    timer.classList.add("times-up");
  } else {
    timer.classList.remove("times-up");
  }
}

function timesUp() {
  clearInterval(timeID);
  running = false;
  updateTimer(0);
  playSound();
}

function playSound() {
  const sound = new Audio("sounds/news.mp3");
  sound.play();
}

function initTimer() {
  running = true;
  totalSeconds = defaultSesonds;
  updateTimer(totalSeconds);
  setupTimer();
}

function setupTimer() {
  // 設定時間替換的方式
  timeID = setInterval(() => {
    if (totalSeconds > 1) {
      totalSeconds--;
      updateTimer(totalSeconds);
    } else {
      console.log("stop");
      timesUp();
    }
  }, 1000); // 1000代表是間隔時間 1000ms
}

function pauseTimer() {
  paused = true;
  clearInterval(timeID);
}

function resumeTimer() {
  paused = false;
  setupTimer();
}

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "Enter":
      if (!running) {
        initTimer();
      }
      break;
    case " ":
      if (running) {
        if (paused) {
          resumeTimer();
          console.log("unpause");
        } else {
          pauseTimer();

          console.log("pause");
        }
      }
      break;
  }
});
