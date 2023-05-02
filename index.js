// magic numbers
const MAX_SLIDER_VAL = 900; // corresponds to 900 secs
const MIN_SLIDER_VAL = 60; // corresponds to 60 secs
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
theSlider.setAttribute('min', MIN_SLIDER_VAL.toString());
theSlider.value = SLIDER_VAL_AT_START.toString();
// set initial values
const valOfSlider = parseInt(theSlider.value);
const secsOfSlider = valOfSlider - SLIDER_MAX_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL));
minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19).replace(':', '');
minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19).replace(':', '');
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
    minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19).replace(':', '');
    minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19).replace(':', '');
    const someFrkyNum = 3600 / secsOfSlider;
    kph.value = (Math.round((someFrkyNum + Number.EPSILON) * 100) / 100).toString();
    const secsForAMi = secsOfSlider * 1.60934;
    const someMiVal = 3600 / secsForAMi;
    mph.value = (Math.round((someMiVal + Number.EPSILON) * 100) / 100).toString();
});
minPerKm.addEventListener('input', (event) => {
    let minsOfNum = 0;
    const theNumInputted = event.target.value;
    const inputIsValid = validateMMSSInput(theNumInputted);
    if (inputIsValid) {
        if (theNumInputted.length > 2) {
            minsOfNum = parseInt(theNumInputted.slice(0, -2));
        }
        const secsOfNum = parseInt(theNumInputted.slice(-2));
        if (secsOfNum > 59) {
            console.warn('WRONG sECS SISSSSSSSSS');
            minPerMi.value = '';
            kph.value = '';
            mph.value = '';
            return;
        }
        // console.log(`Got ${minsOfNum}min ${secsOfNum}secs`)
        const totalSecs = (minsOfNum * 60) + secsOfNum;
        // hereon doing stuff only for min/mi
        const totalSecsForMile = totalSecs * 0.621371;
        // console.log(totalSecs, totalSecsForMile, 'total secs')
        const minOfMile = Math.floor(totalSecsForMile / 60);
        // console.log(minOfMile, 'min of mile')
        const secsOfMile = totalSecsForMile % 60;
        // console.log(secsOfMile, 'secs of mile')
        let secsRounded = Math.round((secsOfMile + Number.EPSILON));
        // console.log(secsRounded, 'secsrounded')
        if (secsRounded < 10) {
            secsRounded = 0 + secsRounded.toString();
        }
        minPerMi.value = `${minOfMile}${secsRounded}`;
        // hereon doing stuff only for kph
        const newKphVal = Math.round((3600 / totalSecs + Number.EPSILON) * 100) / 100;
        // console.log(newKphVal, 'totalsecsfor kph')
        kph.value = newKphVal.toString();
        // hereon doing stuff only for mph
        const newMphVal = Math.round((3600 / totalSecsForMile + Number.EPSILON) * 100) / 100;
        console.log(newMphVal, 'new mph val');
        mph.value = newMphVal.toString();
        console.log('succuly done all');
    }
    else {
        console.warn('WRONG NUM BROOOOOOOOO');
        minPerMi.value = '';
        kph.value = '';
        mph.value = '';
    }
});
function validateMMSSInput(theNumInputted) {
    const regex = /^\d{1,}$/;
    const isValid = regex.test(theNumInputted);
    if (isValid) {
        return true;
    }
    else {
        return false;
    }
}
