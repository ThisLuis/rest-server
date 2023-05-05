const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String, 
        required: [ true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },

});

ProductSchema.methods.toJSON = function() {
    const { __d, status, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Product', ProductSchema );