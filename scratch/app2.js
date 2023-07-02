//============= GLOBAL VARIABLES ==============
let response;
//============= LOGIC =========================

// retrieve word from API
async function getWord(url) {
  let response = await fetch(url);
  response = await response.json();
  return response;
}


getWord("https://words.dev-apis.com/word-of-the-day");
console.log("response", response);
