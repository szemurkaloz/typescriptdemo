import express = require('express');
import authroutes from '../routes/auth-routes';
import bodyParser = require('body-parser');
import { authMiddlware } from '../routes/authMiddlware';

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(authMiddlware);
app.use('/api/auth', authroutes);

app.get('/test', function (req, res) {
    res.send('teszt meghívódott');
});

export default app;