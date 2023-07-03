//============= GLOBAL VARIABLES ==============
const boxes = document.querySelectorAll(".itm");
//convert nodelist returned from querySelectAll to an array
let boxesArray = Array.from(boxes);

let index = 0;
let previousKey;
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
  //create a POST request to check if users guess was a valid word
  let isValid = fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      word: tempWOTD,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json.validWord);
    });
  /* if (isValid) {

  } */

  let boxesArrayOfLetters = [];
  //iterate over the sub-array pushing the inner text of each into a new array
  for (let i = 0; i < boxesArray.length; i++) {
    boxesArrayOfLetters.push(boxesArray[i].innerText);
    console.log(boxesArrayOfLetters);
  }
  //convert array of letters into a string (i.e., a word)
  let string = boxesArrayOfLetters.join("");
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

//================= KNOWN ISSUES TO FIX LATER =========
/* 

1 - in the handleBackspace(): when index === 4 (after index 3 finishes) & prevKey != backspace doesnt work right; it requires 2x backspace presses to get to work instead of 1 as expected

2 - Need to replace tempWOTD with word retirved from the Get request from the API fetch. Currently not sure how to use the retrieved word in handleEnter() scope, compareArrays, etc. functions with it being it is asyncronous.

3 - trying to refactor the code so that it is flows smoothly (makes sense and is clear and easily understood)

*/

//===================== USE LATER ====================

/* function changeBackground(guess, word) {
  //get the two arrays of current guess and the target word (of the day or random)
  //current guess
  let arr = Array.from(boxes);
  // create sub-array of only index 0 through 5.
  arr = arr.slice(0, 5);
  let newArr = [];
  //iterate over the sub-array pushing the inner text of each into a new array
  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i].innerText);
  }
  console.log(newArr);
  //get the word of the day
  let getWord = async function () {
    let response = await fetch("https://words.dev-apis.com/word-of-the-day");
    response = await response.json();
    console.log(response);
    return response;
  };
  //convert word of the day to an array
  //let arrTargetWord = getWord.split("");
  //console.log(newArr, arrTargetWord);
  //target word

  //iterate over them and compare values
  //change background color based on results of comparison
} */
