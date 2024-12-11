const express = require('express');
const router = express.Router();
const Health = require('../models/Health');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Obter todas as aquisições
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const health = await Health.find();
    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma aquisição por ID
router.get('/:id', isAuthenticated, async (req, res) => {
  try {
    const health = await Health.findById(req.params.id);
    if (!health) {
      return res.status(404).json({ message: 'Health not found' });
    }
    res.status(200).json(health);S
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma nova aquisição
router.post('/', isAuthenticated, async (req, res) => {
  try {
    const { vacinas, controleParasitas, acompanhamentoVet, descricao} = req.body;
    const newHealth = new Health({ vacinas, controleParasitas, acompanhamentoVet, descricao });
    await newHealth.save();
    res.status(201).json(newHealth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma aquisição por ID
router.put('/:id', isAuthenticated, async (req, res) => {
  try {
    const { vacinas, controleParasitas, acompanhamentoVet, descricao } = req.body;
    const health = await Health.findByIdAndUpdate(
      req.params.id,
      { vacinas, controleParasitas, acompanhamentoVet, descricao },
      { new: true }
    );
    if (!health) {
      return res.status(404).json({ message: 'Health not found' });
    }
    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma aquisição por ID
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const health = await Health.findByIdAndDelete(req.params.id);
    if (!health) {
      return res.status(404).json({ message: 'Health not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
