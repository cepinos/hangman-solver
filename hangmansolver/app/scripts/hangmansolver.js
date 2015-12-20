'use strict';

/**
 * Object-like class Solver
 */
var Solver = (function($){
  // Initialize object-like class
  var Solver = function(){};

  // Attributes
  Solver.prototype.letters = {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
    'h': 0,
    'i': 0,
    'j': 0,
    'k': 0,
    'l': 0,
    'm': 0,
    'n': 0,
    'o': 0,
    'p': 0,
    'q': 0,
    'r': 0,
    's': 0,
    't': 0,
    'u': 0,
    'v': 0,
    'w': 0,
    'x': 0,
    'y': 0,
    'z': 0,
  };
  Solver.prototype.word = '';
  Solver.prototype.words = [];
  Solver.prototype.dictionary = null;

  // Methods
  Solver.prototype.setDictionary = function(done){
    var _this = this;
    $.get('/words.txt').done(function(data){

      _this.dictionary = data;

      if(done instanceof Function){
        done();
      }

    });
  }
  Solver.prototype.getWords = function(regex){
  }
  Solver.prototype.countLetters = function(){
  }
  Solver.prototype.sort = function(){
  }

  return Solver;
})(jQuery);


var HangmanSolver = (function(G, S){

})(Game, Solver);