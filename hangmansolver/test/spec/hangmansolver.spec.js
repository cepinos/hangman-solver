/* global Solver */
(function () {
  'use strict';

  describe('Solver', function () {
    describe('Should have next methods and attributes', function () {
      var solver = {};
      // Initialize object
      beforeEach(function(){
        solver = new Solver();
      });

      // get dictionary from server
      beforeEach(function(done){
        solver.setDictionary(done);
      });

      it('Should get words.txt from server and save it in the object solver', function () {
        expect(solver.dictionary.constructor === String).toBe(true);
      });
      it('Should get words given a length from dictionary and return an array with all words with the same length', function () {
        var words = solver.getWordsOfLength(3);
        expect(words.constructor === Array).toBe(true);
        for( var i = 0; i < words.length; i++){
          expect(words[i].length === 3).toBe(true);
        }
      });
      it('Should filter words given a pattern like "*a*k" and it may return words like "park" or "mark"', function () {
        var words, match;
        // initialize words of length 4
        solver.getWordsOfLength(4);
        words = solver.filterWords('*a*k');
        expect(words.constructor === Array).toBe(true);

        for (var i = 0; i < words.length; i++) {
          match = words[i].match(/.a.k/g);
          expect(match.constructor === Array).toBe(true);
        }
      });
      it('Should count the words including a letter, and save it in an array', function () {
        var letters;

        solver.words = [
          'asy',
          'cat',
          'dog',
          'fet',
          'fda',
          'get',
          'hat',
          'jet'
        ];
        letters = solver.countLetters();

        expect(letters.a).toBe(4);
        expect(letters.b).toBe(0);
        expect(letters.c).toBe(1);
        expect(letters.d).toBe(2);
        expect(letters.e).toBe(3);
        expect(letters.f).toBe(2);
        expect(letters.g).toBe(2);
        expect(letters.h).toBe(1);
        expect(letters.i).toBe(0);
        expect(letters.j).toBe(1);
        expect(letters.k).toBe(0);
        expect(letters.l).toBe(0);
        expect(letters.m).toBe(0);
        expect(letters.n).toBe(0);
        expect(letters.o).toBe(1);
        expect(letters.p).toBe(0);
        expect(letters.q).toBe(0);
        expect(letters.r).toBe(0);
        expect(letters.s).toBe(1);
        expect(letters.t).toBe(5);
        expect(letters.u).toBe(0);
        expect(letters.v).toBe(0);
        expect(letters.w).toBe(0);
        expect(letters.x).toBe(0);
        expect(letters.y).toBe(1);
        expect(letters.z).toBe(0);

      });
      it('Should sort letters', function () {
        var lettersSorted = [];
        solver.letters = {
          'a': 4,
          'b': 0,
          'c': 1,
          'd': 2,
          'e': 3,
          'f': 2,
          'g': 2,
          'h': 1,
          'i': 0,
          'j': 1,
          'k': 0,
          'l': 0,
          'm': 0,
          'n': 0,
          'o': 1,
          'p': 0,
          'q': 0,
          'r': 0,
          's': 1,
          't': 5,
          'u': 0,
          'v': 0,
          'w': 0,
          'x': 0,
          'y': 1,
          'z': 0
        };

        lettersSorted = solver.sort();

        expect(lettersSorted.pop()).toBe('t');
        expect(lettersSorted.pop()).toBe('a');
        expect(lettersSorted.pop()).toBe('e');

      });
    });
  });
})();


