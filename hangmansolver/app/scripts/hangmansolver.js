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
    $.get('/words.txt').done(function(data){

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
    var regex = new RegExp('^.{' + length + '}$', 'gm');
    this.words = this.dictionary.match(regex);
    return this.words;
  }
  /**
   * Filter words that follow the pattern given by the Game
   * @param  {string} exp [the word given by the game (i.e, '*a*k')]
   * @return {array} [filtered list]
   */
  Solver.prototype.filterWords = function(exp){
    var regex = parseGuessingWordtoRegExp(exp);

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

  return Solver;
})(jQuery);


var HangmanSolver = (function(G, S){
  // private attributes
  var solver,
  // private methods
  initialize = function(){

  }
})(Game, Solver);