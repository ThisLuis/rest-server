// {
//     name: 'name',
//     email: 'mail@mail.com',
//     password: '3213213131',
//     img: 'imagen.jpg',
//     role: 'rol',
//     state: false,
//     google: false
// }

const { Schema, model, models } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [false, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        emun: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

module.exports = model( 'User', UserSchema );