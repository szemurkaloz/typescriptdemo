"use strict";
const mongoose_1 = require('mongoose');
var sessionSchema = new mongoose_1.Schema({
    sid: { type: String, unique: true },
    user: { type: String, ref: 'User', required: true }
});
exports.Session = mongoose_1.model('Session', sessionSchema);
//# sourceMappingURL=Session.js.map