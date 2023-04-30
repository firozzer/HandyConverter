const runningPaceInKm: HTMLInputElement = document.querySelector("#runningPaceInKm")
const runningPaceInMi: HTMLInputElement = document.querySelector("#runningPaceInMi")
const runningPaceSlider: HTMLInputElement = document.querySelector("#runningPaceSlider")
runningPaceInKm.value = (parseInt(runningPaceSlider.value) * 2).toString()
runningPaceInMi.value = (parseInt(runningPaceSlider.value) / 2).toString()
runningPaceSlider.addEventListener("input", (event) => {
  runningPaceInKm.value = (parseInt((event.target as HTMLInputElement).value) * 2).toString()
  runningPaceInMi.value = (parseInt((event.target as HTMLInputElement).value) / 2).toString()
})