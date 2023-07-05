//============= GLOBAL VARIABLES ==============
//select the input boxes from the DOM and create a nodeList
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

//=============== LOGIC =======================

//create a wrapping function that will allow us to do await wherever we want to later on
async function init() {
  let currentGuess = "";
  //the DOM equivalent of what attempt (1 - 6) in the gameplay the user is on
  let currentRow = 0;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      //add letter to the end
      currentGuess += letter;
    } else {
      //if on the last letter --> replace last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    //render the users keyed letters on the correlating DOM elements innerText:
    //currentGuess.length - 1; indexes start at 0 (not 1). Thus, we get the index of the DOM element that corresponds to the current position of the users guess
    //letters (from the querySelectAll) acting as the DOM element
    //letter (from the addLetter parameter) acting as the usersKeyedLetter
    // becomes --> letters[currentGuess.length - 1].innerText = letter;
    //Where (the inner text of the DOM elements current index) = (the users keyed letter changed to uppercase);
    //Same concept as let name[0] = "Jim; name[1] = "Ted"; name[2] = "Larry" but instead --> DOM[0].innerText = "C"; DOM[1].innerText = "L"; DOM[2].innerText = "E")
    //to ensure we render on the DOM element of the current row (attempt) we add ANSWER_LENGTH (always 5) * currentRow (starting at 0) in front to account for what has already taken place. Thus, row 1: [5 * 0 + currentGuess] --> current Guess starts at 0; row 2: [5 * 1 + currentGuess] --> currentGuess starts at 6 etc.
    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGTH) {
      // do nothing
      return;
    }

    //TODO validate the word

    //TODO do all the marking as "correct", "close", or "wrong"

    //TODO did they win or lose?

    currentRow++;
    //new row, so reassign their current guess to empty string
    currentGuess = "";
  }

  function backspace() {
    //Lops off the last element
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    //Once the last index is deleted now render on the DOM
    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    //event.key to capture the users key entered
    const action = event.key;

    //if users key press is Enter -->
    if (action === "Enter") {
      //User tries to commit a guess
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
10 - define/ fill in the addLetter function as it was evoked in the handleKeyPress function previously. 
    * We will need a variable to store the length of the current guess for our conditional statement
    * We will need a variable to store the max length of letters for the users guess. It will be constant and will not change. We will use it to compare the previous variable of the length of the current guess to.
    * create conditionals for whether the letter keyed is the last letter or not and respond accordingly
    * finally, add the users keyed letters to the DOM
11 - define/ fill in the commit function
    * if users guess !== expected character length
    * need a variable to track what row (likened to what attempt 1- 6) they are on in the DOM
    * ensure the current DOM rendering is adjusted according to the current row/ attempt of the user
    * For Later: validate the word
    * For Later: do all the marking as "correct", "close", or "wrong"
    * For Later: Did they win or lose?
12 - define/ fill in the backspace function
    * create new string that does not include last index of old string
    * replace last index of current 

*/
