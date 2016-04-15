"use strict";
const should = require('should');
const mongoose = require('mongoose');
const request = require('supertest');
const server_1 = require('../../bin/server');
const user_1 = require('../../bin/models/user');
var connectionString = 'mongodb://127.0.0.1/sampleAppTestDb';
describe('SignUp', function () {
    before('clean up setup SignUp', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase(done);
        });
    });
    it('/api/auth/signup', function (done) {
        request(server_1.default)
            .post('/api/auth/signup')
            .send({
            name: 'Jóska',
            password: 'pass',
            email: 'level@gmail.com'
        })
            .expect(200)
            .end(function (err, response) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});
describe('SingIn', function () {
    before('clean up setup SignIn', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase();
            user_1.User.create({
                name: 'Jóska',
                password: 'pass',
                email: 'level@gmail.com'
            }, done);
        });
    });
    it('/api/auth/signin', function (done) {
        request(server_1.default)
            .post('/api/auth/signin')
            .send({
            password: 'pass',
            email: 'level@gmail.com'
        })
            .expect(200)
            .end(function (err, response) {
            if (err)
                return done(err);
            should(response.body.token).be.a.String();
            done();
        });
    });
    it('/api/auth/signin wrong password', function (done) {
        request(server_1.default)
            .post('/api/auth/signin')
            .send({
            password: 'passwrong',
            email: 'level@gmail.com'
        })
            .expect(403)
            .end(function (err, response) {
            if (err)
                return done(err);
            should(response.body.token).not.be.a.String();
            should(response.body.message).be.equal('email vagy jelszó nem megfelelő!');
            done();
        });
    });
});
describe('me', function () {
    var authToken;
    before('clean up setup SignIn', function (done) {
        mongoose.connect(connectionString, function () {
            mongoose.connection.db.dropDatabase();
            user_1.User.create({
                name: 'alex',
                password: 'pass',
                email: 'alex@gmail.com'
            }, function (err, user) {
                if (err)
                    return done(err);
                request(server_1.default)
                    .post('/api/auth/signin')
                    .send({
                    password: 'pass',
                    email: 'alex@gmail.com'
                })
                    .expect(200)
                    .end(function (err, response) {
                    if (err)
                        return done(err);
                    should(response.body.token).be.a.String();
                    authToken = response.body.token;
                    done();
                });
            });
        });
    });
    it('/api/auth/me should be succesful', function (done) {
        request(server_1.default)
            .get('/api/auth/me')
            .set('Authorization', authToken)
            .expect(200)
            .end(function (err, response) {
            if (err)
                return done(err);
            should(response.body).containEql({
                name: 'alex',
                email: 'alex@gmail.com'
            });
            done();
        });
    });
});
//# sourceMappingURL=authRautes.test.js.map