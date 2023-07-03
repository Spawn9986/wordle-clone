//============= GLOBAL VARIABLES ==============
let WOTD = "clean";
//============= LOGIC =========================

/*  fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({
        "word": WOTD
      })
    })
      .then((response) => response.json())
      .then((json) => console.log(json)); */

fetch("https://words.dev-apis.com/validate-word", {
  method: "POST",
  body: JSON.stringify({
    word: WOTD,
  }),
})
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  });
