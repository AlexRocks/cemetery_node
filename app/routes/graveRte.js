'use strict';

// Articles routes use graves controller
var graves = require('../controllers/graveCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
    if (req.grave.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/graves', graves.all);
    app.post('/graves', authorization.requiresLogin, graves.create);
    app.get('/graves/:graveId', graves.show);
    app.put('/graves/:graveId', authorization.requiresLogin, hasAuthorization, graves.update);
    app.del('/graves/:graveId', authorization.requiresLogin, hasAuthorization, graves.destroy);

    // Finish with setting up the graveId param
    app.param('graveId', graves.grave);

};