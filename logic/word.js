// DEPENDENCIES PACKAGES
// ==========================================================================
// This variable stores the letter.js file
var letter = require("./letter");


// FUNCTIONS
// ==========================================================================
// The Word() constructor handles creating an array of letter objects.
// Then determins if the user guessed every letter correctly.
function Word(word) {
    // Using the split() method to split the word into an array of letters
    this.letters = word.split("").map(function(char) {
        return new letter(char);
    });
};

// This function retrieves the solution
Word.prototype.getSolution = function() {
    return this.letters.map(function(letter) {
        // This returns the solution of solved letters
        return letter.getSolution();
    // This creates a string from the array of solved letters
    }).join("");
};

// This function handles turning the characters into a string
Word.prototype.toString = function() {
    // Returns letters as a string
    return this.letters.join(" ");
};

// This function checks if user's guess matches any of the letters in the array
Word.prototype.guessLetter = function(char) {
    // A false boolean that will be toggled depending on the user's guess
    var foundLetter = false;
    // This calls the this.letters() function for each element in the array
    this.letters.forEach(function(letter) {
        // If the letter guessed has a match...
        if (letter.guess(char)) {
            // Boolean is changed to true
            foundLetter = true;
        }
    });
    // Logging the letter guessed to the console
    console.log("\n" + this + "\n");
    // Returns either true or false depending if their is a match
    return foundLetter;
};

// This function returns true if all letters in the word have been guessed correctly
Word.prototype.guessedCorrectly = function() {
    // This callback function returns true for every element in the array
    return this.letters.every(function(letter) {
        // Returns the letter and makes it visible
        return letter.visible;
    });
};

// Exporting the Word.js file
module.exports = Word;