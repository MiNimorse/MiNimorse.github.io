let morseString = '';

const morseButton = document.getElementById('morseButton');
const collectedMorseSpan = document.getElementById('collectedMorse');


let pressStartTime = 0;
let pressEndTime = 0; // Initialize pressEndTime
let pressTimer = null;
const longPressDuration = 400; // Long press duration
const timeOutDuration = 10000; // Clear time in

morseButton.addEventListener('mousedown', () => {
    pressStartTime = new Date().getTime();

    pressTimer = setTimeout(() => {
        // Calculate press duration inside the timeout
        pressEndTime = new Date().getTime();
        const pressDuration = pressEndTime - pressStartTime;

        if (pressDuration <= longPressDuration) {
            morseString += '.';
        } else if (pressDuration > longPressDuration) {
            morseString += '_';
        }

        collectedMorseSpan.textContent = morseString;
    }, 100);
});

morseButton.addEventListener('mouseup', () => {
    clearTimeout(pressTimer); // Clear the press timer

    // Calculate time from mouseup to detect long press timeout
    const outStartTime = new Date().getTime();
    const pressDuration = outStartTime - pressStartTime;

    if (pressDuration > timeOutDuration) {
        morseString = '';
    }

    collectedMorseSpan.textContent = morseString;
});