// magic numbers
const MAX_SLIDER_VAL = 900; // corresponds to 900 secs
const SLIDER_VAL_AT_START = 630; // corresponds to 630 secs or 5:30 / km
const SLIDER_MAX_1_MIN_PER_KM = 840; // Use this if you want max slider to be 1 min/km. It's used in formula ahead
const SLIDER_MAX_2_MIN_PER_KM = 780; // Use this if you want max slider to be 1 min/km. It's used in formula ahead
// grab the elements
const minPerKm = document.querySelector("#minPerKm");
const minPerMi = document.querySelector("#minPerMi");
const kph = document.querySelector("#kph");
const mph = document.querySelector("#mph");
const theSlider = document.querySelector("#theSlider");
theSlider.setAttribute('max', MAX_SLIDER_VAL.toString());
theSlider.value = SLIDER_VAL_AT_START.toString();
// set initial values
const valOfSlider = parseInt(theSlider.value);
const secsOfSlider = valOfSlider - SLIDER_MAX_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL));
minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19);
minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19);
const someFrkyNum = 3600 / secsOfSlider;
kph.value = (Math.round((someFrkyNum + Number.EPSILON) * 100) / 100).toString();
// const mphNum = parseInt(kph.value) * 0.621371192
const secsForAMi = secsOfSlider * 1.60934;
const someMiVal = 3600 / secsForAMi;
mph.value = (Math.round((someMiVal + Number.EPSILON) * 100) / 100).toString();
// if slider is slid, change the valuessd
theSlider.addEventListener("input", (event) => {
    const valOfSlider = parseInt(event.target.value);
    const secsOfSlider = valOfSlider - SLIDER_MAX_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL));
    minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19);
    minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19);
    const someFrkyNum = 3600 / secsOfSlider;
    kph.value = (Math.round((someFrkyNum + Number.EPSILON) * 100) / 100).toString();
    const secsForAMi = secsOfSlider * 1.60934;
    const someMiVal = 3600 / secsForAMi;
    mph.value = (Math.round((someMiVal + Number.EPSILON) * 100) / 100).toString();
});
