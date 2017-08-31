var difficulties = {
  EASY: 0,
  MEDIUM: 1,
  HARD: 2,
}

/**
 * Choose and set a random starting letter for the generated word.
 */
function randomLetter() {
  const min = 'a'.charCodeAt(0);
  const letter = String.fromCharCode(min + Math.floor(Math.random() * 26))
  document.getElementById('starting-letter').value = letter;
}

/**
 * Sample a word of a given difficulty from a pre-generated sorted list.
 * @param {int} difficulty - value in {0, 1, 2} indicating which third to search
 */
function generateWord(difficulty) {
  const letter = document.getElementById('starting-letter').value;
  const path = `gen/${letter}.txt`;
  const req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == XMLHttpRequest.DONE) {
      if (req.status == 200) {
        sampleWordAndSet(req.responseText.split('\n'), difficulty);
      } else {
        alert('GET request failed.');
      }
    }
  };

  req.open('GET', path);
  req.send();
}

/**
 * Helper function to perform the sampling and modify the output HTML element.
 * @param {string[]} lines - retrieved list of words
 * @param {int} difficulty - value in {0, 1, 2} indicating which third to search
 */
function sampleWordAndSet(lines, difficulty) {
  const min = Math.floor(difficulty * lines.length / 3.0);
  const range = Math.floor(lines.length / 3.0);
  const index = min + Math.floor(Math.random() * range);
  document.getElementById('generated-word').value = lines[index];
}

/**
 * Delegate to generateWord(), choosing from the third easiest words for Contact.
 */
function generateEasyWord() {
  generateWord(difficulties.EASY);
}

/**
 * Delegate to generateWord(), choosing from the middle third of words for Contact.
 */
function generateMediumWord() {
  generateWord(difficulties.MEDIUM);
}

/**
 * Delegate to generateWord(), choosing from the last third of words for Contact.
 */
function generateHardWord() {
  generateWord(difficulties.HARD);
}

// Code to execute on load
window.onload = function() {
  randomLetter();
}
