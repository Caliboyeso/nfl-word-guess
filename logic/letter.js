// FUNCTIONS
// ==========================================================================
// The letter() constructor handles displaying either an underscore or the underlying character for each letter in the word
function letter(char) {
    // If a character is not a letter or a number, make it visible
    this.visible = !/[a-z1-9]/i.test(char);
    // This saves the underlying character
    this.char = char;
};

// This function returns either an underscore or the underlying character
letter.prototype.toString = function() {
    // If the character is a number or a letter...
    if (this.visible === true) {
        // Returns the character
        return this.char;
    }
    // Return a underscore if the character is not a number or a letter
    return "_";
};

// This function retrieves the solution
letter.prototype.getSolution = function() {
    // Returns the character
    return this.char;
};

// This function handles the user's guess
letter.prototype.guess = function(charGuess) {
    // If the character guessed matches the character...
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }
    // Else return false
    return false;
};

// Exporting the letter.js file
module.exports = letter;