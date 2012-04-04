/**
 * Files.js - At whole Synchronous
 *
 * Check for the existance of files, reading files, appending files
 * 
 * Synchronous with node, why?! 
 * We need to remain the given order for every file added to the build process. 
 * Especially for legacy builds that contain Prototype.js and jQuery at once additionally to libs and plugins written by us.
 */

var fs = require('fs');

var Files = function() {

};

Files.prototype = {

  /**
   * Returns true if file exists in a given array, else an array of errors
   */
  testForExistence: function(files) {
    var index,
        result,
        errors = [];

    for (index in files) {
      try {        
        fs.statSync(files[index]);
      } catch(e) {
        errors.push(files[index]);
      }
    } 

    if (errors.length >= 1) {
      console.error('Missing file or files:');
      console.error(errors);
      return errors;
    } else {
      return true;
    }
  },

  /**
   * Reads small files
   */
  readFromFile: function(file) {
    try {
      var data = fs.readFileSync(file, 'utf8');
      return data;
    } catch (e) {
      console.error("There was an error opening the file:");
      console.error(e);
    }
  },

  /**
   * Appends a String to a file
   */
  writeStringToFile: function(content, file) {
    var id = fs.openSync(file, 'w', 0666);

    fs.writeSync(id, content, null, 'utf8')
    fs.closeSync(id);
  },

  /**
   * Deletes a file
   */
  deleteFile: function(file) {
    fs.unlinkSync(file);
  },

  /**
   * Appends a File to Another
   */
  appendFileToFile: function(target, file) {
   var content = this.readFromFile(file),
        id = fs.openSync(target, 'a', 0666);

    fs.writeSync(id, content, null, 'utf8')
    fs.closeSync(id);
  },

  /**
   * Append a list of Files from an Array to a target
   */
  appendAllFilesFromArrayToFile: function(target, arr) {
    var index;

    for (index in arr) {
      this.appendFileToFile(target, arr[index]);
    }
  }
};

module.exports = Files;
