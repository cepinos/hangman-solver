'use strict';

/**
 * Object-like class Solver
 */
var Solver = (function($){
  // Initialize object-like class
  var Solver = function(){},

  // private functions
  /**
   * Create regexp from game input
   */
  parseGuessingWordtoRegExp = function(exp){
    exp = exp.replace(/\*/g,'.');
    return new RegExp('^' + exp + '$','g');
  };


  // Attributes
  Solver.prototype.dictionary = null;
  Solver.prototype.letters = {
    'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0,
    'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0,
    's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0
  };
  Solver.prototype.lettersSorted = [];
  Solver.prototype.word = '';
  Solver.prototype.words = [];

  // Methods
  /**
   * get words.txt from server and save it in dictironary attributte
   * @param {Function} done callback called when the dictionary have the data from words.txt
   */
  Solver.prototype.setDictionary = function(done){
    var _this = this;
    return $.get('/words.txt').done(function(data){

      _this.dictionary = data;

      if(done instanceof Function){
        done();
      }

    });
  }
  /**
   * Filter words of a given length
   * @param  {number} length [length of the words to be filter]
   * @return {array} [words filtered]
   */
  Solver.prototype.getWordsOfLength = function(length){
    var len = length || this.word.length,
    regex = new RegExp('^.{' + len + '}$', 'gm');
    this.words = this.dictionary.match(regex);
    return this.words;
  }
  /**
   * Filter words that follow the pattern given by the Game
   * @param  {string} exp [the word given by the game (i.e, '*a*k')]
   * @return {array} [filtered list]
   */
  Solver.prototype.filterWords = function(expWord){
    var exp = expWord || this.word,
    regex = parseGuessingWordtoRegExp(exp);

    this.words = this.words.filter(function(word){
      var match = word.match(regex);
      return !!match && match.constructor === Array;
    });

    return this.words;
  }
  /**
   * count words including a given letter
   * @return {array} array with the amount of words containing a letter
   */
  Solver.prototype.countLetters = function(){
    var letter, keys, _this = this;
    for(letter in this.letters){
      if (this.letters.hasOwnProperty(letter)) {
        this.letters[letter] = this.words.reduce(function(previousValue, word){
          if (word.indexOf(letter) !== -1){
            return previousValue + 1;
          }
          return previousValue;
        }, 0);
      }
    }
    return this.letters;
  }
  /**
   * sort list of letters by value
   * @return {array} keys sorted
   */
  Solver.prototype.sort = function(){
    var list = this.letters,
    keys = Object.keys(list);
    this.lettersSorted = keys.sort(function(a,b){return list[a]-list[b]})
    return this.lettersSorted;
  }
  /**
   * initialize attributes
   */
  Solver.prototype.initialize = function(){
    this.letters = {
      'a': 0, 'b': 0, 'c': 0, 'd': 0, 'e': 0, 'f': 0, 'g': 0, 'h': 0, 'i': 0,
      'j': 0, 'k': 0, 'l': 0, 'm': 0, 'n': 0, 'o': 0, 'p': 0, 'q': 0, 'r': 0,
      's': 0, 't': 0, 'u': 0, 'v': 0, 'w': 0, 'x': 0, 'y': 0, 'z': 0
    };
  }

  return Solver;
})(jQuery);


var HangmanSolver = (function(G, S){
  // private attributes
  var solver,
  game,
  wordsPlayed = 0,
  // private methods
  /**
   * initialize solver and game objects
   */
  initialize = function(){
    // initialize Game
    game = G;
    var a = game.start();


    // initialize solver
    solver = new S;
    return solver.setDictionary();
  },
  /**
   * Start game, ask for a new word
   */
  start = function(next){
    solver.initialize();
    solver.word = !!next ? game.next() : game.start();
    solver.getWordsOfLength();
    countAndSort();
  },
  /**
   * count letters and sort
   */
  countAndSort = function(){
    solver.countLetters();
    solver.sort();
  },
  /**
   * Guess giving a letter, the most common one
   * return {Number|String|Boolean} the anser from the game
   */
  guess = function(){
    var letter = solver.lettersSorted.pop();
    delete solver.letters[letter];
    return game.guess(letter);
  },
  /**
   * executes the algorithm to guess the words
   */
  play = function(){
    var next = false;
    initialize().then(function(){
      while(wordsPlayed < 1){
        start(next);

        recursiveGuess();

        next = true;
      }
      game.result();
    });

  },
  recursiveGuess = function(){
      var answer = guess();

      if ( answer === -2 || answer === true  ){
        // look for next word, current word finished
        wordsPlayed++;
      }else if( answer === false || answer === -1 || answer === -3 ){
        recursiveGuess();
      }else if( answer.constructor === String ){
        solver.word = answer;
        solver.filterWords();
        countAndSort();
        recursiveGuess();
      }
  };

  return {
    play: play
  }

})(Game, Solver);

jQuery(document).on('ready',function(){
  HangmanSolver.play();
});