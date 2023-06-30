// select the DOM element for all the boxes and group into an array to iterate over later
const boxes = document.querySelectorAll(".itm");
let index = 0;

// add keydown event that renders the key pressed into the box and iterates over the boxes like an array progressively allowing each key to render in the next box.
function init() {
  document.addEventListener("keydown", keyDown);
}

function keyDown(event) {
  const key = event.key;
  if (key === "Backspace") {
    console.log("index before BS:", index);
    if (index > 3) {
      boxes[index].innerText = "";
      console.log("index after BS:", index);
    } else {
      boxes[index - 1].innerText = "";
      index -= 1;
      console.log("index after BS:", index);
    }
  }
  /* if (event.key === "Enter") {
      skip for now..for later:
      add validate word function
      change background color to none || close (up to # of letters (if only 1 letter --> only 1)) || correct
    } */
  //if key is not a letter ignore
  if (!isLetter(key)) {
    event.preventDefault();
  } else {
    boxes[index].innerText = key.toUpperCase();
    //only allow 5 letters at a time.
    if (index > 3) {
      return;
    } else {
      //only increase index and move to the next box if user keys a valid letter and not beyond 5 letters
      index++;
      console.log("index:", index);
    }
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

/* for API call

POST https://words.dev-apis.com/validate-word */
