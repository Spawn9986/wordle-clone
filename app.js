// select the DOM element for all the boxes and group into an array to iterate over later
const boxes = document.querySelectorAll(".itm");
let index = 0;

// add keydown event that renders the key pressed into the box and iterates over the boxes like an array progressively allowing each key to render in the next box.
document.addEventListener("keydown", function (event) {
  const key = event.key;
  //if key is not a letter ignore
  if (!isLetter(event.key)) {
    event.preventDefault();
  } else {
    boxes[index].innerText = key.toUpperCase();
  }
  index++;
});

//check if the key pressed by user is a single letter using a regular expression which defines a search pattern for parsing and finding matches in a given string with the test() method. The /[a-zA-Z]/ regex means "match all strings that start with a letter".
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}
