const mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

const AcquisitionSchema = new BaseSchema({
    descricao: {
        type: String,
        required: true
    },
    aquisicao: {
        type: Boolean,
        required: true
    },
    reproducao: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Acquisition", AcquisitionSchema);
