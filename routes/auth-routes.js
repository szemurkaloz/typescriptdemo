"use strict";
const express_1 = require('express');
const user_1 = require('../bin/models/user');
const Session_1 = require('../bin/models/Session');
const uuid = require('node-uuid');
const authMiddlware_1 = require('../routes/authMiddlware');
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
router.get('/me', authMiddlware_1.isAuthenticated, function (req, res) {
    user_1.User.findById(req.user._id, function (err, foundUser) {
        if (err || !foundUser) {
            return res.send(err || 'hiba nincs ilyen felhasználó');
        }
        return res.send(foundUser);
    });
});
router.get('/greet', authMiddlware_1.isAuthenticated, function (req, res) {
    var name = req.body.name;
    greet(name)
        .then(function (result) {
        res.send(result);
    }, function (err) {
        res.status(400).send(err);
    });
});
function greet(name) {
    return new Promise(function (resolve, reject) {
        if (name) {
            resolve('Helló ' + name);
        }
        else {
            reject(new Error('Nevet kötelező megadni, csak írásjel lehet!'));
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=auth-routes.js.map