"use strict";
const server_1 = require('./server');
const dbConnection_1 = require('../dbConnection');
dbConnection_1.connect();
server_1.default.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log('Hiba a szolgáltató indításaközben:', +err);
        return;
    }
    console.log('Szolgáltató elindult a http//localhost:3000 on.');
});
//# sourceMappingURL=www.js.map