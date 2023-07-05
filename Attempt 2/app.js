//============= GLOBAL VARIABLES ==============
//select the input boxes from the DOM and create a nodeList
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

//=============== LOGIC =======================

//create a wrapping function that will allow us to do await wherever we want to later on
async function init() {
  let currentGuess = "";

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
    } else {
      //if on the last letter (last index not to exceed max) create a string that takes off the last letter and adds the new letter keyed by user
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    //render the users keyed letters to the DOM. Since each index is 1 number behind (starts at index 0) we take the currentGuess character length - 1 to get the last available box; we also want the inner text;
    letters[currentGuess.length - 1].innerText = letter;
  }
  document.addEventListener("keydown", function handleKeyPress(event) {
    //event.key to capture the users key entered
    const action = event.key;

    //if users key press is Enter -->
    if (action === "Enter") {
      //function for when a user is trying to commit a guess
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    } else {
      // do nothing
    }
  });
}

//add a function to check whether or not the users key was a letter (a valid keystroke) using a regular expression
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

init();

//=================== FLOW ===================
/* 

1 - Select DOM elements
2 - Add event listener with keydown function
3 - Setup the keydown function by capturing the users key press and storing it into a variable
4 - Make initial function delegate to other functions depending on circumstance by creating additional inner functions
5 - Create if conditionals for keypress (Enter, backspace, letter)
6 - Create functions for when the user keys "Enter" (is trying to commit a guess) 
7 - Create functions for when the user keys "Backspace"
8 - Create functions for when the user keys a letter (will also need a function to evaluate if it's a letter then another for what to do after if so).
9 - Add function to letter conditional to evaluate whether user keyed a letter (i.e., a valid keystroke) 
10 - Work on the addLetter function by creating/defining it as it was evoked in the handleKeyPress function previously. 
    * We will need a variable to store the length of the current guess for our conditional statement
    * We will need a variable to store the max length of letters for the users guess. It will be constant and will not change. We will use it to compare the previous variable of the length of the current guess to.
    * create conditionals for whether the letter keyed is the last letter or not and respond accordingly
    * finally, add the users keyed letters to the DOM

*/
