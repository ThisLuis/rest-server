const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, VALID_EXTENSIONS = [ 'png', 'jpg', 'jpeg', 'gif' ], folder = '' ) => {
    
    return new Promise( ( resolve, reject ) => {

        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut[ nameCut.length - 1 ];
        
        // Valida la extension
        if( !VALID_EXTENSIONS.includes( extension )) {
            return reject(`La extension: ${ extension } no esta permitida, ${ VALID_EXTENSIONS }`);
        }
        
        const temporaryName = uuidv4() + '.' + extension;
        // file.name es el nombre que tiene el archivo cuando lo subimos
        const uploadPath = path.join( __dirname, '../uploads/', folder, temporaryName);
    
        file.mv(uploadPath, (err) => {
        if (err) {
            reject( err );
        }
    
        resolve( temporaryName );
        });
    });

}

module.exports = {
    uploadFile
}