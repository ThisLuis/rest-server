const { response } = require("express");
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

        // Generar JWT
        const token = await generateJWT( user.id );
        

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const googleSignIn = async(req, res = response ) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify(id_token);
        console.log(googleUser);

        res.json({
            msg: 'Todo ok!',
            id_token
        });
    } catch(error) {
        json.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

   
}

module.exports = {
    login,
    googleSignIn
}