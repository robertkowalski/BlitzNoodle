var Config = {

};

Config.options = {
  logPath: "log/",
  tempPath: "tmp/",
  buildRoot: "build/",
  cdn: "http://mycdn.example.com/"
};


Config.fileList = {
  cms: [
    "./test/testfiles_static/groups/cms_1.js",
    "./test/testfiles_static/groups/cms_2.js"
  ],
  web: [
    "./test/testfiles_static/groups/web_1.js",
    "./test/testfiles_static/groups/web_2.js"
  ]
};


module.exports = Config;
