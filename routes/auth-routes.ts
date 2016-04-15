import { Router, Request, Response } from 'express';
import { User } from '../bin/models/user';
import { Session } from '../bin/models/Session';
import uuid = require('node-uuid');
import { isAuthenticated } from '../routes/authMiddlware';

var router = Router();

router.post('/signup', function (req: Request, res: Response) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, function (err, createdUser){
        if (err){
            return res.status(401).send(err);
        }
        res.send(createdUser);
    })
});

router.post('/signin', function (req, res) {
    User.findOne({
        email: req.body.email
    },function (err, foundUser) {
        if (err || !foundUser) {
            return res.status(401).send(err || 'hiba a bejelentkezés közben')
        }
        
        if (foundUser.password !== req.body.password) {
            return res.status(403).send({message: 'email vagy jelszó nem megfelelő!'})
        }
        
        Session.create({user: foundUser._id, sid: uuid.v1()}, function (err, createdSession){
            if (err || !createdSession) {
                return res.status(401).send(err || 'hiba a munkamenet létrehozása közben!')
            }
            
            return res.send({token: createdSession.sid});
        })
    })
});

router.get('/me', isAuthenticated, function (req, res) {
    User.findById(req.user._id, function (err, foundUser) {
        if (err || !foundUser){
            return res.send(err || 'hiba nincs ilyen felhasználó');
        }
        
        return res.send(foundUser);
    })
});

router.get('/greet', isAuthenticated, function (req, res) {
    var name = req.body.name;
    
    greet(name)
        .then(function (result) {
            res.send(result)
        }, function (err) {
            res.status(400).send(err)
        })
});

function greet (name) {
    return new Promise(function (resolve, reject){
        if (name) {
            resolve('Helló ' + name);
        } else {
            reject(new Error('Nevet kötelező megadni, csak írásjel lehet!'))
        }
        
    })
}

export default router;