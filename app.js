// select the DOM element for all the boxes and group into an array to iterate over later
const boxes = document.querySelectorAll(".itm");
let index = 0;

getData();

// add keydown event that renders the key pressed into the box and iterates over the boxes like an array progressively allowing each key to render in the next box.
document.addEventListener("keydown", function (event) {
  const key = event.key;
  console.log(event.key);
  if (event.key === "Backspace") {
    boxes[index - 1].innerText = "";
    index -= 1;
  }
  /* if (event.key === "Enter") {
    skip for now..for later:
    add validate word function
    change background color to none || close (up to # of letters (if only 1 letter --> only 1)) || correct
  } */
  //if key is not a letter ignore
  if (!isLetter(event.key)) {
    event.preventDefault();
  } else {
    boxes[index].innerText = key.toUpperCase();
    //only increase index and move to the next box if user keys a valid letter
    index++;
  }
});

//check if the key pressed by user is a single letter using a regular expression which defines a search pattern for parsing and finding matches in a given string with the test() method. The /[a-zA-Z]/ regex means "match all strings that start with a letter".
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function getData() {
  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  const data = await response.json();
  console.log(data);
  return data;
}

/* for API calls

GET https://words.dev-apis.com/word-of-the-day

POST https://words.dev-apis.com/validate-word */
