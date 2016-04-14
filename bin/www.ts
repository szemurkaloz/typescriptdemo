import app from './server';
import { connect } from '../dbConnection';

connect();
app.listen(3000, 'localhost', function (err) {
    if (err) {
        console.log('Hiba a szolgáltató indításaközben:', + err);
        return;
    }
    console.log('Szolgáltató elindult a http//localhost:3000 on.');
})
