const { response }= require('express');
const { uploadFile } = require('../helpers');

const uploadFiles = async(req, res = response) => {
  
    // Verifica que vengan los files - o - Verifica haciendo un barrido si viene al menos una propiedad files en la request
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg: 'No hay archivos para subir.'});
      return;
    }
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

module.exports = {
    uploadFiles,
}