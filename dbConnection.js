"use strict";
var mongoose = require('mongoose');
mongoose.connection.on('connected', function () {
    console.log('mongoose kapcsolódott');
});
mongoose.connection.on('err', function (e) {
    console.log('mongoose kapcsolódási hiba!');
});
mongoose.connection.on('disconnected', function () {
    console.log('mongoose szétkapcsolódott');
});
function connect() {
    return mongoose.connect("mongodb://127.0.0.1/sampleappDb");
}
exports.connect = connect;
//# sourceMappingURL=dbConnection.js.map