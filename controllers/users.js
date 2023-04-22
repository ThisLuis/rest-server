const { response } = require('express');
const bcryptjs = require('bcryptjs'); 

const User = require('../models/user');
const { exists } = require('../models/user');

const usersGet = async( req, res = response ) => {
    // const { q, name = 'No name', apikey, page, limit } = req.query;
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };
 
    
    const [ total, users ] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip( Number( from ))
            .limit( Number( limit ))
    ]);



    res.json({
        total,
        users
        // total,
        // user,
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
    const { _id, password, google, email, ...resto } = req.body;

    // TODO: Validar contra base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.json( user );
}

const usersPatch = ( req, res = response ) => {
    res.json({
        msg: ' patch API - Controller'
    })
}

const usersDelete = async( req, res = response ) => {

    const { id } = req.params;

    // const uid = req.uid;

    // Borrar de DB
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false });

    res.json(user);
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}