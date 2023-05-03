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
        res.json({
            results: ( user ) ? [ user ] : []
        });
    }
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

        case 'categorie':

        break;

        case 'products':
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