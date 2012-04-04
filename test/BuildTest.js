var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

    chai.use(sinonChai);

var Config = require('../Config.js'),  
    fs = require('fs'),
    Build = require('../lib/Build.js');   

var json = {
  cms: [
    "./test/testfiles_static/groups/cms_1.js",
    "./test/testfiles_static/groups/cms_2.js"
  ],
  web: [
    "./test/testfiles_static/groups/web_1.js",
    "./test/testfiles_static/groups/web_2.js"
  ]
};

var fileName = '2011_test.log',
    logFile = Config.options.logPath + fileName;

var resetTestSpace = function() {
  // delete previous testfile
  try{
    fs.unlinkSync(logFile);
  } catch (e) {

  }
  var b = new Build(Config);
  b.deleteTempFiles();
};

describe('Build', function(done) {

  before(function(){
    resetTestSpace();
  });

  after(function(){
    resetTestSpace();
  });

  it('should add a leading 0 to numbers under 10', function() {
    var b = new Build(Config);

    expect(b.dateHelper(1)).to.equal('01');
    expect(b.dateHelper(10)).to.equal('10');
  });

  it('should open logfiles and append text', function() {
    var b = new Build(Config);

    b.logToFile('string', logFile);
    var data = fs.readFileSync(logFile, 'utf8');
    expect(data).to.equal('string');
  });
});
