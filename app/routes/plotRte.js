'use strict';

// Articles routes use acmCemeterys controller
var acmCtrlplot = require('../controllers/plotCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.plot.user.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
};

module.exports = function(app) {

    app.get('/plots', acmCtrlplot.all);
    app.post('/plots', authorization.requiresLogin, acmCtrlplot.create);
    app.get('/plots/:plotId', acmCtrlplot.show);
    app.put('/plots/:plotId', authorization.requiresLogin, hasAuthorization, acmCtrlplot.update);
    app.del('/plots/:plotId', authorization.requiresLogin, hasAuthorization, acmCtrlplot.destroy);

    // Finish with setting up the acmCemeteryId param
    app.param('plotId', acmCtrlplot.plot);

};