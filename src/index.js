require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./route/router');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

mongoose.connect(process.env.DB_CONN_STRING,
    { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch((err) => console.log(err.message));

app.use('/', router);

// app.all('*', (req, res) => res.status(400).send({ status: false, message: 'Bad Request' }));

app.listen(process.env.PORT, () => console.log('Express App running on port', process.env.PORT));