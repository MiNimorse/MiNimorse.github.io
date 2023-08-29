let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');
const AlphabetHead = document.getElementById('AlphabetHead');
const Point = document.getElementById('GamePoint');

let pressStartTime = 0;
let pressTimer = null;
const longPressDuration = 400;
const decodeTime = 3000;
const timeOutDuration = 5000;

const Alphabetwant = ['A', 'E'];

const GamePoint = 0;

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

function manualDecode() {
    if (morseString == '.-') {
        morseString = 'A';
    } else if (morseString == '.') {
        morseString = 'E';
    }
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
    GamePoint.textContent = Point;

    if (pressDuration <= longPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;
    }

    // Compare the entered morseString with the corresponding morse code
    const currentAlphabet = AlphabetHead.textContent;
    //const morseDecoder = require('morse-decoder');
    // const morseAlphabet = morseDecoder.decode(morseString);

    manualDecode();

    console.log(GamePoint);
    GamePoint.textContent = Point;


    if (morseString == currentAlphabet) {
        GamePoint += 1;
        GamePoint.textContent = GamePoint;
        clearMorseString();
        RandomNext();
    }

});

function Update() {
    GamePoint.textContent = Point;

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

RandomNext();