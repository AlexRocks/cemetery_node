'use strict';

// Articles routes use acmCemeterys controller
var acmCtrlCemeterys = require('../controllers/cemeteryCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.acmCemetery.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/cemeterys', acmCtrlCemeterys.all);
    app.post('/cemeterys', authorization.requiresLogin, acmCtrlCemeterys.create);
    app.get('/cemeterys/:cemeteryId', acmCtrlCemeterys.show);
    app.put('/cemeterys/:cemeteryId', authorization.requiresLogin, hasAuthorization, acmCtrlCemeterys.update);
    app.del('/cemeterys/:cemeteryId', authorization.requiresLogin, hasAuthorization, acmCtrlCemeterys.destroy);

    app.get('/cemetery/:cemeteryId', acmCtrlCemeterys.getOne);

    // Finish with setting up the acmCemeteryId param
    app.param('cemeteryId', acmCtrlCemeterys.acmCemetery);

};