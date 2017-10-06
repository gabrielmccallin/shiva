var Transform = require('stream').Transform;
var util = require('util');


// Transform sctreamer to remove first line
function RemoveFirstLine(args) {
    if (! (this instanceof RemoveFirstLine)) {
        return new RemoveFirstLine(args);
    }
    Transform.call(this, args);
    this._buff = '';
    this._removed = false;
}
util.inherits(RemoveFirstLine, Transform);

RemoveFirstLine.prototype._transform = function(chunk, encoding, done) {
    if (this._removed) { // if already removed
        this.push(chunk); // just push through buffer
    } else {
        // collect string into buffer
        this._buff += chunk.toString();

        // check if string has newline symbol
        if (this._buff.indexOf('\n') !== -1) {
            // push to stream skipping first line
            // this.push(this._buff.slice(this._buff.indexOf('\n') + 6));
            this.push(this._buff.replace("import Promise from 'promise-polyfill';", ""));
            // clear string buffer
            this._buff = null;
            // mark as removed
            this._removed = true;
        }
    }
    done();
};

var fs = require('fs');

var input = fs.createReadStream('dist/shiva.d.ts'); // read file
var output = fs.createWriteStream('dist/shiva-global.d.ts'); // write file

input // take input
.pipe(RemoveFirstLine()) // pipe through line remover
.pipe(output); // save to file