const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

const HealthSchema = new BaseSchema({
    vacinas: {
        type: String,
        required: true
    },
    controleParasitas: {
        type: Boolean,
        required: true
    },
    acompanhamentoVet: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Health", HealthSchema);
