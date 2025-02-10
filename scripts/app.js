// 程式碼寫這裡
const timer = document.querySelector(".timer");
let totalSeconds = 120;

// 設定時鐘呈現的內容
function updateTimer(seconds) {
  let mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  let secs = String(seconds % 60).padStart(2, "0");

  timer.textContent = `${mins}:${secs}`;
}
function initTimer() {
  setInterval(() => {
    totalSeconds--;
    updateTimer(totalSeconds);
    //console.log(totalSeconds);
  }, 1000); // 1000代表是間隔時間 1000ms
}

document.addEventListener("keyup", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    initTimer();
  }
});
