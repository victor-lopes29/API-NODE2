const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');

//Obter todos os usuarios
router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find(); // Popula dados da coleção relacionada
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Obter uma compra por ID
router.get('/:id', async (req, res) => {
  try {
    const compra = await Compra.findById(req.params.id).populate('insumoId');
    if (!compra) {
      return res.status(404).json({ message: 'Compra não encontrada' });
    }
    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Criar uma nova compra
router.post('/', async (req, res) => {
  try {
    const { insumoId, fornecedor, valor, descricaoCompra, quantidadeCompra } = req.body;
    const novaCompra = new Compra({ insumoId, fornecedor, valor, descricaoCompra, quantidadeCompra });
    await novaCompra.save();
    res.status(201).json(novaCompra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Atualizar uma compra por ID
router.put('/:id', async (req, res) => {
  try {
    const { insumoId, fornecedor, valor, descricaoCompra, quantidadeCompra } = req.body;
    const compra = await Compra.findByIdAndUpdate(
      req.params.id,
      { insumoId, fornecedor, valor, descricaoCompra, quantidadeCompra },
      { new: true } // Retorna o documento atualizado
    );
    if (!compra) {
      return res.status(404).json({ message: 'Compra não encontrada' });
    }
    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Excluir uma compra por ID
router.delete('/:id', async (req, res) => {
  try {
    const compra = await Compra.findByIdAndDelete(req.params.id);
    if (!compra) {
      return res.status(404).json({ message: 'Compra não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
