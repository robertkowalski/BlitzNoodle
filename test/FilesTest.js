var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

    chai.use(sinonChai);

var fs = require('fs');

var Files = require('../lib/Files.js');   

var testfileListValid = [
      "./test/testfiles_static/1.js",
      "./test/testfiles_static/2.js"
    ];

var testfileListIncomplete = [
      "./test/testfiles_static/1.js",
      "./test/testfiles_static/missing.js"
    ];

var target = "./test/test.js";

var resetTestSpace = function() {
  // delete previous testfile
  try{
    fs.unlinkSync(target);
  } catch (e) {

  }
};

describe('Files', function(done) {

  beforeEach(function() {
    resetTestSpace();
  });

  after(function() {
    resetTestSpace();
  });

  it('should return an array with errors if files are missing', function() {
    var files = new Files(),
        expectedResult = ['./test/testfiles_static/missing.js'], 
        result;

    result = files.testForExistence(testfileListIncomplete);
    expect(result).to.eql(expectedResult);
  });

  it('should return true if all files are present', function() {
    var files = new Files(),
        result;

    result = files.testForExistence(testfileListValid);
    expect(result).to.equal(true);
  });

  it('should read files and spit out it\'s contents', function() {
    var files = new Files(),
        content;
    
    content = files.readFromFile('./test/testfiles_static/1.js');
    expect(content).to.equal('var foo = "Hallo Welt";\n');
  });

  it('should write to files and overwrite their contents', function() {
    var files = new Files(),
        content = 'Test',
        content2 = 'Expected result';
 
    files.writeStringToFile(content, target);
    expect(files.readFromFile(target)).to.equal('Test');

    files.writeStringToFile(content2, target);
    expect(files.readFromFile(target)).to.equal('Expected result');
  });

  it('should append files in the right order to a new file', function() {
    var files = new Files();
         
    files.appendFileToFile(target, testfileListValid[0]);
    files.appendFileToFile(target, testfileListValid[1]);
    
    var expectedResult = 
      'var foo = "Hallo Welt";\n'+
      'function foo() {\n'+
      '\n'+
      '  return "foo";\n'+
      '};\n';

    expect(files.readFromFile(target)).to.equal(expectedResult);
  });
});
