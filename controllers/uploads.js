const path = require('path');

const { response }= require('express');

const uploadFile = (req, res = response) => {
  
    // Verifica que vengan los files - o - Verifica haciendo un barrido si viene al menos una propiedad files en la request
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({msg: 'No hay archivos para subir.'});
      return;
    }
    
    // Verificamos que en la request venga el nombre de nuestro file
    if (!req.files.file) {
        res.status(400).json({msg: 'No files were uploaded.'});
        return;
    }
  
    const { file } = req.files;
    // file.name es el nombre que tiene el archivo cuando lo subimos
    const uploadPath = path.join( __dirname, '../uploads/', file.name);
  
    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json( { err } );
      }
  
      res.json({ msg: 'El archivo se subio a: ' + uploadPath});
    });
}

module.exports = {
    uploadFile,
}