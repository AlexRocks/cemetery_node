'use strict';

exports.render = function(req, res) {
    res.render('index2', {
        user: req.user ? JSON.stringify(req.user) : 'null'
    });
};

