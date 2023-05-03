// magic numbers
const MAX_SLIDER_VAL = 900; // corresponds to 900 secs
const MIN_SLIDER_VAL = 60; // corresponds to 60 secs
const SLIDER_VAL_AT_START = 630; // corresponds to 630 secs or 5:30 / km
const SLIDER_DEFAULT_1_MIN_PER_KM = 840; // Use this if you want max slider to be 1 min/km. It's used in formula ahead
const SLIDER_DEFAULT_2_MIN_PER_KM = 780; // Use this if you want max slider to be 1 min/km. It's used in formula ahead
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
const secsOfSlider = valOfSlider - SLIDER_DEFAULT_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL));
minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19);
minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19);
const someFrkyNum = 3600 / secsOfSlider;
kph.value = (Math.round((someFrkyNum + Number.EPSILON) * 100) / 100).toString();
const secsForAMi = secsOfSlider * 1.60934;
const someMiVal = 3600 / secsForAMi;
mph.value = (Math.round((someMiVal + Number.EPSILON) * 100) / 100).toString();
// if slider is slid, change the valuessd
theSlider.addEventListener("input", (event) => {
    const valOfSlider = parseInt(event.target.value);
    // God knows below formula. Reason why i didn't keep slider same val as tot min/km secs is because i want inverse handling of slider.
    const secsOfSlider = valOfSlider - SLIDER_DEFAULT_1_MIN_PER_KM - (2 * (valOfSlider - MAX_SLIDER_VAL));
    minPerKm.value = new Date(secsOfSlider * 1000).toISOString().slice(14, 19).replace(':', '');
    minPerKm.classList.remove('incorrectInput');
    minPerMi.value = new Date((secsOfSlider * 1.60934) * 1000).toISOString().slice(14, 19).replace(':', '');
    minPerMi.classList.remove('incorrectInput');
    const someFrkyNum = 3600 / secsOfSlider;
    kph.value = (Math.round((someFrkyNum + Number.EPSILON) * 100) / 100).toString();
    kph.classList.remove('incorrectInput');
    const secsForAMi = secsOfSlider * 1.60934;
    const someMiVal = 3600 / secsForAMi;
    mph.value = (Math.round((someMiVal + Number.EPSILON) * 100) / 100).toString();
    mph.classList.remove('incorrectInput');
    console.log("yooooo", theSlider.value, secsOfSlider);
});
// making the running inputs pre-formatted with a colon
const theRunningInputs = document.querySelectorAll('.runPace');
theRunningInputs.forEach(function (elem) {
    elem.addEventListener('focus', (event) => {
        const theInputElem = event.target;
        const theVal = theInputElem.value;
        theInputElem.value = theVal.replace(':', '');
        theInputElem.setAttribute('type', 'number');
        theInputElem.select();
    });
    elem.addEventListener('blur', (event) => {
        const theInputElem = event.target;
        const theVal = theInputElem.value;
        theInputElem.setAttribute('type', 'text');
        const inputIsValid = validateMMSSInput(theVal);
        if (inputIsValid) {
            let finalVal;
            if (!theVal) {
                return;
            }
            else if (theVal.length === 1) {
                finalVal = `00:0${theVal}`;
            }
            else if (theVal.length === 2) {
                finalVal = `00:${theVal}`;
            }
            else {
                const theLaat2 = theVal.slice(-2);
                const theFront = parseInt(theVal.slice(0, -2)); // parse int to remove leading 0 if any
                finalVal = `${theFront}:${theLaat2}`;
                if (finalVal.length === 4)
                    finalVal = `0${theFront}:${theLaat2}`;
            }
            theInputElem.value = finalVal;
            theInputElem.classList.remove('incorrectInput');
        }
    });
});
minPerKm.addEventListener('input', (event) => {
    Array.from(document.querySelectorAll('.incorrectInput')).forEach((el) => el.classList.remove('incorrectInput'));
    let minsOfNum = 0;
    const theNumInputted = event.target.value;
    const inputIsValid = validateMMSSInput(theNumInputted);
    if (inputIsValid) {
        if (theNumInputted.length > 2) {
            minsOfNum = parseInt(theNumInputted.slice(0, -2));
        }
        const secsOfNum = parseInt(theNumInputted.slice(-2));
        minPerKm.classList.remove('incorrectInput');
        // console.log(`Got ${minsOfNum}min ${secsOfNum}secs`)
        const totalSecs = (minsOfNum * 60) + secsOfNum;
        // hereon doing stuff only for min/mi
        const totalSecsForMile = totalSecs * 1.60934;
        // console.log(totalSecs, totalSecsForMile, 'total secs')
        let minOfMile = Math.floor(totalSecsForMile / 60);
        // console.log(minOfMile, 'min of mile')
        const secsOfMile = totalSecsForMile % 60;
        console.log(secsOfMile, 'secs of mile');
        let secsRounded = Math.round((secsOfMile + Number.EPSILON));
        // console.log(secsRounded, 'secsrounded')
        if (secsRounded < 10) { // padding zero in front if secss is single digit
            secsRounded = 0 + secsRounded.toString();
        }
        else if (secsRounded == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRounded = '00';
            minOfMile += 1;
        }
        minPerMi.value = `${minOfMile}:${secsRounded}`;
        // hereon doing stuff only for kph
        const newKphVal = Math.round((3600 / totalSecs + Number.EPSILON) * 100) / 100;
        // console.log(newKphVal, 'totalsecsfor kph')
        kph.value = newKphVal.toString();
        // hereon doing stuff only for mph
        const funkyNum = totalSecs * 1.60934;
        const newMphVal = Math.round((3600 / funkyNum + Number.EPSILON) * 100) / 100;
        // console.log(newMphVal, 'new mph val')
        mph.value = newMphVal.toString();
        // God only knows how i built this formula. Reason why i didn't keep slider same val as tot min/km secs is because i want inverse handling of slider.
        const newValOfSlider = MAX_SLIDER_VAL - (totalSecs - MIN_SLIDER_VAL) * 2 + (totalSecs - MIN_SLIDER_VAL);
        theSlider.value = newValOfSlider.toString();
        console.log('succuly done all', newValOfSlider, totalSecs);
    }
    else {
        console.warn('WRONG NUM BROOOOOOOOO');
        minPerKm.classList.add('incorrectInput');
        minPerMi.value = '';
        kph.value = '';
        mph.value = '';
    }
});
minPerMi.addEventListener('input', (event) => {
    Array.from(document.querySelectorAll('.incorrectInput')).forEach((el) => el.classList.remove('incorrectInput'));
    let minsOfNum = 0;
    const theNumInputted = event.target.value;
    const inputIsValid = validateMMSSInput(theNumInputted);
    if (inputIsValid) {
        if (theNumInputted.length > 2) {
            minsOfNum = parseInt(theNumInputted.slice(0, -2));
        }
        const secsOfNum = parseInt(theNumInputted.slice(-2));
        minPerMi.classList.remove('incorrectInput');
        // console.log(`Got ${minsOfNum}min ${secsOfNum}secs`)
        const totalSecs = (minsOfNum * 60) + secsOfNum;
        // hereon doing stuff only for min/km
        const totalSecsForKm = totalSecs / 1.60934;
        // console.log(totalSecs, totalSecsForKm, 'total secs')
        let minOfKm = Math.floor(totalSecsForKm / 60);
        // console.log(minOfKm, 'min of Km')
        const secsOfKm = totalSecsForKm % 60;
        console.log(secsOfKm, 'secs of km');
        let secsRounded = Math.round((secsOfKm + Number.EPSILON));
        // console.log(secsRounded, 'secsrounded')
        if (secsRounded < 10) { // padding zero in front if secss is single digit
            secsRounded = 0 + secsRounded.toString();
        }
        else if (secsRounded == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRounded = '00';
            minOfKm += 1;
        }
        minPerKm.value = `${minOfKm}:${secsRounded}`;
        // hereon doing stuff only for kph
        const newKphVal = Math.round((3600 / totalSecsForKm + Number.EPSILON) * 100) / 100;
        // console.log(newKphVal, 'totalsecsfor kph')
        kph.value = newKphVal.toString();
        // hereon doing stuff only for mph
        const newMphVal = Math.round((3600 / totalSecs + Number.EPSILON) * 100) / 100;
        // console.log(newMphVal, 'new mph val')
        mph.value = newMphVal.toString();
        // God only knows how i built this formula. Reason why i didn't keep slider same val as tot min/km secs is because i want inverse handling of slider.
        const newValOfSlider = MAX_SLIDER_VAL - (totalSecsForKm - MIN_SLIDER_VAL) * 2 + (totalSecsForKm - MIN_SLIDER_VAL);
        theSlider.value = newValOfSlider.toString();
        console.log('succuly done all');
    }
    else {
        console.warn('WRONG NUM BROOOOOOOOO');
        minPerMi.classList.add('incorrectInput');
        minPerKm.value = '';
        kph.value = '';
        mph.value = '';
    }
});
kph.addEventListener('input', (event) => {
    Array.from(document.querySelectorAll('.incorrectInput')).forEach((el) => el.classList.remove('incorrectInput'));
    const theNumInputted = event.target.value;
    const inputIsValid = validationForKphMphInput(theNumInputted);
    if (inputIsValid) {
        kph.classList.remove('incorrectInput');
        const secsPerKm = 3600 / parseFloat(theNumInputted);
        const secsPerMi = secsPerKm * 1.60934;
        // doing kph to minPerKm
        let minOfKm = Math.floor(secsPerKm / 60);
        // console.log(minOfKm, 'min of Km')
        const secsOfKm = secsPerKm % 60;
        console.log(secsOfKm, 'secs of km');
        let secsRounded = Math.round((secsOfKm + Number.EPSILON));
        // console.log(secsRounded, 'secsrounded')
        if (secsRounded < 10) { // padding zero in front if secss is single digit
            secsRounded = 0 + secsRounded.toString();
        }
        else if (secsRounded == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRounded = '00';
            minOfKm += 1;
        }
        minPerKm.value = `${minOfKm}${secsRounded}`;
        // doing kph to minPerMi
        let minOfMile = Math.floor(secsPerMi / 60);
        // console.log(minOfMile, 'min of mile')
        const secsOfMile = secsPerMi % 60;
        console.log(secsOfMile, 'secs of mile');
        let secsRoundedForMi = Math.round((secsOfMile + Number.EPSILON));
        // console.log(secsRoundedForMi, 'secsroundedForMi')
        if (secsRoundedForMi < 10) { // padding zero in front if secss is single digit
            secsRoundedForMi = 0 + secsRoundedForMi.toString();
        }
        else if (secsRoundedForMi == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRoundedForMi = '00';
            minOfMile += 1;
        }
        minPerMi.value = `${minOfMile}${secsRoundedForMi}`;
        // // hereon doing stuff only for mph
        const funkyNum = parseFloat(theNumInputted) * 0.621371;
        mph.value = (Math.round((funkyNum + Number.EPSILON) * 100) / 100).toString();
        // God only knows how i built this formula. Reason why i didn't keep slider same val as tot min/km secs is because i want inverse handling of slider.
        const newValOfSlider = MAX_SLIDER_VAL - (secsPerKm - MIN_SLIDER_VAL) * 2 + (secsPerKm - MIN_SLIDER_VAL);
        theSlider.value = newValOfSlider.toString();
        // console.log('succuly done all', newValOfSlider, totalSecs)
    }
    else {
        console.warn('WRONG NUM in KPH BROOOOOOOOO');
        kph.classList.add('incorrectInput');
        minPerKm.value = '';
        minPerMi.value = '';
        mph.value = '';
    }
});
mph.addEventListener('input', (event) => {
    Array.from(document.querySelectorAll('.incorrectInput')).forEach((el) => el.classList.remove('incorrectInput'));
    const theNumInputted = event.target.value;
    const inputIsValid = validationForKphMphInput(theNumInputted);
    if (inputIsValid) {
        mph.classList.remove('incorrectInput');
        const secsPerMi = 3600 / parseFloat(theNumInputted);
        const secsPerKm = secsPerMi * 0.621371;
        // doing mph to minPerKm
        let minOfKm = Math.floor(secsPerKm / 60);
        // console.log(minOfKm, 'min of Km')
        const secsOfKm = secsPerKm % 60;
        console.log(secsOfKm, 'secs of km');
        let secsRounded = Math.round((secsOfKm + Number.EPSILON));
        // console.log(secsRounded, 'secsrounded')
        if (secsRounded < 10) { // padding zero in front if secss is single digit
            secsRounded = 0 + secsRounded.toString();
        }
        else if (secsRounded == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRounded = '00';
            minOfKm += 1;
        }
        minPerKm.value = `${minOfKm}${secsRounded}`;
        // doing mph to minPerMi
        let minOfMile = Math.floor(secsPerMi / 60);
        // console.log(minOfMile, 'min of mile')
        const secsOfMile = secsPerMi % 60;
        console.log(secsOfMile, 'secs of mile');
        let secsRoundedForMi = Math.round((secsOfMile + Number.EPSILON));
        // console.log(secsRoundedForMi, 'secsroundedForMi')
        if (secsRoundedForMi < 10) { // padding zero in front if secss is single digit
            secsRoundedForMi = 0 + secsRoundedForMi.toString();
        }
        else if (secsRoundedForMi == 60) { // if this then increasing min by 1 & padding 00 at end
            secsRoundedForMi = '00';
            minOfMile += 1;
        }
        minPerMi.value = `${minOfMile}${secsRoundedForMi}`;
        // // hereon doing stuff only for mph to kph
        const funkyNum = parseFloat(theNumInputted) * 1.60934;
        kph.value = (Math.round((funkyNum + Number.EPSILON) * 100) / 100).toString();
        // God only knows how i built this formula. Reason why i didn't keep slider same val as tot min/km secs is because i want inverse handling of slider.
        const newValOfSlider = MAX_SLIDER_VAL - (secsPerKm - MIN_SLIDER_VAL) * 2 + (secsPerKm - MIN_SLIDER_VAL);
        theSlider.value = newValOfSlider.toString();
        // console.log('succuly done all', newValOfSlider, totalSecs)
    }
    else {
        console.warn('WRONG NUM in KPH BROOOOOOOOO');
        mph.classList.add('incorrectInput');
        minPerKm.value = '';
        minPerMi.value = '';
        kph.value = '';
    }
});
function validateMMSSInput(theNumInputted) {
    const regex = /^\d{1,}$/;
    const onlyNumsEntered = regex.test(theNumInputted);
    if (onlyNumsEntered) {
        const theLast2 = parseInt(theNumInputted.slice(-2));
        if (0 <= theLast2 && theLast2 <= 59)
            return true;
    }
    else {
        return false;
    }
}
function validationForKphMphInput(theNumInputted) {
    if (parseFloat(theNumInputted) <= 0 || !theNumInputted) {
        return false;
    }
    else
        return true;
}
