let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');

let pressStartTime = 0;
let pressTimer = null;
const shortPressDuration = 100; // Short press duration in milliseconds
const maxPressDuration = 2000; // Maximum press duration in milliseconds

morseButton.addEventListener('mousedown', () => {
    pressStartTime = new Date().getTime();

    pressTimer = setTimeout(() => {
        morseString += '_';
        collectedMorseSpan.textContent = morseString;
    }, shortPressDuration);
});

morseButton.addEventListener('mouseup', () => {
    const pressEndTime = new Date().getTime();
    const pressDuration = pressEndTime - pressStartTime;

    clearTimeout(pressTimer);

    if (pressDuration > shortPressDuration && pressDuration <= maxPressDuration) {
        morseString += '.';
        collectedMorseSpan.textContent = morseString;
    } else if (pressDuration > maxPressDuration) {
        morseString = '';
        collectedMorseSpan.textContent = morseString;
    }

    pressStartTime = 0;
});