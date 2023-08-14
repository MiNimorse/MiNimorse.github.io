let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');

let pressStartTime = 0;
let pressEndTime = 0; // Initialize pressEndTime
let pressTimer = null;
const longPressDuration = 400; // Long press duration
const timeOutDuration = 5000; // Clear time in

morseButton.addEventListener('mousedown', () => {
    pressStartTime = new Date().getTime();
});

morseButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer); // Clear the press timer

    // Calculate time from mouseup to detect long press timeout
    const outStartTime = new Date().getTime();
    const pressDuration = outStartTime - pressStartTime;

    if (pressDuration <= longPressDuration) {
        morseString += '.';
    } else if (pressDuration >= longPressDuration){
        morseString += '-';
    }

    collectedMorseSpan.textContent = morseString;
});

/* Morse Reading n shouting Section */

const morse = require('morse-decoder');
const decode = document.getElementById('Decoded');
const DecodedMorseCode = (morse.decode('morseString'));


decode.textContent = DecodedMorseCode;