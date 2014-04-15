'use strict';

// Articles routes use acmCemeterys controller
var acmCtrlOwner = require('../controllers/ownerCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.owner.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/owners', acmCtrlOwner.all);
    app.post('/owners', authorization.requiresLogin, acmCtrlOwner.create);
    app.get('/owners/:ownerId', acmCtrlOwner.show);
    app.put('/owners/:ownerId', authorization.requiresLogin, hasAuthorization, acmCtrlOwner.update);
    app.del('/owners/:ownerId', authorization.requiresLogin, hasAuthorization, acmCtrlOwner.destroy);

    // Finish with setting up the acmCemeteryId param
    app.param('ownerId', acmCtrlOwner.owner);

};