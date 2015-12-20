# hangman solver

A hangman game script solver.

## Approach used

The game gives a few parameters to consider, one of them is the length. Since the length is a fix variable, in order to maximize the performance of the algorithm, the script should look for the word in a reduced dictionary of words grouped by length, the length of the word the script is guessing. The dictionary words.txt was splitted in multiple files inside the folder words, every file contains words with the same length, the name of the file is the length of the words. The script used to split the dictionary is groupwords.js.

```
node groupwords.js
```

Copyright: Cesar Pino @ 2015