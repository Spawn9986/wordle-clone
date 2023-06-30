const boxes = document.querySelectorAll(".itm");

let index = 0;

document.addEventListener("keydown", function (event) {
  const key = event.key;
  boxes[index].innerText = key;
  index++;
});
