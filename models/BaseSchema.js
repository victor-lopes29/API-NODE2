const mongoose = require('mongoose');

class BaseSchema extends mongoose.Schema {
    constructor(schemaDefinition, options = {}) {
        super(schemaDefinition, options);
        this.add({
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        });
    }
}

module.exports = BaseSchema;
