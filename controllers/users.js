const { response } = require('express');
const bcryptjs = require('bcryptjs'); 

const User = require('../models/user');
const { exists } = require('../models/user');

const usersGet = ( req, res = response ) => {
    const { q, name = 'No name', apikey, page, limit } = req.query;
    res.json({
        msg: 'get API - Controller',
        q,
        name,
        apikey,
        page,
        limit
    });
}

const usersPost = async ( req, res = response ) => {
    
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role});


    // Bcryptjs Encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersPut = async( req, res = response ) => {

    const { id } = req.params;
    const { password, google, email, ...resto } = req.body;

    // TODO: Validar contra base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json({
        msg: ' put API - Controller',
        user
    })
}

const usersPatch = ( req, res = response ) => {
    res.json({
        msg: ' patch API - Controller'
    })
}

const usersDelete = ( req, res = response ) => {
    res.json({
        msg: ' delete API - Controller'
    })
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}