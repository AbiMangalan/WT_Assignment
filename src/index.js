require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://WoW_Talent_Assignment:cMiFZmsy3Yt1nEIl@cluster0.w5bka.mongodb.net/test',
    { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected...'))
    .catch((err) => console.log(err.message));

app.use('/', router);

app.all('*', (req, res) => res.status(400).send({ status: false, message: 'Bad Request' }));

app.listen(process.env.PORT, () => console.log('Express App running on port', process.env.PORT));