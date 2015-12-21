# hangman solver

A hangman game script solver.

## Technologies and Methodologies used

This script was developed using:
- TDD (jasmine + karma)
- Promises (used to execute the script when everything is ready)
- gulp
- BrowserSync
- Node
- Bower
- jQuery

## Approach used

The game gives a few parameters to consider, one of them is the length. Since the length is a fix variable, the script looks for the word in a reduced dictionary of words grouped by length.

The script count the words per letter, and the letters are sort in a descendant order, the most common letter is the one used to guess, followed by the next one.

```
node groupwords.js
```

The script is execute when the file index.html is open.

## Folders structure

The solver files are inside the folder 'hangmansolver', script file is inside hangmansolver.js, the test file is hangmansolver.spec.js. To run the tests execute this commands:

```
npm install -g bower gulp jasmine
npm install
bower install
gulp serve:test
```
## Algorithm used

This image shows the algorithm and classes-like objects used:

![alt tag](hangmansolver/assets/SolverClass-likeObject.png)
![alt tag](hangmansolver/assets/hamgmansolverdiagram.png)

Copyright: Cesar Pino @ 2015