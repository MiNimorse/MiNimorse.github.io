// To do list
//  -Time out
//  -

$(document).ready(function() {
    let Alphabetwant = [''];
    let morseString = '';
    let GamePoint = 0;
    let pressStartTime = 0;
    let pressTimer = null;
    const longPressDuration = 400;
    const timeOutDuration = 3000;

    const morseButton = $('#morseButton');
    const collectedMorseSpan = $('#collectedMorse');
    const AlphabetHead = $('#AlphabetHead');
    const Point = $('#GamePoint');

    function manualDecode() {
        if (Alphabetwant.includes('E') || Alphabetwant.includes('T')) {
            if (morseString === '.') {
                morseString = 'E';
            } else if (morseString === '-') {
                morseString = 'T';
            }
        } else if (Alphabetwant.includes('I') || Alphabetwant.includes('M')) {
            if (morseString === '..') {
                morseString = 'I';
            } else if (morseString === '--') {
                morseString = 'M';
            }
        } else if (Alphabetwant.includes('A') || Alphabetwant.includes('N')) {
            if (morseString === '.-') {
                morseString = 'A';
            } else if (morseString === '-.') {
                morseString = 'N';
            }
        } else if (Alphabetwant.includes('S') || Alphabetwant.includes('O')) {
            if (morseString === '...') {
                morseString = 'S';
            } else if (morseString === '---') {
                morseString = 'O';
            }
        } else if (Alphabetwant.includes('U') || Alphabetwant.includes('G')) {
            if (morseString === '..-') {
                morseString = 'U';
            } else if (morseString === '--.') {
                morseString = 'G';
            }
        } else if (Alphabetwant.includes('R') || Alphabetwant.includes('K')) {
            if (morseString === '.-.') {
                morseString = 'R';
            } else if (morseString === '-.-') {
                morseString = 'K';
            }
        } else if (Alphabetwant.includes('W') || Alphabetwant.includes('D')) {
            if (morseString === '.--') {
                morseString = 'W';
            } else if (morseString === '-..') {
                morseString = 'D';
            }
        } else if (Alphabetwant.includes('H') || Alphabetwant.includes('Q')) {
            if (morseString === '....') {
                morseString = 'H';
            } else if (morseString === '--.-') {
                morseString = 'Q';
            }
        } else if (Alphabetwant.includes('V') || Alphabetwant.includes('Z')) {
            if (morseString === '...-') {
                morseString = 'V';
            } else if (morseString === '--..') {
                morseString = 'Z';
            }
        } else if (Alphabetwant.includes('F') || Alphabetwant.includes('Y')) {
            if (morseString === '..-.') {
                morseString = 'F';
            } else if (morseString === '-.--') {
                morseString = 'Y';
            }
        } else if (Alphabetwant.includes('L') || Alphabetwant.includes('C')) {
            if (morseString === '.-..') {
                morseString = 'L';
            } else if (morseString === '-.-.') {
                morseString = 'C';
            }
        } else if (Alphabetwant.includes('P') || Alphabetwant.includes('X')) {
            if (morseString === '.--.') {
                morseString = 'P';
            } else if (morseString === '-..-') {
                morseString = 'X';
            }
        } else if (Alphabetwant.includes('J') || Alphabetwant.includes('B')) {
            if (morseString === '.---') {
                morseString = 'J';
            } else if (morseString === '-...') {
                morseString = 'B';
            }
        }

    }

    function RandomAlpha() {
        const Randomlaw = Math.floor(Math.random() * Alphabetwant.length);
        const AlphabetNow = Alphabetwant[Randomlaw];
        AlphabetHead.text(AlphabetNow);
        return AlphabetNow;
    }


    function Update() {
        Point.text(GamePoint);
    }

    function RandomNext() {
        const selectedAlphabet = RandomAlpha();
        AlphabetHead.text(selectedAlphabet);
    }

    function clearMorseString() {
        morseString = '';
        collectedMorseSpan.text(morseString);
    }

    function repeatClear() {
        clearMorseString();
        setTimeout(repeatClear, timeOutDuration);
    }

    morseButton.mousedown(function() {
        pressStartTime = new Date().getTime();
        pressTimer = setTimeout(function() {
            morseString += '-';
            collectedMorseSpan.text(morseString);
        }, longPressDuration);
    });

    morseButton.mouseup(function() {
        clearTimeout(pressTimer);
        const pressEndTime = new Date().getTime();
        const pressDuration = pressEndTime - pressStartTime;
        Update();

        if (pressDuration <= longPressDuration) {
            morseString += '.';
            collectedMorseSpan.text(morseString);
        }

        const currentAlphabet = AlphabetHead.text();
        manualDecode();

        if (morseString === currentAlphabet) {
            GamePoint += 1;
            Update();
            clearMorseString();
            RandomNext();
        }
    });

    repeatClear();
    RandomNext();
    Update();

    /////////////////////////////////////////////////

    function changeArray(buttonIndex) {
        const arrays = [
            ['E', 'T'], //  .    / -
            ['I', 'M'], //  ..   / --
            ['A', 'N'], //  .-   / -.
            ['S', 'O'], //  ...  / ---
            ['U', 'G'], //  ..-  / --.
            ['R', 'K'], //  .-.  / -.-
            ['W', 'D'], //  .--  / -..
            ['H', 'Q'], //  .... / --.-
            ['V', 'Z'], //  ...- / --..
            ['F', 'Y'], //  ..-. / -.--
            ['L', 'C'], //  .-.. / -.-.
            ['P', 'X'], //  .--. / -..-
            ['J', 'B'] //  .--- / -...
        ];

        if (buttonIndex >= 0 && buttonIndex < arrays.length) {
            Alphabetwant = arrays[buttonIndex]; // Reassign the variable Alphabetwant
            RandomAlpha();
            GamePoint = 0;
            Update();
            console.log('Alphabetwant array has been changed to:', Alphabetwant);
            $('.changeArrayButton').hide();
            $("#Main").show();
            $('#Back').show();
        } else {
            console.log('Invalid button index:', buttonIndex);
        }
    }

    $('.changeArrayButton').click(function() {
        // Get the index of the button clicked (0-based)
        const buttonIndex = $('.changeArrayButton').index(this);
        changeArray(buttonIndex);
    });

    $('#Back').click(function() {
        $('.changeArrayButton').show();
        $("#Main").hide();
        $('#Back').hide();
    });

});