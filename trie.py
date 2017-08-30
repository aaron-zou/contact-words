class Trie(object):
    """Trie implementation that also records the number of children in
    any subtree."""

    def __init__(self, words):
        """Initialize Trie with a set of string words, calculate number of
        children."""
        # Insert all words into trie
        self.root = TrieNode()
        for word in words:
            self.insert(word)

    @staticmethod
    def _index(char):
        return ord(char.lower()) - ord('a')

    def insert(self, word):
        """Insert word into trie if not present, otherwise mark leaf node if
        word is a prefix."""
        current = self.root
        for level in range(len(word.rstrip())):
            index = self._index(word[level])
            if not current.children[index]:
                current.children[index] = TrieNode()
            current.num_descendants += 1
            current = current.children[index]
        current.is_leaf = True

    def is_present(self, word):
        """Return whether the word is currently in the trie."""
        current = self.root
        for level in range(len(word.rstrip())):
            index = self._index(word[level])
            if not current.children[index]:
                return False
            current = current.children[index]
        return current is not None and current.is_leaf

    def score(self, word):
        """For a given word (if present), calculate how difficult of a Contact
        word it will be. Lower value means easier.

        """
        if not self.is_present(word):
            raise ValueError("Internal error: {} not found".format(word))

        # Intuitively, difficulty could be thought of as the number of wrong
        # possible guesses given a known prefix, or num_descendants - 1
        score = 0
        current = self.root
        for level in range(len(word.rstrip()) - 1):
            score += current.num_descendants - 1
            index = self._index(word[level])
            current = current.children[index]

        return score


class TrieNode(object):
    """Defines a single node in the Trie."""

    def __init__(self):
        self.children = [None] * 26
        self.num_descendants = 0
        self.is_leaf = False
