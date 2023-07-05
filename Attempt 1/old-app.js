//============= GLOBAL VARIABLES ==============
const boxes = document.querySelectorAll(".itm");
//convert nodelist returned from querySelectAll to an array
let boxesArray = Array.from(boxes);
//take same array and get array of letters keyed by user
let innerTextArray = mapOverArray(boxesArray);

let index = 0;
let previousKey;
//**************** FIX LATER **************** NEED TO REPLACE tempWOTD WITH WORD RETRIVED FROM THE API FETCH REQUEST (GET). CURRENTLY NOT UNSURE HOW TO USE THE RETRIEVED WORD IN handleEnter() SCOPE, compareArrays, etc. FUNCTIONS WITH IT BEING ASYNCRONOUS. ************************/
let tempWOTD = "clean";

//============= OVERVIEW FLOW =========================

getWord("https://words.dev-apis.com/word-of-the-day");

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

//============== SUPPORTING ELEMENTS ===================

function mapOverArray(array) {
  return array.map(function (box) {
    return box.innerText.toUpperCase();
  });
}

// retrieve word from API
async function getWord(url) {
  let response = await fetch(url);
  response = await response.json();
  console.log("Word of the day:", response);
  return response;
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
  //****************** FIX LATER *************** WHEN INDEX === 4 (AFTER INDEX 3 FINISHED) & prevKey != BACKSPACE DOESN'T WORK: U HAVE TO PRESS IT 2X TO GET IT TO WORK *********/
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
  sliceUsersGuess(innerTextArray);

  //for users guess, convert array of letters into a string (i.e., a word)
  let usersGuessString = sliceUsersGuess(innerTextArray).join("");

  //create a POST request to check if users guess was a valid word
  isValid("https://words.dev-apis.com/validate-word", usersGuessString);
  //******************* FIX LATER ************** NEED TO MAKE isValid WAIT FOR TRUE BC RIGHT NOW IT IS ENTERING EVEN IF FALSE BC ITS NOT WAITING FOR POST REQUEST RESPONSE *****/
  if (isValid) {
    // Want to compare retrieved word from API with the users guess
    //convert API word from string to an array
    let WOTDArray = tempWOTD.toUpperCase().split("");

    // compare the two arrays
    for (let i = 0; i < sliceUsersGuess.length; i++) {
      if (sliceUsersGuess[i] === WOTDArray[i]) {
        //change background color to correspond to result of comparison
        boxesArray[i].style.backgroundColor = "green";
      } else if (WOTDArray.includes(sliceUsersGuess[i])) {
        boxesArray[i].style.backgroundColor = "yellow";
        //********************* FIX LATER ************ need to make it where it correlates to the number also (i.e., if users guess has 2 O's and API word only has 1 (vice versa)/
      } else boxesArray[i].style.backgroundColor = "grey";
    }
  }
}

function sliceUsersGuess(array) {
  //Only keep the first 5 indexes (the current 5 letter guess) of the array
  let usersGuessArray = array.slice(0, 5);
  return usersGuessArray;
}

async function isValid(postRequestURL, string) {
  try {
    const response = await fetch(postRequestURL, {
      method: "POST",
      body: JSON.stringify({
        //******* NEED TO CHANGE tempWOTD to usersGuess eventually ******
        word: string,
      }),
    });

    const json = await response.json();
  } catch (error) {
    console.error(error);
  }
}

/* 
Pre-planning Outline:

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

//FOR LATER IF NEEDED
/* function usersGuessArray(array) {
  // for usersGuess, convert querrySelectAll which outputs result in a nodelist to an array
  let boxesArrayOfLetters = [];
  //iterate over the sub-array pushing the inner text of each into a new array
  for (let i = 0; i < array.length; i++) {
    boxesArrayOfLetters.push(array[i].innerText);
  }
  //Only keep the first 5 indexes (the current 5 letter guess) of the array
  let usersGuessArray = boxesArrayOfLetters.slice(0, 5);
  return usersGuessArray;
} */