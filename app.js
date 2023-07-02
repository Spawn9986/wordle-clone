//============= GLOBAL VARIABLES ==============
const boxes = document.querySelectorAll(".itm");
let index = 0;
let previousKey;

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
  console.log("entered handleEnter");
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

2 - not sure how to use the word retrieved from the API in the handleEnter, compareArrays, etc. functions as it is asyncronous. I will use a temp word as filler for now just to get a working product

3 - trying to refactor the code so that it is flows smoothly (makes sense and is clear and easily understood)

*/

//===================== USE LATER ====================

/* From handleEnter()
 //convert nodelist returned from querySelectAll to an array
 let arr = Array.from(boxes);
 // create sub-array of only index 0 through 5.
 arr = arr.slice(0, 5);
 let newArr = [];
 //iterate over the sub-array pushing the inner text of each into a new array
 for (let i = 0; i < arr.length; i++) {
   newArr.push(arr[i].innerText);
 }
 //convert array of letters into a joined 5 letter string (i.e., a word)
 let string = newArr.join("");
 console.log(string);
 handleEnter(string); */

/* function handleEnter(currentGuess) {
  console.log("entered handleEnter");
  //isWord(_?_);
  changeBackground(currentGuess, getWord);
  /* async function validateWord(currentGuess) {
    //================== CURRENTLY LEFT OFF HERE =====================
    console.log("entered validateWord");
    const response = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });
    console.log("response:", response);
    const data = await response.json();
    console.log("data", data);
    console.log(data.isValid);
    return data.isValid;
  } */
//change background color to none || close (up to # of letters (if only 1 letter --> only 1)) || correct

//function isWord() {};
//}
//*/

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
