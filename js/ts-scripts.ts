export{};
let _this: any;
let maxChances: number = 6;

const gameController = {
    form: (< HTMLElement >document.querySelector('form')),
    input: (< HTMLInputElement >document.querySelector('[name="guess"]')),
    word: (< HTMLElement >document.querySelector('.word')),
    chances: (< HTMLElement >document.querySelector('.chances')),
    previousGuesses: (< HTMLElement >document.querySelector('.previous-guesses')),
} 

class Hangman {
    // properties
    runGame: boolean;
    words: string[];
    word: string;
    displayString: string;
    chances: number;
    previousGuesses: any[];
    
    constructor(runGame: boolean, words: string[],  word: any, displayString: string, chances: number, previousGuesses: string[]) { 
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
    run (): void {
        this.setup();
        _this = this;
        gameController.form.addEventListener('submit', this.guessLetter); //We can add the event listener to the form instead of the button becauses the button is type="submit"
    };

    //this method sets the gane up for the player
    setup = function () {
        // Reset the game back to a strating position
        gameController.previousGuesses.innerHTML = '';
        this.previousGuesses = [];
        this.chances = maxChances;
        this.displayString = '';

        // Get a new word randomly from the list of words
        let i = Math.floor(Math.random() * this.words.length);
        this.word = this.words[i];
        //How do we display enough empty spaces
        for (let i = 0; i < this.word.length; i++) this.displayString += '_'; //for loops do need {} braces IF we only have 1 line of code inside the loop. "this.displayString += '_';" is actually INSDE THE LOOP

        gameController.word.textContent = this.displayString;// get our value to show on screen
        gameController.chances.textContent = this.chances;// get our value to show on screen
        // get our values to show in console
        //console.log(this.word);
    };

    //This method handles the processing of the guessLetter and words to be guess
    guessLetter = function (event: any) {
        event.preventDefault();
        //Checked if the guessed lettr is in the word
        let letterOfWord: any = gameController.input.value;
        let lowerLetters = letterOfWord.toLowerCase();

        let check = _this.previousGuesses.find( (element: any): boolean => { return element === lowerLetters; });
        
        if (check == undefined) {
            _this.previousGuesses.push(lowerLetters);
        }

        if (_this.word.includes(lowerLetters)) {

            //Update the display string (showin the letters)
            for (let i = 0; i < _this.word.length; i++) {


                // Loop through each letter in our word, one by one
                let currentChar: string = _this.word.substr(i, 1);
                //If he current chaacter matches what we have guessed
                if (currentChar === lowerLetters) {
                    _this.displayString = //Slice the pieces that we need
                        _this.displayString.slice(0, i) +   // is grabbing al the underscores BEFORE our matched characters
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
        } else if (check == undefined) {
            // Letter is not in word
            
            //Removes a point for each missed guess
            _this.chances--;
            //update user interface
            gameController.chances.textContent = _this.chances;

            if (_this.chances < 0) {
                _this.lose();
            }
        } else {
            alert("Guess already made. Need not enter previous guesses again, please");
        }
        
        //Handles resetting values after game is over

        gameController.input.value = '';
        gameController.previousGuesses.textContent = _this.previousGuesses;
    };

    //Function that handles a win condition
    win = function (): void {
        if (confirm('Congratulations!! You Win! Do You Wish to Play again?')) {
            this.setup();
        }
    };

    //Function that handles a lose condition
    lose = function (): void {
        if (confirm('Sorry, You lose! Play again?')) {
            this.setup();
        }
    };
};


//Assigning values to properties of Hangman at runtime
let words = ["apple", "pineapples", "apples", "kiwi", "peach", "bananas", "reserved", "pears", "mangoes", "guava", "mountain", "hills", "valleys", "rivers", "streams", "lakes"];
let word = '';
let displayString = '';
let chances = maxChances;
let previousGuesses;
let runGame = true;

//Instantiating the class and reading its default state at run time.   
var game = new Hangman(runGame, words, word, displayString, chances, previousGuesses);
game.run();