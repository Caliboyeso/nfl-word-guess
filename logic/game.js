// DEPENDENCIES PACKAGES
// ==========================================================================
// This stores the inquirer package
var inquirer = require("inquirer");

// This stores the chalk package
var chalk = require("chalk");

// This stores the word.js file
var word = require("./word");

// This stores the nflList.js file
var nflList = require("./nflList");


// FUNCTIONS
// ==========================================================================
// The Game() constructor is responsible for keeping score and control the flow of the game
function Game() {
    // Saving the 'this' reference
    var self = this;

    // This function sets the number of guesses and grabs the next word
    this.play = function() {
        // User gets 10 guesses per round
        this.guessesLeft = 10;
        // Getting the next word by calling the nextWord() function
        this.nextWord();
    };

    // This function creates a new Word object and allows the user to guest
    this.nextWord = function() {
        // This stores a football team name that is randomly picked from the wordsList array
        var randomWord = nflList[Math.floor(Math.random() * nflList.length)];
        // This stores a random new Word object
        this.currentWord = new word(randomWord);
        // Logging the current word to the console
        console.log("\n" + this.currentWord + "\n");
        // Calling the makeGuess() function
        this.checkAnswer();
    };

    // This function checks if the user get the word right or wrong
    this.checkAnswer = function() {
        // Calling the checkLetters() function
        this.checkLetters().then(function() {
            // If the user has has no more guesses...
            if (self.guessesLeft < 1) {
                // Logging a defeat message with the correct word to the console by calling the getSolution() function
                console.log("Sorry! You ran out of guesses...");
                console.log("The team was the: " + self.currentWord.getSolution() + "!");
                // Calling the playAgain() function
                self.playAgain();
            }
            // Else if the user guessed correctly...
            else if (self.currentWord.guessedCorrectly()) {
                // Logging a victory message with correct word to the console
                console.log("Touchdown! The team is the: " + self.currentWord + "!");
                // Reseting the guesses back to 10
                self.guessesLeft = 10;
                // Calling the nextWord() function
                self.nextWord();
            }
            // Else otherwise let the user keep guessing
            else {
                // Calling the makeGuess() function
                self.checkAnswer();
            }
        });
    };

    // This function asks the user if they want to play again
    this.playAgain = function() {
        // Using the inquirer package to capture the users input and displays a dialog box using the prompt() method
        inquirer.prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Try again?"
            }
        ])
        // Using the then() method to return a promise
        .then(function(val) {
            // If the user says yes to playing again...
            if (val.choice) {
                // Calling the play() function
                self.play();
            }
            // Else otherwise quit the game...
            else {
                // Calling the quit() function
                self.quit();
            }
        });
    };

    // This function checks if the letters guessed are correct or incorrect
    this.checkLetters = function() {
        // Returns the inquirer package to capture user input and display a dialog box using the prompt() method
        return inquirer.prompt([
            {
                type: "input",
                name: "choice",
                message: "Guess the NFL team!",
                // This function ensures that the user input is clean, correct, and useful
                validate: function(val) {
                    // Returns an array if a match is found using the gi modifier to do a case insensitive search of all occurrences of a regular expression in a string
                    return /[a-z1-9]/gi.test(val);
                }
            }
        ])
        // Using the then() method to return a promise
        .then(function(val) {
            // This stores the letter the user guessed correctly
            var userGuessedCorrectly = self.currentWord.guessLetter(val.choice);
            // If the the letter guessed is in the hidden word...
            if (userGuessedCorrectly) {
                // Logging a 'correct' message to the console
                console.log(chalk.green("\nCorrect!\n"));
            }
            // Else if the letter guessed is not in the hidden word...
            else {
                // Subtract one from the number of guesses the user has
                self.guessesLeft--;
                // Logging a 'incorrect' message to the console
                console.log(chalk.red("\nIncorrect!\n"));
                // Logging a the number of guesses the user has left
                console.log("You have " + self.guessesLeft + " guesses left...\n");
            }
        });
    };

    // This function ends the game
    this.quit = function() {
        // Logging a goodbye message to the console
        console.log("\nGoodbye!");
        // Using the exit() method to terminate the game
        process.exit(0);
    };

}

// Exporting the Game() function
module.exports = Game;