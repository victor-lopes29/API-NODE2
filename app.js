const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL, {})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Falha ao conectar ao MongoDB', err));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const acquisitionRouter = require('./routes/acquisitionRoute');
const feedingRouter = require('./routes/feedingRoute');
const healthRouter = require('./routes/healthRoute');
const animalRouter = require('./routes/animalroute');
const insumoAnimalRouter = require('./routes/insumoAnimalRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/acquisition', acquisitionRouter);
app.use('/feeding', feedingRouter);
app.use('/health', healthRouter);
app.use('/animal', animalRouter);
app.use('/insumo-animal', insumoAnimalRouter);

module.exports = app;
