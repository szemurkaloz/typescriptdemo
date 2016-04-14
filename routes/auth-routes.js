"use strict";
var express_1 = require('express');
var user_1 = require('../bin/models/user');
var Session_1 = require('../bin/models/Session');
var uuid = require('node-uuid');
var router = express_1.Router();
router.post('/signup', function (req, res) {
    user_1.User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, createdUser) {
        if (err) {
            return res.status(401).send(err);
        }
        res.send(createdUser);
    });
});
router.post('/signin', function (req, res) {
    user_1.User.findOne({
        email: req.body.email
    }, function (err, foundUser) {
        if (err || !foundUser) {
            return res.status(401).send(err || 'hiba a bejelentkezés közben');
        }
        if (foundUser.password !== req.body.password) {
            return res.status(403).send({ message: 'email vagy jelszó nem megfelelő!' });
        }
        Session_1.Session.create({ user: foundUser._id, sid: uuid.v1() }, function (err, createdSession) {
            if (err || !createdSession) {
                return res.status(401).send(err || 'hiba a munkamenet létrehozása közben!');
            }
            return res.send({ token: createdSession.sid });
        });
    });
});
router.get('/me', function (req, res) {
    res.send('me meghívódott');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=auth-routes.js.map