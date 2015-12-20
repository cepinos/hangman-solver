/* Group words in different files by length */

var fs = require('fs');
fs.readFile('./words.txt', function (err, data) {
  if (err) {
    throw err;
  }
  // Initialize vars
  var i,
  words;

  // Delete previous files
  deleteWordsFiles();

  // parse words dictionary to array
  words = data.toString().split('\n');

  for(i = 0; i < words.length; i++){
    fs.appendFileSync('words/' + words[i].length + '.txt', words[i] + '\n');
  }

});

function deleteWordsFiles(){
  var i,
  path = '';
  // Delete files to avoid duplicated words
  for(i = 0; i < 50; i++){
    path = 'words/' + i + '.txt';
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }

  }
}