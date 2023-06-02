const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');
const { ChatMessages } = require('../models/chat-messages');

const chat = new ChatMessages();

// io es todo el servidor de socket, incluyendo el cliente que se acaba de conectar
const socketController = async( socket = new Socket(), io ) =>  {
    const user = await checkJWT( socket.handshake.headers['x-token'] );

    if( !user ) {
        return socket.disconnect();
    }

    // Cuando un cliente se conecte
    // Agregar el usuario conectado
    chat.connectUser( user );
    io.emit('users-online', chat.usersArr);

    // Limpiar arr de usuarios cuando se desconecte uno
    socket.on('disconnect', () => {
        chat.disconnectUser( user.id );
        io.emit('users-online', chat.usersArr);
    });


}

module.exports = {
    socketController
}