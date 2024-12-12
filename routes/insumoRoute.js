const express = require('express');
const router = express.Router();
const Insumo = require('../models/InsumoCriadouro'); 

//  obter todos os insumos
router.get('/', async (req, res) => {
    try {
        const insumos = await Insumo.find();
        res.json(insumos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  criar um novo insumo
router.post('/', async (req, res) => {
    try {
        const novoInsumo = new Insumo(req.body);
        await novoInsumo.save();
        res.status(201).json(novoInsumo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// atualiza insumo

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const insumoAtualizado = await Insumo.findByIdAndUpdate(id, req.body, { new: true });
        if (!insumoAtualizado) {
            return res.status(404).json({ error: 'Insumo não encontrado' });
        }
        res.json(insumoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// exclui um Insumo
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const insumoDeletado = await Insumo.findByIdAndDelete(id);
        if (!insumoDeletado) {
            return res.status(404).json({ error: 'Insumo não encontrado' });
        }
        res.json({ message: 'Insumo excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
