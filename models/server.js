const express = require('express');

class Server {
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT


        // ? Middlewares
        this.middlewares();
        // ? Rutas de la app
        this.routes();
    }

    middlewares() {
        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}

module.exports = Server;