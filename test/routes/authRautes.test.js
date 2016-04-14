"use strict";
var should = require('should');
var mongoose = require('mongoose');
var request = require('supertest');
var server_1 = require('../../bin/server');
var user_1 = require('../../bin/models/user');
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
});
//# sourceMappingURL=authRautes.test.js.map