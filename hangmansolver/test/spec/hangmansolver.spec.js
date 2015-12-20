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
      xit('Should get words from dictionary should return an array', function () {
        var words = solver.getWords();
        expect(words.constructor === Array).toBe(true);
      });
    });
  });
})();
