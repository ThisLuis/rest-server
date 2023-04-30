const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
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
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // cors
        this.app.use( cors() );

        // Lectura y parseo
        this.app.use( express.json() );

        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categories, require('../routes/categories'));
        this.app.use( this.paths.users, require('../routes/user'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;