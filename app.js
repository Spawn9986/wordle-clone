//============= GLOBAL VARIABLES ==============
// select the DOM element for all the boxes and group into an array to iterate over later
const boxes = document.querySelectorAll(".itm");
let index = 0;
let previousKey;

//============= LOGIC =========================

// add keydown event that renders the key pressed into the box and iterates over the boxes like an array progressively allowing each key to render in the next box.
function init() {
  document.addEventListener("keydown", keyDown);
}

function keyDown(event) {
  const key = event.key;
  if (key === "Backspace") {
    handleBackspace();
  }
  if (event.key === "Enter") {
    let arr = Array.from(boxes);
    arr = arr.slice(0, 5);
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push(arr[i].innerText);
    }
    let string = newArr.join("");
    handleEnter(string);
  }
  //if key is not a letter ignore
  if (!isLetter(key)) {
    event.preventDefault();
  }
  if (isLetter(key)) {
    handleLetter(key);
  }
  previousKey = key;
}

function handleBackspace() {
  //current issue: when index === 4 (after index 3 finishes) & prevKey != backspace doesnt work right
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

function handleEnter(word) {
  async function validateWord(word) {
    const response = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: {
        "word": "`${word}`",
      },
    });
    const data = await response.json();
    return data.isValid;
    console.log(data.isValid);
  }
  //change background color to none || close (up to # of letters (if only 1 letter --> only 1)) || correct
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

// retrieve word of the day from API
async function getWord() {
  let response = await fetch("https://words.dev-apis.com/word-of-the-day");
  response = await response.json();
  console.log(response);
  return response;
}

//check if the key pressed by user is a single letter using a regular expression which defines a search pattern for parsing and finding matches in a given string with the test() method. The /[a-zA-Z]/ regex means "match all strings that start with a letter".
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

getWord();
init();
