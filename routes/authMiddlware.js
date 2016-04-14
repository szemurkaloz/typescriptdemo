"use strict";
var Session_1 = require('../bin/models/Session');
function authMiddlware(req, res, next) {
    Session_1.Session.findOne({ sid: req.header('Authorization') })
        .populate('user')
        .exec(function (err, foundsession) {
        if (foundsession) {
            req.user = foundsession.user;
            req['isAuthenticated'] = true;
            return next();
        }
        else {
            req['isAuthenticated'] = false;
            req.user = null;
            return next();
        }
    });
}
exports.authMiddlware = authMiddlware;
function isAuthenticated(req, res, next) {
    if (req['isAuthenticated'] == true && req.user._id) {
        return next();
    }
    else {
        console.log(401);
        return res.status(401).send({ message: 'az azonosítás kötelező' });
    }
}
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authMiddlware.js.map