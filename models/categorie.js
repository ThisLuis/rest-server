const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
    name: {
        type: String,
        required:  [true, 'La categoria es obligatorio']
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

module.exports = model( 'Categorie', CategorieSchema );