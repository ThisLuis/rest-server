const { response } = require('express');

const User = require('../models/user');

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
    
    const body = req.body;
    const user = new User( body );

    await user.save();

    res.json({
        msg: ' post API - Controller',
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