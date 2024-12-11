const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

const AnimalSchema = new BaseSchema({
    aquisicaoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Acquisition",
        required: true
    },
    alimentacaoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feeding",
        required: true
    },
    saudeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Health",
        required: true
    },
    raca: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Animal", AnimalSchema);
