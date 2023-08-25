let morseString = '';
let Point = 0;

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');
const AlphabetHead = document.getElementById('AlphabetHead');

let pressStartTime = 0;
let pressTimer = null;
const longPressDuration = 400;
const timeOutDuration = 5000;

const Alphabetwant = ['A', 'B'];

function RandomAlpha() {
    let Randomlaw = Math.floor(Math.random() * Alphabetwant.length);
    const AlphabetNow = Alphabetwant[Randomlaw];

    return AlphabetNow;
}

function clearMorseString() {
    morseString = '';
    collectedMorseSpan.textContent = morseString;
}

morseButton.addEventListener('mousedown', () => {
    pressStartTime = new Date().getTime();
    pressTimer = setTimeout(() => {
        morseString += '-';
        collectedMorseSpan.textContent = morseString;
    }, longPressDuration);
});

morseButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer);
    const pressEndTime = new Date().getTime();
    const pressDuration = pressEndTime - pressStartTime;

    if (pressDuration <= longPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;
    }

    // Implement auto-decode functionality

    // Compare the entered morseString with the corresponding morse code
    const currentAlphabet = AlphabetHead.textContent;
    const morseDecoder = require('morse-decoder');
    const morseAlphabet = morseDecoder.encode(currentAlphabet);

    if (morseString === morseAlphabet) {
        Point += 1;
    }

    // Clear the morseString and update the score
    clearMorseString();
    // Update the UI with the score

    // Start a new round
    startNewRound();
});

function startNewRound() {
    const selectedAlphabet = RandomAlpha();
    AlphabetHead.textContent = selectedAlphabet;
}

// Clear the Morse string after the specified timeout
setTimeout(() => {
    clearMorseString();
}, timeOutDuration);

// Start the first round
startNewRound();