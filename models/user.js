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

// Remover los campos __v y password modificando el metodo toJSON, solo mandamos los restantes a user
UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );