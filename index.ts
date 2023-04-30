// grab the elements
const runningPaceInKm: HTMLInputElement = document.querySelector("#runningPaceInKm")
const runningPaceInMi: HTMLInputElement = document.querySelector("#runningPaceInMi")
const runningPaceSlider: HTMLInputElement = document.querySelector("#runningPaceSlider")

// set initial values
runningPaceInKm.value = (parseInt(runningPaceSlider.value) * 2).toString()
runningPaceInMi.value = (parseInt(runningPaceSlider.value) / 2).toString()

// if slider is moved, change the values
runningPaceSlider.addEventListener("input", (event) => {
  runningPaceInKm.value = (parseInt((event.target as HTMLInputElement).value) * 2).toString()
  runningPaceInMi.value = (parseInt((event.target as HTMLInputElement).value) / 2).toString()
})