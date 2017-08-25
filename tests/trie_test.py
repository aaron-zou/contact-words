#!/usr/bin/env python3
import unittest
from trie import Trie

WORDS = ['a', 'an', 'apple', 'bob']


class TrieTest(unittest.TestCase):
    def setUp(self):
        self.trie = Trie(WORDS)

    def test_search(self):
        for word in WORDS:
            self.assertTrue(self.trie.is_present(word))
        self.assertFalse(self.trie.is_present('blahblahblah'))

    def test_subtree_count(self):
        self.assertEqual(self.trie.root.num_descendants, 4)
        a_node = self.trie.root.children[Trie._index('a')]
        self.assertEqual(a_node.num_descendants, 2)
        b_node = self.trie.root.children[Trie._index('b')]
        self.assertEqual(b_node.num_descendants, 1)


if __name__ == '__main__':
    unittest.main()
