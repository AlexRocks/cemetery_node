'use strict';

// Articles routes use acmCemeterys controller
var acmCtrlmarker = require('../controllers/markerCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.marker.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/markers', acmCtrlmarker.all);
    app.post('/markers', authorization.requiresLogin, acmCtrlmarker.create);
    app.get('/markers/:markerId', acmCtrlmarker.show);
    app.put('/markers/:markerId', authorization.requiresLogin, hasAuthorization, acmCtrlmarker.update);
    app.del('/markers/:markerId', authorization.requiresLogin, hasAuthorization, acmCtrlmarker.destroy);
    app.post('/markers/downloadfile', acmCtrlmarker.downloadfile);
    // Finish with setting up the acmCemeteryId param
    app.param('markerId', acmCtrlmarker.marker);

};