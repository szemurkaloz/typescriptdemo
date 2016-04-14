"use strict";
var express = require('express');
var auth_routes_1 = require('../routes/auth-routes');
var bodyParser = require('body-parser');
;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/auth', auth_routes_1.default);
app.get('/test', function (req, res) {
    res.send('teszt meghívódott');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=server.js.map