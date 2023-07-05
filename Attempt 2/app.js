//============= GLOBAL VARIABLES ==============
//select the input boxes from the DOM and create a nodeList
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

//=============== LOGIC =======================

//create a wrapping function that will allow us to do await wherever we want to later on
async function init() {
  document.addEventListener("keydown", function handleKeyPress(event) {
    //event.key to capture the users key entered
    const action = event.key;
    console.log(action);
  });

  //if users key press is Enter -->
  if (action === "Enter") {
    //function for when a user is trying to commit a guess
    commit();
  } else if (action === "Backspace") {
    backspace();
  } else if (isLetter(action)) {
    addLetter(action.toUppercase());
  } else {
    // do nothing
  }
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

*/
