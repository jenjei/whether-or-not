
const startTimerButton = document.getElementById("start"); // alustetaan startti-buttoni
const pauseTimerButton = document.getElementById("pause"); // alustetaan pause button
const resetTimerButton = document.getElementById("reset"); // alustetaan reset button
const timerBox = document.getElementById("timerbox"); // alustetaan timerbox

let h = 0;
let m = 0;
let s = 0;

let isCounterIncreasing = false; 

function timer() { // timer-funktio, joka suurentaa counter-muuttujan arvoa sekunnin välein aina kun isCounterIncreasing arvo on true

    var counter = ("0" + h).slice(-2) + ":" + ("0" +m).slice(-2) + ":" + ("0" +s).slice(-2); // aika muodossa 00:00:00

    if (isCounterIncreasing) {
        s++;

        if (s > 59) { // sekuntien max arvo 59, jolloin arvo nollaantuu ja minuutit kasvaa yhdellä
            s = 0;
            m++;
        }

        if (m > 59) { // minuuttien max arvo 59, jolloin arvo nollaantuu ja tunnit kasvaa yhdellä
            m = 0;
            h++;
        }
    }

    console.log("counter", counter);

    timerBox.textContent = counter; // tulostetaan counter arvo timerboxiin
}

window.setInterval(timer, 1000); // timer etenee 1000 millisekunnin välein

startTimerButton.addEventListener("click", () => { // start-buttonia painettaessa isCounterIncreasing arvo muuttuu true:ksi
    console.log("Clicked startTimerButton");
    isCounterIncreasing = true;
});

pauseTimerButton.addEventListener("click", () => { // pause-buttonia painettaessa isCounterIncreasing arvo muuttuu false:ksi
    console.log("Clicked pauseTimerButton");
    isCounterIncreasing = false;
});

resetTimerButton.addEventListener("click", () => { // reset-buttonia painettaessa counter muuttujan arvo nollaantuu ja se tulostetaan timerboxiin
    console.log("Clicked resetTimerButton");
    s = 0;
    m = 0;
    h = 0;
    isCounterIncreasing = false;
    timerBox.textContent = counter; // tulostetaan counter arvo timerboxiin
});
