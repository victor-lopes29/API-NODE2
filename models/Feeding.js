const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

const FeedingSchema = new BaseSchema({
    tipoAlimentacao: {
        type: String,
        required: true
    },
    quantidadeAlimentacao: {
        type: Number,
        required: true
    },
    descricao: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("Feeding", FeedingSchema);
