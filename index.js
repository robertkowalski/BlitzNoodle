var Config = require('./Config.js'),
    Build = require('./lib/Build.js'),
    header;

var b = new Build(Config);
var arguments = process.argv.splice(2);


var logo = '                ____  _ _ _       _   _                 _ _      \n';
    logo +='               | __ )| (_) |_ ___| \\ | | ___   ___   __| | | ___ \n';
    logo +='               |  _ \\| | | __|_  /  \\| |/ _ \\ / _ \\ / _` | |/ _ \\\n';
    logo +='               | |_) | | | |_ / /| |\\  | (_) | (_) | (_| | |  __/\n';
    logo +='               |____/|_|_|\\__/___|_| \\_|\\___/ \\___/ \\__,_|_|\\___|\n';
    logo +='                                                                 \n';

console.log(logo);

switch (arguments[0]) {
  case '--php':
  case '-p':
    b.makeBuild(true);
  break;

  case '--help':
  case '-h':
    console.log('\n  Help\n');
    console.log('  -h, --help       Show Help');
    console.log('  -p, --php        Make build and create PHP files for Header');
  break;

  default:
    b.makeBuild(false);
  break; 
}
 








