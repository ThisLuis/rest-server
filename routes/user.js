const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersPatch, 
        usersDelete } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post('/', [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo ingresado no es valido').isEmail(),
        check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validateFields,
]
,usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;