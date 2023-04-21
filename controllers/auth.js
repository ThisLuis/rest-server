const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if( !user ){
            return res.status(400).json({
                msg: 'El email no se encuentra en la base de datos'
            });
        }

        // Si el usuario esta activo
        if ( !user.state ) {
            return res.status(400).json({
                msg: 'El usuario esta inactivo en la base de datos'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password);
        if ( !validPassword ) {
            res.status(400).json({
                msg: 'La contraseña no es correcta'
            });
        }
        

        res.json({
            msg: 'Login OK'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login,
}