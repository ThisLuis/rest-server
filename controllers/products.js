
const { response } = require('express');
const { Product } = require('../models');

const createProduct = async( req, res = response ) => {
    const { status, user, ...restData } = req.body;

    const productDB = await Product.findOne({ name: restData.name })

    if( productDB ) {
        return res.status(400).json({
            msg: `El producto: ${ productDB.name } ya existe`
        });
    }

    // Generar data
    const data = {
        ...restData,
        name: restData.name.toUpperCase(),
        user: req.user._id, // Es el usuario que ya esta validado
    }

    const product = new Product( data );
    await product.save();
    res.status(201).json( product );
}

const getProducts = async( req, res = response ) => {
    // ? Que es query en la request?
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [ total, products ] = await Promise.all([
        Product.count(query),
        Product.find(query)
            .populate("user", "name")
            .populate("categorie", "name")
            .skip( Number(from))
            .limit( Number(limit))
    ]);

    res.json({
        total,
        products
    });
}

const getProductById = async( req, res = response ) => {
    const { id } = req.params;
    const product = await Product.findById(id)
                                    .populate("user", "name")
                                    .populate("categorie", "name");
    res.json( product )                            ;
}

const updateProduct = async( req, res = response ) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    if( data.name ) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate( id, data, { new: true } );
    res.json(product);
}

const deleteProduct = async( req, res = response ) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate( id, { status: false }, { new: true } );
    res.json(product);
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
}