//============= GLOBAL VARIABLES ==============
//select the input boxes from the DOM and create a nodeList
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

//=============== LOGIC =======================

//create a wrapping function that will allow us to do await wherever we want to later on
async function init() {
  const currentGuess = "";
  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
    }
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
10 - Work on the addLetter function by creating/defining it as it was evoked in the handleKeyPress function previously. We will need a variable to store the length of the current guess for our conditional statement and another variable for what the max length of guess will be (constant; will not change) to compare it to.

*/
