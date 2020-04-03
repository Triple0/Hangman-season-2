var _this;
var maxChances = 6;
var gameController = {
    form: document.querySelector('form'),
    input: document.querySelector('[name="guess"]'),
    word: document.querySelector('.word'),
    chances: document.querySelector('.chances'),
    previousGuesses: document.querySelector('.previous-guesses')
};
var Hangman = /** @class */ (function () {
    function Hangman(runGame, words, word, displayString, chances, previousGuesses) {
        //this method sets the gane up for the player
        this.setup = function () {
            // Reset the game back to a strating position
            gameController.previousGuesses.innerHTML = '';
            this.previousGuesses = [];
            this.chances = maxChances;
            this.displayString = '';
            // Get a new word randomly from the list of words
            var i = Math.floor(Math.random() * this.words.length);
            this.word = this.words[i];
            //How do we display enough empty spaces
            for (var i_1 = 0; i_1 < this.word.length; i_1++)
                this.displayString += '_'; //for loops do need {} braces IF we only have 1 line of code inside the loop. "this.displayString += '_';" is actually INSDE THE LOOP
            gameController.word.textContent = this.displayString; // get our value to show on screen
            gameController.chances.textContent = this.chances; // get our value to show on screen
            // get our values to show in console
            //console.log(this.word);
        };
        //This method handles the processing of the guessLetter and words to be guess
        this.guessLetter = function (event) {
            event.preventDefault();
            //Checked if the guessed lettr is in the word
            var letterOfWord = gameController.input.value;
            var lowerLetters = letterOfWord.toLowerCase();
            var check = _this.previousGuesses.find(function (element) { return element === lowerLetters; });
            if (check == undefined) {
                _this.previousGuesses.push(lowerLetters);
            }
            if (_this.word.includes(lowerLetters)) {
                //Update the display string (showin the letters)
                for (var i = 0; i < _this.word.length; i++) {
                    // Loop through each letter in our word, one by one
                    var currentChar = _this.word.substr(i, 1);
                    //If he current chaacter matches what we have guessed
                    if (currentChar === lowerLetters) {
                        _this.displayString = //Slice the pieces that we need
                            _this.displayString.slice(0, i) + // is grabbing al the underscores BEFORE our matched characters
                                currentChar + //
                                _this.displayString.slice(i + 1, _this.displayString.length);
                        // We still have to output our code to the browser
                        gameController.word.textContent = _this.displayString;
                    }
                }
                // Has the word been completely solved?
                if (!gameController.word.textContent.includes('_')) {
                    // Declares the player a winner
                    _this.win();
                }
            }
            else if (check == undefined) {
                // Letter is not in word
                //Removes a point for each missed guess
                _this.chances--;
                //update user interface
                gameController.chances.textContent = _this.chances;
                if (_this.chances < 0) {
                    _this.lose();
                }
            }
            else {
                alert("Guess already made. Need not enter previous guesses again, please");
            }
            //Handles resetting values after game is over
            gameController.input.value = '';
            gameController.previousGuesses.textContent = _this.previousGuesses;
        };
        //Function that handles a win condition
        this.win = function () {
            if (confirm('Congratulations!! You Win! Do You Wish to Play again?')) {
                this.setup();
            }
        };
        //Function that handles a lose condition
        this.lose = function () {
            if (confirm('Sorry, You lose! Play again?')) {
                this.setup();
            }
        };
        this.runGame = runGame;
        this.words = words;
        this.word = word;
        this.displayString = displayString;
        this.chances = chances;
        this.previousGuesses = [];
    }
    // constructor () { 
    //     this.runGame = true;
    //     this.words = ["apple", "pineapples", "apples", "kiwi", "peach", "bananas", "reserved", "pears", "mangoes", "guava", "mountain", "hills", "valleys", "rivers", "streams", "lakes"];
    //     this.word = '';
    //     this.displayString = '';
    //     this.chances = maxChances;
    //     this.previousGuesses = [];
    // } 
    //Methods of the Hangman
    //this handles the running of the game
    Hangman.prototype.run = function () {
        this.setup();
        _this = this;
        gameController.form.addEventListener('submit', this.guessLetter); //We can add the event listener to the form instead of the button becauses the button is type="submit"
    };
    ;
    return Hangman;
}());
;
//Assigning values to properties of Hangman at runtime
var words = ["apple", "pineapples", "apples", "kiwi", "peach", "bananas", "reserved", "pears", "mangoes", "guava", "mountain", "hills", "valleys", "rivers", "streams", "lakes"];
var word = '';
var displayString = '';
var chances = maxChances;
var previousGuesses;
var runGame = true;
//Instantiating the class and reading its default state at run time.   
var game = new Hangman(runGame, words, word, displayString, chances, previousGuesses);
game.run();
