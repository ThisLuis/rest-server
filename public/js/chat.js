const url = 'http://localhost:8080/api/auth/';

let user = null;
let socket = null;

const validateJWT = async() => {
    const token = localStorage.getItem('token'); 

    if( token.length <= 10 ) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.name;

    await connectSocket();

}

const connectSocket = async() => {
    const socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
}

const main = async() => {
    await validateJWT();
}

main();

// const socket = io();