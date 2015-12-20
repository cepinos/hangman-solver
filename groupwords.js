/* Group words in different files by length */

var fs = require('fs');
fs.readFile('./words.txt', function (err, data) {
  if (err) {
    throw err;
  }
  var words = data.toString().split('\n');

  for( var i = 0; i < words.length; i++){
    console.log(words[i]);
    fs.appendFileSync('words/' + words[i].length + '.txt', words[i] + '\n');
  }

});