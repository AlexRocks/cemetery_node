'use strict';

var formidable = require('formidable');
var _ = require('lodash');

/**
 * Find section by id
 */

exports.create = function(req, res) {
//    console.log(req.files);

    var form = new formidable.IncomingForm(),
            files = [],
            fields = [],
            ufile = null;
    form.uploadDir = __dirname + '/../../public/puploads';

    form
            .on('field', function(field, value) {
//                console.log(field, value);
                fields.push([field, value]);
            })
            .on('file', function(field, file) {
//                console.log(field, file);
                files.push([field, file]);
                ufile = file;
            })
            .on('end', function() {
                res.writeHead(200, {'content-type': 'application/json; charset=utf-8'});
                res.write(JSON.stringify(ufile));
                res.end();
            });
    form.parse(req);
};

