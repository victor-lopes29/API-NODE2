const express = require('express');
const router = express.Router();
const Acquisition = require('../models/Acquisition');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Obter todas as aquisições
router.get('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const acquisitions = await Acquisition.find();
    res.status(200).json(acquisitions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma aquisição por ID
router.get('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const acquisition = await Acquisition.findById(req.params.id);
    if (!acquisition) {
      return res.status(404).json({ message: 'Aquisition not found' });
    }
    res.status(200).json(acquisition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma nova aquisição
router.post('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { descricao, aquisicao, reproducao } = req.body;
    const newAcquisition = new Acquisition({ descricao, aquisicao, reproducao });
    await newAcquisition.save();
    res.status(201).json(newAcquisition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma aquisição por ID
router.put('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { descricao, aquisicao, reproducao } = req.body;
    const acquisition = await Acquisition.findByIdAndUpdate(
      req.params.id,
      { descricao, aquisicao, reproducao },
      { new: true }
    );
    if (!acquisition) {
      return res.status(404).json({ message: 'Acquisition not found' });
    }
    res.status(200).json(acquisition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma aquisição por ID
router.delete('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const acquisition = await Acquisition.findByIdAndDelete(req.params.id);
    if (!acquisition) {
      return res.status(404).json({ message: 'Acquisition not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
