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
 * Represents a book.
 * @param {string} author - The author of the book.
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

function sampleWordAndSet(lines, difficulty) {
  const min = Math.floor(difficulty * lines.length / 3.0);
  const range = Math.floor(lines.length / 3.0);
  const index = min + Math.floor(Math.random() * range);
  alert(`min=${min}, range=${range}, len=${lines.length}, index=${index}`);
  document.getElementById('generated-word').value = lines[index];
}

/**
 * Represents a book.
 */
function generateEasyWord() {
  generateWord(difficulties.EASY);
}

/**
 * Represents a book.
 */
function generateMediumWord() {
  generateWord(difficulties.MEDIUM);
}

/**
 * Represents a book.
 */
function generateHardWord() {
  generateWord(difficulties.HARD);
}

// Code to execute on load
window.onload = function() {
  randomLetter();
}
