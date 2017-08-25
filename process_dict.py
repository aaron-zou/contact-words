#!/usr/bin/env python3
import os
import sys
import re
import argparse
from string import (ascii_lowercase, punctuation)
from trie import Trie

PATH = os.path.dirname(os.path.realpath(__file__))
PUNCTATION_REGEX = re.compile('[{}]'.format(re.escape(punctuation)))


def write_output(char, sorted_words):
    os.makedirs(os.path.join(PATH, 'gen'), exist_ok=True)
    with open(os.path.join(PATH, 'gen', char + '.txt'), 'w') as f:
        f.writelines(sorted_words)


def make_parser():
    parser = argparse.ArgumentParser(
        description='Process a dictionary text file into 26 lists sorted by '
        ' difficulty as Contact words.')
    parser.add_argument('dict_path', metavar='FILE',
                        help="Path to dictionary text file.")
    return parser


def main():
    args = make_parser().parse_args(sys.argv[1:])
    with open(args.dict_path, 'r') as f:
        words = f.readlines()
    for char in ascii_lowercase:
        subset = [PUNCTATION_REGEX.sub('', word)
                  for word in words if word.startswith(char)]
        trie = Trie(subset)
        write_output(char, sorted(subset, key=lambda word: trie.score(word),
                                  reverse=True))


if __name__ == '__main__':
    main()
