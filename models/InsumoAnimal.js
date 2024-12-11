const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

const InsumoAnimalSchema = new BaseSchema({
    insumoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InsumoCriadouro",
        required: true
    },
    animalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Animal",
        required: true
    }
});

module.exports = mongoose.model("InsumoAnimal", InsumoAnimalSchema);
