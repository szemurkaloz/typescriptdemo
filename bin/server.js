"use strict";
const express = require('express');
const auth_routes_1 = require('../routes/auth-routes');
const bodyParser = require('body-parser');
const authMiddlware_1 = require('../routes/authMiddlware');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddlware_1.authMiddlware);
app.use('/api/auth', auth_routes_1.default);
app.get('/test', function (req, res) {
    res.send('teszt meghívódott');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;
//# sourceMappingURL=server.js.map