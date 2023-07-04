//============= GLOBAL VARIABLES ==============
const boxes = document.querySelectorAll(".itm");
//convert nodelist returned from querySelectAll to an array
let boxesArray = Array.from(boxes);

let index = 0;
let previousKey;
//************************ NEED TO REPLACE tempWOTD WITH WORD RETRIVED FROM THE API FETCH REQUEST (GET). CURRENTLY NOT UNSURE HOW TO USE THE RETRIEVED WORD IN handleEnter() SCOPE, compareArrays, etc. FUNCTIONS WITH IT BEING ASYNCRONOUS. ************************/
let tempWOTD = "clean";

//============= LOGIC =========================

// retrieve word from API
async function getWord(url) {
  let response = await fetch(url);
  response = await response.json();
  console.log(response);
  return response;
}

document.addEventListener("keydown", keyDown);

function keyDown(event) {
  const key = event.key;

  if (isLetter(key)) {
    handleLetter(key);
  } else if (key === "Backspace") {
    handleBackspace();
  } else if (key === "Enter") {
    handleEnter();
  } else event.preventDefault();

  previousKey = key;
}

//check if the key pressed by user is a single letter using a regular expression which defines a search pattern for parsing and finding matches in a given string with the test() method. The /[a-zA-Z]/ regex means "match all strings that start with a letter".
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function handleLetter(value) {
  boxes[index].innerText = value.toUpperCase();
  //only allow 5 letters at a time.
  if (index > 3) {
    return;
  } else {
    //only increase index and move to the next box if user keys a valid letter and not beyond 5 letters
    index++;
  }
}

function handleBackspace() {
  //currently index 3 is not working
  console.log("success");
  console.log(index);
  //********************* WHEN INDEX === 4 (AFTER INDEX 3 FINISHED) & prevKey != BACKSPACE DOESN'T WORK: U HAVE TO PRESS IT 2X TO GET IT TO WORK *********/
  if (index > 3) {
    if (previousKey === "Backspace") {
      boxes[index - 1].innerText = "";
      index -= 1;
    } else {
      /* else if () {

    } */
      boxes[index].innerText = "";
    }
  } else {
    boxes[index - 1].innerText = "";
    index -= 1;
  }
}

function handleEnter() {
  // for usersGuess, take querrySelectAll which outputs result in a nodelist to an array
  let boxesArrayOfLetters = [];
  //iterate over the sub-array pushing the inner text of each into a new array
  for (let i = 0; i < boxesArray.length; i++) {
    boxesArrayOfLetters.push(boxesArray[i].innerText);
  }
  //for the users guess, we only want the first 5 indexes (the current 5 letter guess) of the array
  let usersGuessArray = boxesArrayOfLetters.slice(0, 5);
  console.log("slice", usersGuessArray);

  //for users guess, convert array of letters into a string (i.e., a word)
  let usersGuessString = boxesArrayOfLetters.join("");

  //create a POST request to check if users guess was a valid word
  let isValid = fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      //******* NEED TO CHANGE tempWOTD to usersGuess eventually ******
      word: usersGuessString,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json.validWord);
    });
  //********** NEED TO MAKE isValid WAIT FOR TRUE BC RIGHT NOW IT IS ENTERING EVEN IF FALSE BC ITS NOT WAITING FOR POST REQUEST RESPONSE *****/
  if (isValid) {
    console.log("entered isValid if");
    // Want to compare retrieved word from API with the users guess
    //convert API word from string to an array
    let WOTDArray = tempWOTD.toUpperCase().split("");

    // compare the two arrays
    for (let i = 0; i < usersGuessArray; i++) {
      if (usersGuessArray[i] === WOTDArray[i]) {
        console.log("exact match", usersGuessArray[i]);
      } else if (WOTDArray.includes(usersGuessArray[i])) {
        console.log("close match", usersGuessArray[i]);
      } else console.log("No matches", usersGuessArray[i]);
    }
  }
}

//============ EVOKE INIT FUNCTIONS ========

getWord("https://words.dev-apis.com/word-of-the-day");

/* 
Variables:

wordOfTheDay (store retrieved word from API call to use later in functions)
boxes/ item (DOM selector for event listener)
currentAttempt
previousKey (needed for using backspace back to back on index > 3)

Functions:

- getWord(url) 
- keyDown(event)
  * isLetter(key)
    - handleLetter(letter)
  * handleBackspace()
  * handleEnter()
    - isWord(userGuess)
      * changeFontColor(currentAttempt)
      * compareArrays(usersGuessArray, retrievedWordArray)
        - changeBoxBackgroundColor(exactMatches, closeMatches)
        - isSolved(exactMatches)
  * youLose(currentAttempt)
  * youWin(isSolved)

 */
