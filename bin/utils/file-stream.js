const Transform = require('stream').Transform;

const transform = (fn, contents, file, {encoding, thisArg}) => {
    let decoded = encoding ? contents.toString(encoding) : contents;
    let transformed = fn.call(thisArg, decoded, file);

    return Promise.resolve(transformed).then(toBuffer);
}

const  toBuffer = (contents) => {
    if (isBuffer(contents)) {
        return contents;
    } else if (contents != null) {
        return new Buffer(String(contents));
    } else {
        new Error('transformFn may not return or resolve to null or undefined');
    }
}

class FileStream extends Transform {

    constructor(transformFn, file, options) {
        super();

        this.fn = transformFn;
        this.file = file;
        this.opts = options;
        this.data = [];
    }

    _transform(chunk, encoding, next) {
        this.data.push(chunk);
        next();
    }

    _flush(done) {
        let contents = Buffer.concat(this.data);

        transform(this.fn, contents, this.file, this.opts).then((result) => {
            this.push(result);
            done();
        }).catch((err) => {
            done(err);
        });
    }

}
