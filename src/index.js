let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');

let pressStartTime = 0;
let pressEndTime = 0; // Initialize pressEndTime
let pressTimer = null;
const longPressDuration = 400; // Long press duration
const timeOutDuration = 5000; // Clear time in

let autoDecodeTimer = null;
const autoDecodeTimeout = 3000; // Auto decode timeout duration

function clearMorseString() {
    morseString = '';
    collectedMorseSpan.textContent = morseString;
}

function decodeMorse() {
    const morseDecoder = require('morse-decoder');
    const decodedMorseCode = morseDecoder.decode('morseString');
    const decode = document.getElementById('Decoded');
    decode.textContent = decodedMorseCode;
}

morseButton.addEventListener('mousedown', () => {
    pressStartTime = new Date().getTime();
    pressTimer = setTimeout(() => {
        morseString += '-';
        collectedMorseSpan.textContent = morseString;
        clearTimeout(autoDecodeTimer); // Reset the auto decode timer
    }, longPressDuration);
});

morseButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer); // Clear the press timer

    // Calculate time from mouseup to detect long press timeout
    const outStartTime = new Date().getTime();
    const pressDuration = outStartTime - pressStartTime;

    if (pressDuration <= longPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;

        clearTimeout(autoDecodeTimer); // Reset the auto decode timer
    }

    // Set a new auto decode timer
    autoDecodeTimer = setTimeout(() => {
        decodeMorse();
        clearMorseString();
    }, autoDecodeTimeout);
});

// Clear the Morse string after the specified timeout
setTimeout(() => {
    clearMorseString();
}, timeOutDuration);