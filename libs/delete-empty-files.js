var fs = require('fs')
  , path = require('path')


var arg = process.argv[2];
if(!arg.endsWith("/")) {
  arg = arg + "/";
}
console.log(arg);
removeDirForce(arg);



// var rootPath = "/path/to/remove";
// removeDirForce(rootPath);

// path should have trailing slash
function removeDirForce(dirPath) {
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log(JSON.stringify(err));
    } else {
      if (files.length === 0) {
        fs.rmdir(dirPath, function (err) {
          if (err) {
            console.log(JSON.stringify(err));
          } else {
            var parentPath = path.normalize(dirPath + '/..') + '/';
            if (parentPath != path.normalize(rootPath)) {
              removeDirForce(parentPath);
            }
          }
        });
      } else {
        files.map(function (file) {
          var filePath = dirPath + file;
          fs.stat(filePath, function (err, stats) {
            if (err) {
              console.log(JSON.stringify(err));
            } else {
              if (stats.isFile() && stats.size === 0) {
                fs.unlink(filePath, function (err) {
                  if (err) {
                    console.log(JSON.stringify(err));
                  }
                });
              }

              if (stats.isDirectory()) {
                removeDirForce(filePath + '/');
              }
            }
          });
        });
      }
    }
  });
}

