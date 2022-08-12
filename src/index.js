require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./route/router');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer().any());

mongoose.connect("mongodb+srv://AbiM-DB:5mi7p8PpLWYbYDAM@cluster0.qpomb.mongodb.net/AbiM-DB?authSource=admin&replicaSet=atlas-w1wit2-shard-0&readPreference=primary&ssl=true",
    { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch((err) => console.log(err.message));

app.use('/', router);

app.listen(process.env.PORT, () => console.log('Express App running on port', process.env.PORT));