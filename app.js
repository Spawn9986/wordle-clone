//============= GLOBAL VARIABLES ======================================================
//select the input boxes from the DOM and create a nodeList
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;

//create a wrapping function that will allow us to do await wherever we want to later on
async function init() {
  //=============== SUB-FUNCTIONS (ATTACKED BY ORDER OF PREFERENCE) =======================

  let currentGuess = "";
  //the DOM equivalent of what attempt (1 - 6) in the gameplay the user is on
  let currentRow = 0;

  //request the word from the API
  const res = await fetch(
    "https://words.dev-apis.com/word-of-the-day?random=1"
  );

  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  // Could have instead used destructuring bc we know that the obj we are getting back has a property in it called "word"
  //const { word } = await res.json();
  //create an array of letters from the API retrieved word (the correct answer) to compare to users guess later
  const wordParts = word.split("");

  //once we have the word from the API we no longer need the loading icon
  setLoading(false);
  console.log(word);

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

    //do all the marking as "correct", "close", or "wrong"
    //create an array of letters from the users guess
    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      //mark as correct
      if (guessParts[i] === wordParts[i]) {
        //whereever i is correct --> mark as green (from "correct" CSS class); add classList bc they are all DOM Nodes
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
      }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
      if (guessParts[i] === wordParts[i]) {
        // do nothing, we already did it
      } else if (
        wordParts.includes(guessParts[i]) /* TODO make this more accurate */
      ) {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }

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

  //=============== SKELETON/ OUTLINE (MAIN DELEGATING FUNCTION) ======================

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

//=============== SUPPORTING/ TERTIARY FUNCTIONS ======================================

//add a function to check whether or not the users key was a letter (a valid keystroke) using a regular expression
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
  //if loading is true --> show it; if false --> hide it; Use toggle instead of an if/then statement; Toggle on "show" class (it defaults to hidden do to the cascade in the CSS: info-bar visibility: hidden is above show visibility: visible) when it is loading
  loadingDiv.classList.toggle("show", isLoading);
}

//keep track of the amount of letters by adding letters to an object
function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    const letter = array[i];
    //if it exists
    if (obj[letter]) {
      obj[letter]++;
    } else {
      obj[letter] = 1;
    }
  }

  return obj;
}

//=============== EVOKE ANY GLOBAL/ INITIAL FUNCTIONS =================================

init();

//================ END OF CODE ========================================================

//=================== FLOW OF PROJECT==================================================

/* 

The way this project was attacked was dealing with all the user interaction stuff first (responding to keys pressed etc) and then talking to the backend and validation stuff after (getting the word from API, validating if users guess was a valid word, etc).

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
13 - get the word from the API and return in uppercase
14 - setLoading function which will check for isLoading. If/ while loading show the loading icon
15 - Go back and knock out the For Later: do all the marking as "correct", "close", or "wrong" from #11
  * create an array of letters from the users guess
  * create an array of letters from the retrieved API word
  * handle exact matches
  * handle close matches except multiple letters
  * handle wrong matches
16 - finish close matches from #15 but now handleing multiple letters
  * create an obj and map over the array of letters from the API word to keep track of number for each letter in word

*/
