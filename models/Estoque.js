const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');
const InsumoCriadouro = require('./InsumoCriadouro');

const EstoqueScheme = new mongoose.Schema ({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    insumoId: {
        type: Number,
        allowNull: false,
      //  references: {
         //   model: InsumoCriadouro,
         //   key: 'id',
       // },
    },
    compraId: {
        type: Number,
        allowNull: false,
    },
    quantidadeEstoque: {
        type: Number,
        allowNull: false,
    },
}, {
    tableName: 'estoque',
    timestamps: false,
});

//Estoque.belongsTo(InsumoCriadouro, { foreignKey: 'insumoId', as: 'insumo' });
//InsumoCriadouro.hasMany(Estoque, { foreignKey: 'insumoId', as: 'estoques' });

module.exports = mongoose.model("Estoque", EstoqueScheme);
