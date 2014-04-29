'use strict';

var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.acmCemetery.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    // Home route
    var fileuploadCtrl = require('../controllers/fileuploadCtrl');
    app.post('/fileupload', authorization.requiresLogin, fileuploadCtrl.create);

};
