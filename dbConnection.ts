import mongoose = require('mongoose');

mongoose.connection.on('connected', function () {
    console.log('mongoose kapcsolódott');
});

mongoose.connection.on('err', function (e) {
    console.log('mongoose kapcsolódási hiba!');
})

mongoose.connection.on('disconnected', function () {
    console.log('mongoose szétkapcsolódott');
});

export function  connect() {
    return mongoose.connect("mongodb://127.0.0.1/sampleappDb");
}