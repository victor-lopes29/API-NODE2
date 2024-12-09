const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
  insumoId: {
    type: String,
    //type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Insumo'
  },
  fornecedor: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  descricaoCompra: {
    type: String
  },
  quantidadeCompra: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Compra', compraSchema);