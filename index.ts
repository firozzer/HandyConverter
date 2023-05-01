// magic numbers
const MAX_SLIDER_VAL = 900
const SLIDER_MAX_1_MIN_PER_KM = 840 // Use this if you want max slider to be 1 min/km. It's used in formula ahead
const SLIDER_MAX_2_MIN_PER_KM = 780 // Use this if you want max slider to be 1 min/km. It's used in formula ahead

// grab the elements
const runningPaceInKm: HTMLInputElement = document.querySelector("#runningPaceInKm")
const runningPaceInMi: HTMLInputElement = document.querySelector("#runningPaceInMi")
const runningPaceSlider: HTMLInputElement = document.querySelector("#runningPaceSlider")

// set initial values
const valOfSlider = parseInt(runningPaceSlider.value)
const secsOfSlider = valOfSlider - SLIDER_MAX_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL))
runningPaceInKm.value =  new Date(secsOfSlider * 1000).toISOString().slice(14,19).replace(':', '')
runningPaceInMi.value =  new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14,19).replace(':', '')

// if slider is slid, change the valuessd
runningPaceSlider.addEventListener("input", (event) => {
  const valOfSlider = parseInt((event.target as HTMLInputElement).value)
  const newSecsOfSlider = valOfSlider - SLIDER_MAX_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL))
  runningPaceInKm.value = new Date(newSecsOfSlider * 1000).toISOString().slice(14,19).replace(':', '')
  runningPaceInMi.value = new Date((newSecsOfSlider * 1.60934) * 1000).toISOString().slice(14,19).replace(':', '')
})