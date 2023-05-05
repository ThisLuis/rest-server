const path = require('path');
const fs = require('fs');

const { response }= require('express');
const { uploadFile } = require('../helpers');

const { Product, User } = require('../models');

const uploadFiles = async(req, res = response) => {
  
    // Verifica que vengan los files - o - Verifica haciendo un barrido si viene al menos una propiedad files en la request
 
    // Verificamos que en la request venga el nombre de nuestro file
    // if (!req.files.file) {
    //     res.status(400).json({msg: 'No files were uploaded.'});
    //     return;
    // }

    try {
        // const name = await uploadFile( req.files, ['txt', 'md'], 'textos' );
        const name = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ name });
    } catch(msg) {
        res.status(400).json({ msg });
    }
    
    
}

const updateImage = async( req, res = response ) => {
   
    const { id, collection } = req.params;

    let model;

    switch( collection ) {
        case 'products':
            model = await Product.findById( id );
            if( !model ) {
                return res.status( 400 ).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
            
        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
        break;
        default:
            res.status(500).json({ msg: 'No esta validado...aun'})
    }

    // Limpiar la imagen previa
    if( model.img ) {
        // Borramos la imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', collection, model.img);
        if( fs.existsSync( pathImage )) {
            // Borramos la imagen si existe
            fs.unlinkSync(pathImage);
        }
    }

    const name = await uploadFile( req.files, undefined, collection );
    model.img = name;

    await model.save()



    res.json( model );
}


const showImage = async( req, res = response ) => {

    const { id, collection } = req.params;

    let model;

    switch( collection ) {
        case 'products':
            model = await Product.findById( id );
            if( !model ) {
                return res.status( 400 ).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
            
        case 'users':
            model = await User.findById( id );
            if ( !model ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
        break;

        default:
            res.status(500).json({ msg: 'No esta validado...aun'})
    }

    // Limpiar la imagen previa
    if( model.img ) {
        // Borramos la imagen del servidor
        const pathImage = path.join( __dirname, '../uploads', collection, model.img);
        if( fs.existsSync( pathImage )) {
            return res.sendFile( pathImage );
        }
    }

    res.json( { msg: 'Falta el placeholder'} );
}

module.exports = {
    uploadFiles,
    updateImage,
    showImage
}