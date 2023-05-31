const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dataEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeEls = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActiv;
let savedCountdown;


const second = 1000;
const minut = second * 60;
const hour = minut * 60;
const day = hour * 24;


// Set Date Input with today's date

const today = new Date().toISOString().split('T')[0];
dataEl.setAttribute('min', today);

// Populate Countdown
function updateDOM() {

    countdownActiv = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now
        const days = Math.floor(distance / day)
        const hours = Math.floor((distance % day) / hour);
        const minuts = Math.floor((distance % hour) / minut);
        const seconds = Math.floor((distance % minut) / second);


        // Hide Input 
        inputContainer.hidden = true;

        // If the countdown has ended, show complete
        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActiv);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false;
        } else {
            // show Time in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeEls[0].textContent = `${days}`;
            timeEls[1].textContent = `${hours}`;
            timeEls[2].textContent = `${minuts}`;
            timeEls[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}




// Take Values from Input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }

    // save in localstorage 
    localStorage.setItem('countdown', JSON.stringify(savedCountdown))


    // Check for valid date
    if (countdownDate === '') {
        alert('please select the date from Countdown')
    } else {
        // Get number version of current Date, update Dom
        countdownValue = new Date(countdownDate).getTime();
        console.log('countdownValue :>> ', countdownValue);
        updateDOM();
    }
}

// reset all Values
function reset() {
    // hide countdowns, show inputs 
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;

    
    // Stop countdown
    clearInterval(countdownActiv);

    // reset values

    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown')

}


function restorePreviousCountdown() {
    // get countdown from localstorage

    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();

    }
}
// addeventlistener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);


// onload check localstorage 


restorePreviousCountdown();