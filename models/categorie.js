const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
    name: {
        type: String,
        required:  [true, 'La categoria es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    // 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorieSchema.methods.toJSON = function() {
    const { __d, status,  ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categorie', CategorieSchema );