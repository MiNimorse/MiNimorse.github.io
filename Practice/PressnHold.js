const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');
const AlphabetHead = document.getElementById('AlphabetHead');
const Point = document.getElementById('GamePoint');

let morseString = '';
let GamePoint = 0;
let pressStartTime = 0;
let pressTimer = null;
const longPressDuration = 400;
const timeOutDuration = 3000;

const Alphabetwant = ['E', 'T'];

function manualDecode() {
    if (morseString == '.') {
        morseString = 'E';
    } else if (morseString == '-') {
        morseString = 'T';
    }
}

// https://en.wikipedia.org/wiki/Morse_code
// 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
// 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '..-.',
// 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
// 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
// 'Y': '-.--', 'Z': '--..'

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
    Update();

    if (pressDuration <= longPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;
    }

    const currentAlphabet = AlphabetHead.textContent;
    //const morseDecoder = require('morse-decoder');
    // const morseAlphabet = morseDecoder.decode(morseString);

    manualDecode();

    if (morseString == currentAlphabet) {
        GamePoint += 1;
        Update();
        clearMorseString();
        RandomNext();
    }

});

function Update() {
    Point.textContent = GamePoint;
}

function RandomNext() {
    const selectedAlphabet = RandomAlpha();
    AlphabetHead.textContent = selectedAlphabet;
}

// Clear the Morse string after the specified timeout
function repeatClear() {
    clearMorseString();
    setTimeout(repeatClear, timeOutDuration);
}

repeatClear();
RandomNext();
Update();