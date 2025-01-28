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
const compraRouter = require('./routes/compra');
const acquisitionRouter = require('./routes/acquisitionRoute');
const feedingRouter = require('./routes/feedingRoute');
const healthRouter = require('./routes/healthRoute');
const animalRouter = require('./routes/animalroute');
const insumoAnimalRouter = require('./routes/insumoAnimalRoute');
const insumoRouter = require('./routes/insumoRoute');
const estoqueRouter = require('./routes/estoqueRoute');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/compra', logger, compraRouter); 
app.use('/acquisition', acquisitionRouter);
app.use('/feeding', feedingRouter);
app.use('/health', healthRouter);
app.use('/animal', animalRouter);
app.use('/insumo-animal', insumoAnimalRouter);
app.use('/insumo', insumoRouter);
app.use('/estoque', estoqueRouter);

module.exports = app;

const PORT = process.env.PORT || 3000; // Define a porta padrão como 3000 ou pega do arquivo .env

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});