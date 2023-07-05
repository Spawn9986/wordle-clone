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
}

init();

//=================== FLOW ===================
/* 

1 - Select DOM elements
2 - Add event listener with keydown function
3 - Setup the keydown function by capturing the users key press and storing it into a variable

*/
