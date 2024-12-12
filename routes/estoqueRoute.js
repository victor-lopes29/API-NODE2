const express = require('express');
const router = express.Router();
const Estoque = require('../models/Estoque'); // 
//  obter todos os estoques
router.get('/', async (req, res) => {
    try {
        const estoques = await Estoque.find().populate('insumoId'); // Relacionamento com Insumo
        res.json(estoques);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// criar um novo registro no estoque
router.post('/', async (req, res) => {
    try {
        const novoEstoque = new Estoque(req.body);
        await novoEstoque.save();
        res.status(201).json(novoEstoque);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// atualiza registro de Estoque
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const estoqueAtualizado = await Estoque.findByIdAndUpdate(id, req.body, { new: true });
        if (!estoqueAtualizado) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }
        res.json(estoqueAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//  registro de Estoque
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const estoqueDeletado = await Estoque.findByIdAndDelete(id);
        if (!estoqueDeletado) {
            return res.status(404).json({ error: 'Registro de estoque não encontrado' });
        }
        res.json({ message: 'Registro de estoque excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
