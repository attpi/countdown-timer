// 程式碼寫這裡
const timer = document.querySelector(".timer");
let totalSeconds = 120;

// 設定時鐘呈現的內容
function updateTimer(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = seconds % 60;

  timer.textContent = `${mins}:${secs}`;
}
setInterval(() => {
  totalSeconds--;
  updateTimer(totalSeconds);
  //console.log(totalSeconds);
}, 1000); // 1000代表是間隔時間 1000ms
