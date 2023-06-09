const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Categorie, Product, User } = require('../models');

const ALLOWED_COLLECTIONS = [
    'categories',
    'products',
    'roles',
    'users'
];

const searchUsers = async( query = '', res = response ) => {
    const isMongoId = ObjectId.isValid( query );

    if ( isMongoId ) {
        const user = await User.findById( query );
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( query, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });
}

const searchCategories = async(query = '', res = response ) => {
    const isMongoId = ObjectId.isValid( query );
    if( isMongoId ) {
        const categorie = await Categorie.findById( query );
        return res.json({
            results: ( categorie ) ? [ categorie ] : []
        })
    }

    const regex = new RegExp( query, 'i' );
    const categories = await Categorie.find( { name: regex } );
    res.json({
        results: categories
    })
}

const searchProducts = async( query = '', res = response ) => {

    const isMongoId = ObjectId.isValid( query );

    if( isMongoId ) {
        const product = await Product.findById( query )
                                    .populate("categorie", "name");
        return res.json({
            results: ( product ) ? [ product ] : []
        })
    }

    const regex = new RegExp( query, 'i' );
    const products = await Product.find({ name: regex, status: true })
                                .populate("categorie", "name");

    res.json({
        results: products
    })
}

const search = ( req, res = response ) => {
    
    const { collection, query } = req.params;

    if( !ALLOWED_COLLECTIONS.includes( collection )) {
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${ ALLOWED_COLLECTIONS }`
        });
    }

    switch( collection ){
        case 'users':
            searchUsers( query, res );
        break;

        case 'categories':
            searchCategories( query, res );
        break;

        case 'products':
            searchProducts( query, res );
        break;

        default:
            res.status(500).json({
                msg: 'No se puede realizar esta busqueda...aun'
            })

    }
}

module.exports = {
    search
}