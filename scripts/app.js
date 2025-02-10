// 程式碼寫這裡
const timer = document.querySelector(".timer");
let defaultSesonds = 5;
let totalSeconds = 0;
let running = false;

// 設定時鐘呈現的內容
function updateTimer(seconds) {
  let mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  let secs = String(seconds % 60).padStart(2, "0");

  timer.textContent = `${mins}:${secs}`;
}

function timesup() {
  clearInterval(timeID);
  running = false;
  //updateTimer(0);
}

function initTimer() {
  running = true;
  totalSeconds = defaultSesonds;
  // 設定時間替換的方式
  timeID = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimer(totalSeconds);
      //console.log(totalSeconds);
    } else {
      console.log("stop");
      timesup();
    }
  }, 1000); // 1000代表是間隔時間 1000ms
}

document.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (!running && e.key === "Enter") {
    initTimer();
  }
});
