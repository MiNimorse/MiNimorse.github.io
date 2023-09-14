$(document).ready(function() {
    let Alphabetwant = [''];
    let morseString = '';
    let GamePoint = 0;
    let pressStartTime = 0;
    let pressTimer = null;
    let timeOutDuration;
    const longPressDuration = 400;


    const morseButton = $('#morseButton');
    const collectedMorseSpan = $('#collectedMorse');
    const AlphabetHead = $('#AlphabetHead');
    const Point = $('#GamePoint');
    const DisplayStage = $('#StageName');

    function manualDecode() {
        if (Alphabetwant.includes('E') || Alphabetwant.includes('T')) {
            timeOutDuration = 3000;
            if (morseString === '.') {
                morseString = 'E';
            } else if (morseString === '-') {
                morseString = 'T';
            }
        } else if (Alphabetwant.includes('I') || Alphabetwant.includes('M')) {
            timeOutDuration = 3000;
            if (morseString === '..') {
                morseString = 'I';
            } else if (morseString === '--') {
                morseString = 'M';
            }
        } else if (Alphabetwant.includes('A') || Alphabetwant.includes('N')) {
            timeOutDuration = 3000;
            if (morseString === '.-') {
                morseString = 'A';
            } else if (morseString === '-.') {
                morseString = 'N';
            }
        } else if (Alphabetwant.includes('S') || Alphabetwant.includes('O')) {
            timeOutDuration = 4500;
            if (morseString === '...') {
                morseString = 'S';
            } else if (morseString === '---') {
                morseString = 'O';
            }
        } else if (Alphabetwant.includes('U') || Alphabetwant.includes('G')) {
            timeOutDuration = 4500;
            if (morseString === '..-') {
                morseString = 'U';
            } else if (morseString === '--.') {
                morseString = 'G';
            }
        } else if (Alphabetwant.includes('R') || Alphabetwant.includes('K')) {
            timeOutDuration = 4500;
            if (morseString === '.-.') {
                morseString = 'R';
            } else if (morseString === '-.-') {
                morseString = 'K';
            }
        } else if (Alphabetwant.includes('W') || Alphabetwant.includes('D')) {
            timeOutDuration = 4500;
            if (morseString === '.--') {
                morseString = 'W';
            } else if (morseString === '-..') {
                morseString = 'D';
            }
        } else if (Alphabetwant.includes('H') || Alphabetwant.includes('Q')) {
            timeOutDuration = 5000;
            if (morseString === '....') {
                morseString = 'H';
            } else if (morseString === '--.-') {
                morseString = 'Q';
            }
        } else if (Alphabetwant.includes('V') || Alphabetwant.includes('Z')) {
            timeOutDuration = 5000;
            if (morseString === '...-') {
                morseString = 'V';
            } else if (morseString === '--..') {
                morseString = 'Z';
            }
        } else if (Alphabetwant.includes('F') || Alphabetwant.includes('Y')) {
            timeOutDuration = 5000;
            if (morseString === '..-.') {
                morseString = 'F';
            } else if (morseString === '-.--') {
                morseString = 'Y';
            }
        } else if (Alphabetwant.includes('L') || Alphabetwant.includes('C')) {
            timeOutDuration = 5000;
            if (morseString === '.-..') {
                morseString = 'L';
            } else if (morseString === '-.-.') {
                morseString = 'C';
            }
        } else if (Alphabetwant.includes('P') || Alphabetwant.includes('X')) {
            timeOutDuration = 5000;
            if (morseString === '.--.') {
                morseString = 'P';
            } else if (morseString === '-..-') {
                morseString = 'X';
            }
        } else if (Alphabetwant.includes('J') || Alphabetwant.includes('B')) {
            timeOutDuration = 5000;
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

    function StageName(array) {
        DisplayStage.empty();
        for (let i = 0; i < array.length; i++) {
            const character = array[i];
            const characterElement = $('<span>').text(character + ' '); //you can add word between char by change that ' '
            DisplayStage.append(characterElement);
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

    repeatClear();
    RandomNext();
    Update();

    /////////////////////////////////////////////////

    function changeStage(buttonIndex) {
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
            Alphabetwant = arrays[buttonIndex];
            RandomAlpha();
            GamePoint = 0;
            Update();
            StageName(Alphabetwant);
            console.log('Alphabetwant array has been changed to:', Alphabetwant);
            $('.changeStageButton').hide();
            $("#Main").show();
            $('#MainHide').hide();
            $('#Back').show();
            $('#BackHide').show();
        } else {
            console.log('Invalid button index:', buttonIndex);
        }
    }

    $('.changeStageButton').click(function() {
        const buttonIndex = $('.changeStageButton').index(this);
        changeStage(buttonIndex);
    });

    $('#Back').click(function() {
        $('.changeStageButton').show();
        $("#Main").hide();
        $('#MainHide').show();
        $('#Back').hide();
        $('#BackHide').hide();
    });

});