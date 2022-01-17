const path = require('path');
const express = require('express');
const app = express();
// const { db, syncAndSeed } = require('./db');
// const a = require('../public/')

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname, '../dist/public');
const DIST_PATH = path.join(__dirname, '../dist');

// body parsing middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

// mount api routes
// app.use('/api', require('./api'));

// error handlilng middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// initiate server + start listening + catch errors
const init = async () => {
    try {
        if (process.env.SEED) {
            // await syncAndSeed();
        }
        else {
            // await db.sync();
        }
        app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
}
init();


