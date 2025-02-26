const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { connectRabbitMQ, sendToQueue, consumeFromQueue } = require('../utils/rabbitmq.js');

connectRabbitMQ();
// Obter todas as aquisições
router.get('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const animal = await Animal.find();

    await sendToQueue("fila_get_animal", { event: "get_animal", data: animal });
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/consume', async (req, res) => {
  try {
    let messages = [];

    await consumeFromQueue("fila_get_animal", (data) => {
      messages.push(data);
    });

    setTimeout(() => {
      res.status(200).json(messages);
    }, 3000); // Aguardar 3 segundos para capturar mensagens
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});  // Fechar a função de /consume

// Obter uma aquisição por ID
router.get('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma nova aquisição
router.post('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { aquisicaoId, alimentacaoId, saudeId, raca, descricao} = req.body;
    const newAnimal = new Animal({ aquisicaoId, alimentacaoId, saudeId, raca, descricao });
    await newAnimal.save();
    res.status(201).json(newAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma aquisição por ID
router.put('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { aquisicaoId, alimentacaoId, saudeId, raca, descricao } = req.body;
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      { aquisicaoId, alimentacaoId, saudeId, raca, descricao },
      { new: true }
    );
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma aquisição por ID
router.delete('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
