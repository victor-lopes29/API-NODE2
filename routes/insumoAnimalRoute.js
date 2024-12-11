const express = require('express');
const router = express.Router();
const InsumoAnimal = require('../models/InsumoAnimal');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Obter todas as aquisições
router.get('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const insumoAnimal = await InsumoAnimal.find();
    res.status(200).json(insumoAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obter uma aquisição por ID
router.get('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const insumoAnimal = await InsumoAnimal.findById(req.params.id);
    if (insumoAnimal) {
      return res.status(404).json({ message: 'Animal not found' });
    }
    res.status(200).json(insumoAnimal);S
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar uma nova aquisição
router.post('/', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { insumoId, animalId } = req.body;
    const newInsumoAnimal = new InsumoAnimal({ insumoId, animalId });
    await newInsumoAnimal.save();
    res.status(201).json(newInsumoAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar uma aquisição por ID
router.put('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const { insumoId, animalId } = req.body;
    const insumoAnimal = await InsumoAnimal.findByIdAndUpdate(
      req.params.id,
      { insumoId, animalId },
      { new: true }
    );
    if (!insumoAnimal) {
      return res.status(404).json({ message: 'InsumoAnimal not found' });
    }
    res.status(200).json(insumoAnimal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Excluir uma aquisição por ID
router.delete('/:id', /*isAuthenticated,*/ async (req, res) => {
  try {
    const insumoAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!insumoAnimal) {
      return res.status(404).json({ message: 'InsumoAnimal not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
