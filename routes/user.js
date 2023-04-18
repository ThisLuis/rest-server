const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersPatch, 
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
        check('email', 'El correo ingresado no es valido').isEmail(),
]
,usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;