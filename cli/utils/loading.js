let timer = null

function startTimer({ msg = '', tick = 100, operator = '.', abs = false }) {
  clearTimer()
  process.stdout.write(msg+'\n')
  if (!abs) {
    timer = setInterval(() => {
      process.stdout.write(operator)
    }, tick)
  }
}
function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
} //clears the timer, but not the text field}

module.exports = {
  startTimer,
  clearTimer
}
