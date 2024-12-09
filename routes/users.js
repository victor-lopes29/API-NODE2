var express = require('express');
var router = express.Router();
const User = require('../models/User');
<<<<<<< HEAD
const isAuthenticated = require('../middlewares/isAuthenticated');

//Obter todos os usuarios
router.get('/', isAuthenticated, async function(req, res, next) {
=======

/* GET users listing. */
router.get('/', async function(req, res, next) {
>>>>>>> 628a4a83ce887c0fdefe453849bf578de93c7372
  
  // SLECT * FROM user
  const users = await User.find(); //Obter todos os usuarios

  // SELECT * FROM user WHERE name = 'Victor'
  //User.find({name: "Victor"}); //Obter todos os usuarios com o nome Victor
  res.json(users);

});

//Obter um usuario pelo ID
<<<<<<< HEAD
router.get('/:id', isAuthenticated, async (req, res) => {
=======
router.get('/:id', async (req, res) => {
>>>>>>> 628a4a83ce887c0fdefe453849bf578de93c7372
  
  const { id } = req.params;

  const user = await User.findById(id);
  
  return user ?
    res.json(user)
    : res.status(404).json({error: 'Id não existe'});

});

//Criar um novo usuario (POST)
router.post('/', (req, res) => {
  //Receber dados do Body (HTTP)
  const body = req.body;

  //Criando a instancia User
  const user = new User(body);

  //Salvar no banco de dados
  user.save(); 

  //Gerar uma resposta para o cliente
  res.status(201).json(user);
});

module.exports = router;
