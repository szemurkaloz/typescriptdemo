import { Session } from '../bin/models/Session';
import { Request, Response } from 'express';

export function authMiddlware (req:Request, res: Response, next: Function){
    Session.findOne({sid: req.header('Authorization')})
    .populate('user')
    .exec(function (err, foundsession) {
        if (foundsession) {
            req.user =foundsession.user;
            req['isAuthenticated'] = true;
            return next();
        }else{
            req['isAuthenticated'] = false;
            req.user = null;
            return next();
        }
    })
}

export function  isAuthenticated(req: Request, res: Response, next: Function) {
    if (req['isAuthenticated'] == true && req.user._id) {
        return next();
    } else {
        console.log(401);
        return res.status(401).send({message: 'az azonosítás kötelező'});  
    }
    
}