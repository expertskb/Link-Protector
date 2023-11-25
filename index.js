const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const route = require('./shakib/router');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', route);
app.use("/:id([a-zA-Z0-9]{6})", route);

app.use((req, res, next) => {
    res.status(404).render('errors/404');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
});
