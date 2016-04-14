"use strict";
var express_1 = require('express');
var router = express_1.Router();
router.post('/singup', function (req, res) {
    res.send('feliratkozás meghívódott');
});
router.post('/singin', function (req, res) {
    res.send('bejelentkezés meghívódott');
});
router.get('/me', function (req, res) {
    res.send('me meghívódott');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = router;
//# sourceMappingURL=auth-routes.js.map