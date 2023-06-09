const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { createServer } = require('http');

const { socketController } = require('../sockets/socketController')
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/uploads',
            users:      '/api/users'
        }

        // this.usersPath = '/api/users';
        // this.authPath  =  '/api/auth';

        // Connect Database
        this.connectDB();

        // ? Middlewares
        this.middlewares();

        // ? Rutas de la app
        this.routes();

        // ? Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    // Todo esto se ejecuta antes de llegar a las rutas
    middlewares() {
        // cors
        this.app.use( cors() );

        // Lectura y parseo
        this.app.use( express.json() );

        // Public directory
        this.app.use(express.static('public'));

        // FileUpload
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            // Flexibilidad para crear directorios sino existen
            createParentPath: true
        }));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.products, require('../routes/products'));
        this.app.use( this.paths.search, require('../routes/search'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        this.app.use( this.paths.users, require('../routes/user'));

    }

    sockets() {
        // this.io.on('connection', socketController );
        // * Mandamos io al socket controller
        this.io.on('connection', ( socket ) => socketController(socket, this.io) )
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;