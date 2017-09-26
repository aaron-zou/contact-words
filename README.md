# contact-words
Word generator for the word guessing game Contact. Includes script to run offline and simple web interface.

## Web application
https://aaron-zou.github.io/contact-words/

## Generating Sorted Word Lists
This application pre-sorts a list of dictionary words, which is then stored "server-side" and sampled by the web application when a user makes a request for a word.

Intuitively, a word is more difficult if, for any known prefix, there are still many possible words that have that prefix. This translates nicely to operating on a trie representation of a dictionary. Calculating a "difficulty score" then reduces to summing the branching factor for each letter in the word (minus one, since having only one child means there's only one possibility).
