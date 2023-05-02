const Role = require('../models/role');
const { User, Categorie, Product } = require('../models');

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

// Categorias
const existsCategorieById = async( id ) => {
    const existsCategorie = await Categorie.findById(id);
    if ( !existsCategorie ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}

const existsProductById = async( id ) => {
    const existsProduct = await Product.findById(id);
    if( !existsProduct ) {
        throw new Error(`El id no existe: ${ id }`);
    }
}


module.exports = {
    itsValidRole,
    emailExists,
    userExistsById,
    existsCategorieById,
    existsProductById
}