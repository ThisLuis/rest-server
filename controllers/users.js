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

    const existsEmail = await User.findOne({ email });
    if( existsEmail ) {
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado',
        });
    }

    // Bcryptjs Encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersPut = ( req, res = response ) => {
    const id = req.params.id;
    res.json({
        msg: ' put API - Controller',
        id
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