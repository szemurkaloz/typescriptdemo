"use strict";
const mongoose_1 = require('mongoose');
;
var userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.js.map