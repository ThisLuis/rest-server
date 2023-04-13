const { response } = require('express');

const usersGet = ( req, res = response ) => {
    res.json({
        msg: 'get API - Controller',
    });
}

const usersPost = ( req, res = response ) => {
    const { name, age } = req.body;
    res.json({
        msg: ' post API - Controller',
        name,
        age,
    });
}
const usersPut = ( req, res = response ) => {
    res.json({
        msg: ' put API - Controller'
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