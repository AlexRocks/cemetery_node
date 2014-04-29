'use strict';

// Articles routes use acmCemeterys controller
var acmCtrlSection = require('../controllers/sectionCtrl');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.section.user.id !== req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
};

module.exports = function(app) {

    app.get('/sections', acmCtrlSection.all);
    app.post('/sections', authorization.requiresLogin, acmCtrlSection.create);
    app.get('/sections/:sectionId', acmCtrlSection.show);
    app.put('/sections/:sectionId', authorization.requiresLogin, hasAuthorization, acmCtrlSection.update);
    app.del('/sections/:sectionId', authorization.requiresLogin, hasAuthorization, acmCtrlSection.destroy);
    
    app.get('/sections/:cemeteryId', acmCtrlSection.showCemeterySection);

    // Finish with setting up the acmCemeteryId param
    app.param('sectionId', acmCtrlSection.section);

};