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
        if (Alphabetwant == 'E', 'T') {
            if (morseString === '.') {
                morseString = 'E';
            } else if (morseString === '-') {
                morseString = 'T';
            }
        } else if (Alphabetwant == 'I', 'M') {
            if (morseString === '..') {
                morseString = 'I';
            } else if (morseString === '--') {
                morseString = 'M';
            }
        } else if (Alphabetwant == 'A', 'N') {
            if (morseString === '.-') {
                morseString = 'A';
            } else if (morseString === '-.') {
                morseString = 'N';
            }
        } else if (Alphabetwant === ['']) {
            console.log("Arai")
        } else {
            console.log("??")
            console.log(Alphabetwant)
        }

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

    function RandomAlpha() {
        const Randomlaw = Math.floor(Math.random() * Alphabetwant.length);
        const AlphabetNow = Alphabetwant[Randomlaw];
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