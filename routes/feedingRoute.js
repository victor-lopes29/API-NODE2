const express = require('express');
const router = express.Router();
const Feeding = require('../models/Feeding');
const isAuthenticated = require('../middlewares/isAuthenticated');


// Obter todas as aquisições
router.get('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const feeding = await feeding.find();
    res.status(200).json(feeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma alimentação por ID
router.get('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const feeding= await Feeding.findById(req.params.id);
    if (!feeding) {
      return res.status(404).json({ message: 'Feeding not found' });
    }
    res.status(200).json(feeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma nova alimentação
router.post('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { tipoAlimentacao, quantidadeAlimentacao, descricao } = req.body;
    const newFeeding = new Feeding({ tipoAlimentacao, quantidadeAlimentacao, descricao});
    await newFeeding.save();
    res.status(201).json(newFeeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma aquisição por ID
router.put('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { tipoAlimentacao, quantidadeAlimentacao, descricao } = req.body;
    const feeding = await Feeding.findByIdAndUpdate(
      req.params.id,
      { tipoAlimentacao, quantidadeAlimentacao, descricao },
      { new: true }
    );
    if (!feeding) {
      return res.status(404).json({ message: 'Feeding not found' });
    }
    res.status(200).json(feeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma aquisição por ID
router.delete('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const feeding = await Feeding.findByIdAndDelete(req.params.id);
    if (!feeding) {
      return res.status(404).json({ message: 'Feeding not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
