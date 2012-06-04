[![Build Status](https://secure.travis-ci.org/robertkowalski/BlitzNoodle.png?branch=master)](http://travis-ci.org/robertkowalski/BlitzNoodle)

BlitzNoodle
===========

BlitzNoodle was just a proof of concept for an internal Jimdo presentation.

For production use I would suggest using [grunt](https://github.com/cowboy/grunt) or the [html5 boilerplate build script](https://github.com/h5bp/node-build-script)

---------------------------------------

BlitzNoodle is a command line tool for packing and minifying JavaScript assets for use with a CDN using UglifyJS.

It supports multiple files as input for merging the minified target files and also supports multiple files as final targets.

BlitzNoodle creates unique folders and filenames for the targets, based on the current date.

If you push the targets to a CDN, you can rollback them with ease in case of a failure - in opposite to the widely used GET-Parameter with timestamp at end of the filename.

If needed, BlitzNoodle also creates PHP partials that reference the builded files in script-tags, but feel free to modify it to create your own partials in other languages.

The current implemenation of BlitzNoodle logs every build that is created.

Usage
-----

Specify the targets and files that are merged into it in ```Config.js```. You can also change the predefined folders for tempfiles and the finished buildfiles.

### Standart build without header files

```
 $ node index.js
```

### Arguments

```
 $ node index.js -h
```

```
  Help

  -h, --help       Show Help
  -p, --php        Create PHP files for Header

```

### Makefile

You can change the Makefile to your needs (currently just running tests)

Thoughts
--------

Interesting maybe: 

 - JS Lint or JS Hint pre build hooks?
 - running as git hook? 
 - does it commit itself after building for easy rollbacks per switch? 
 - integrating git hooks in general. 
 - Templates for Headerfiles

License 
-------

Copyright (c) 2012, Robert Kowalski
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.


THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
