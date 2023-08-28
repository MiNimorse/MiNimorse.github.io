let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');
const AlphabetHead = document.getElementById('AlphabetHead');
let GamePoint = document.getElementById('GamePoint');

let pressStartTime = 0;
let pressTimer = null;
const longPressDuration = 400;
const timeOutDuration = 5000;

const Alphabetwant = ['A', 'A'];

GamePoint = 0;

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

function manualDecode(){
    if (morseString == '.-')   {
        morseString = A;
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
    GamePoint.textContent = GamePoint;

    if (pressDuration <= longPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;
    }

    // Implement auto-decode functionality

    // Compare the entered morseString with the corresponding morse code
    const currentAlphabet = AlphabetHead.textContent;    
    // const morseDecoder = require('morse-decoder');
    // const morseAlphabet = morseDecoder.decode(morseString);
    manualDecode();

    if (morseString == currentAlphabet) {
        GamePoint += 1;
        GamePoint.textContent = GamePoint;
        clearMorseString();
    }


    // Start a new round
    startNewRound();
});

function startNewRound() {
    const selectedAlphabet = RandomAlpha();
    AlphabetHead.textContent = selectedAlphabet;
}

// Clear the Morse string after the specified timeout
function repeatClear()  {
    clearMorseString();   
    setTimeout(repeatClear, timeOutDuration);
}


// Start the first round
startNewRound();