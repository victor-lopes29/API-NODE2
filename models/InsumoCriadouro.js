const mongoose = require('mongoose');


const InsumoCriadouroScheme = new mongoose.Schema ({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: String,
        allowNull: false,
    },
    descricaoInsumo: {
        type: String,
        allowNull: true,
    },
    quantidadeInsumo: {
        type: Number,
        allowNull: false,
    },
}
);

module.exports = mongoose.model("InsumoCriadouro", InsumoCriadouroScheme);
