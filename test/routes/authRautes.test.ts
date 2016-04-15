import should = require('should');
import mongoose = require('mongoose');
import request = require('supertest');
import app from '../../bin/server';
import { User } from '../../bin/models/user';

var connectionString = 'mongodb://127.0.0.1/sampleAppTestDb';

describe('SignUp', function () {
    before('clean up setup SignUp', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase(done)
        })
    })
    
    it('/api/auth/signup', function(done){
        request(app)
            .post('/api/auth/signup')
            .send({
                name: 'Jóska',
                password: 'pass',
                email: 'level@gmail.com'
            })
            .expect(200)
            .end(function (err, response) {
                if(err) {
                    return done(err);
                }
                done();
            })
    })
})

describe ('SingIn', function () {
     before('clean up setup SignIn', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase();
            
            User.create({
                name: 'Jóska',
                password: 'pass',
                email: 'level@gmail.com' 
            }, done)
        })
    })
    
  it('/api/auth/signin', function (done) {
        request(app)
            .post('/api/auth/signin')
            .send({
                password: 'pass',
                email: 'level@gmail.com'  
            })
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                
                should(response.body.token).be.a.String();
                done()
            })
    })
    
    it('/api/auth/signin wrong password', function (done) {
        request(app)
            .post('/api/auth/signin')
            .send({
                password: 'passwrong',
                email: 'level@gmail.com'  
            })
            .expect(403)
            .end(function (err, response) {
                if (err) return done(err);
                
                should(response.body.token).not.be.a.String();
                should(response.body.message).be.equal('email vagy jelszó nem megfelelő!');
                done()
            })
    })  
})

describe ('me', function () {
    var authToken;
     before('clean up setup SignIn', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase();
            
            User.create({
                name: 'alex',
                password: 'pass',
                email: 'alex@gmail.com' 
            }, function (err, user) {
                if (err) return done(err);
                
                request(app)
                    .post('/api/auth/signin')
                    .send({
                        password: 'pass',
                        email: 'alex@gmail.com'  
                    })
                    .expect(200)
                    .end(function (err, response) {
                        if (err) return done(err);
                        
                        should(response.body.token).be.a.String();
                        authToken = response.body.token;
                        done()
                    })
            })
        })
    })
    
  it('/api/auth/me should be succesful', function (done) {
        request(app)
            .get('/api/auth/me')
            .set('Authorization', authToken)
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);
                
                should(response.body).containEql({
                    name: 'alex',
                    email: 'alex@gmail.com'
                })
                done()
            })
    })
     
})

