var fs = require('fs'),
    Files = require('./Files.js'),
    jsp = require("uglify-js").parser,
    pro = require("uglify-js").uglify; 

var Build = function(Config) {
  this.date = new Date();
  this.setTimeHashString();
  this.files = new Files();

  this.fileList = Config.fileList;
  this.option = Config.options;
};

Build.prototype = {

  date: null,  

  timeString: null,

  dateHelper: function(date) {
    var d = +date;

    if(d < 10) {
      d = '0' + d;
    }

    return d + ''
  },

  setTimeHashString: function() {
    var d = this.date;

    this.timeString = this.getTimeNum() + '_' + d.getTime() + '_';
  },

  getTimeNum: function() {
    var d = this.date;
    return d.getFullYear() + this.dateHelper(d.getDay()) + this.dateHelper(d.getMonth() + 1);
  },

  /*
   * Creates a unique hash for the build
   */
  makeHash: function(sub) {
    return this.timeString + sub;
  },

  /**
   * Logs when a build was done with its corresponding hash
   */
  logToFile: function(string, filePath) {
    var id;

    try {
      id = fs.openSync(filePath, 'a', 0666);
    } catch(e) {
      id = fs.openSync(filePath, 'w', 0666);
    }

    fs.writeSync(id, string, null, 'utf8');
    fs.closeSync(id);
  },

  createFolder: function(path) {
    try {
      fs.statSync(path);
    } catch(e) {
      fs.mkdirSync(path, 0777);
    }
  },

  writeResult: function(result, path) {
    this.files.writeStringToFile(result , path);
  },

  deleteTempFiles: function() {
    fs.readdir(this.option.tempPath, function(err, list) {
      if (err) {
        console.error('Error deleting files');
      }

      for(var index in list) {
        this.files.deleteFile(this.option.tempPath + list[index]);
      }

    }.bind(this));
  },

  uglify: function(file) {
    var code = this.files.readFromFile(file);

    return this.compress(code);
  },

  compress: function(code) {
    var ast = jsp.parse(code); // parse code and get the initial AST
    ast = pro.ast_mangle(ast); // get a new AST with mangled names
    ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
    var final_code = pro.gen_code(ast); // compressed code here
   
    return final_code;
  },

  /**
   * Creates a build for all given sub-builds
   */
  makeBuild: function(header) {
    var sub,
        hash,
        string,
        result,
        target,
        head;

    // read build json -> subs to subbuilds
    for (sub in this.fileList) {

      //create headerfiles part 1/2
      if (header) {
        head = '<?php\n';
      }

      result = '',
      hash = this.makeHash(sub),
      target = this.option.tempPath + hash + '.js';
      
      //merge files into it's asset packages
      console.log('Merging    : ' + hash + '.js');
      this.files.appendAllFilesFromArrayToFile(target, this.fileList[sub]);

      // generate log string
      string = '[' + this.date.getTime() + ']: ' + this.getTimeNum() + ' - ' + ' creation of build started - File: ' + hash + '\n';
      this.logToFile(string, this.option.logPath + this.getTimeNum() + '.log');

      // uglify the targets
      console.log('Compressing: ' + hash + '.js');
      result = this.uglify(target);
      
      //write results into unique folders
      this.createFolder(this.option.buildRoot + hash);
      jsFile = this.option.buildRoot + hash + '/' + hash + '.js';
      this.writeResult(result, jsFile);

      //create headerfiles part 2/2
      if (header) {
        head += '    echo \'<script src="' + this.option.cdn + hash + '/' + hash + '.js" </script> \'; \n';
        this.writeResult(head , this.option.buildRoot + hash + '/head.php');
        console.log('Created Header File.');
      }
    }

    this.deleteTempFiles();

    console.log('\nFinished.');
  }
};

module.exports = Build;
