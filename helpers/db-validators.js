const Role = require('../models/role');
const User = require('../models/user');

const itsValidRole = async(role = '') => {
    const existsRole = await Role.findOne({ role });
    if( !existsRole ) {
            throw new Error(`El role ${ role } no esta registrado en la base de datos`);
    }
}

const emailExists = async( email = '') => {
    const existsEmail = await User.findOne({ email });
    if (existsEmail) {
        throw new Error(`El mail ${ email } ya esta en la base de datos actual`);
    }
}

const userExistsById = async( id = '') => {
    const existsUser = await User.findById( id );
    if ( !existsUser ) {
        throw new Error(`El id ${ id } no existe`);
    }
}


module.exports = {
    itsValidRole,
    emailExists,
    userExistsById,
}