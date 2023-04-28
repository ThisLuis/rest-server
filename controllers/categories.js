const { response } = require('express');
const { Categorie, User } = require('../models');

// Obtener categorias - paginado - total - populate()
const getCategories = async( req, res = response ) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };
    
    const [ total, categories ] = await Promise.all([
        Categorie.count(query),
        Categorie.find(query)
            .populate("user", "name")
            .skip( Number( from ))
            .limit( Number( limit ))
    ]);

    res.json({
        total,
        categories
    });
}

// // Obtener categoria - populate()
// const getCategorieById = async( req, res = response ) => {
//     const { id } = req.params;
//     try{
//         const categorie = await Categorie.findById(id).populate("user");
//         if( !categorie ) {
//             res.status(200).json({
//                 msg: 'La categoria no existe'
//             });
//         }
    
//         res.json( categorie );

//     } catch(error) {
//         res.status(404).json({
//             msg: 'La categoria no existe'
//         })
//     }   
    
// }

const getCategorieById = async( req, res = response ) => {
    const { id } = req.params;
    const categorie = await Categorie.findById(id).populate("user", "name");
    res.json(categorie);
}

const createCategorie = async(req, res = response ) => {

    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({ name });

    if( categorieDB ) {
        return res.status(400).json({
            msg: `La categoria: ${ categorieDB.name} ya existe`
        });
    }

    // Generar data
    const data = {
        name,
        user: req.user._id
    };

    const categorie = new Categorie( data );

    // Guardar en la base de datos
    await categorie.save();

    // Crear la response
    res.status(201).json( categorie );
}

// TODO: actualizarCategoria
const updateCategorie = async(req, res = response) => {
    const { id } = req.params;
    const { ...resto } = req.body;
    const categorie = await Categorie.findByIdAndUpdate( id, resto);
    res.json(categorie);
}
// Borrar categoria - state: false
const deleteCategorie = async(req, res = response) => {
    const { id } = req.params;

    const categorie = await Categorie.findByIdAndUpdate( id, { status: false });

    res.json(categorie);
}

module.exports = {
    createCategorie,
    getCategories,
    getCategorieById,
    updateCategorie,
    deleteCategorie
}