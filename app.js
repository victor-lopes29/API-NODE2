//Importações
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('./middlewares/logger');

require('dotenv').config();

//Conexão com o banco de dados
const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL, {})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => console.log('Falha ao conectar ao MongoDB', err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var compraRouter = require('./routes/compra');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', logger, indexRouter); //index
app.use('/auth', logger, require('./routes/auth')); //autenticação
app.use('/users', logger, usersRouter); //usuários
app.use('/compra', logger, compraRouter); //compras

module.exports = app;
