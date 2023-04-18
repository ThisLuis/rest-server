const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

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
        // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom( async(role = '') => {
                const existsRole = await Role.findOne({ role });
                if( !existsRole ) {
                        throw new Error(`El role ${ role } no esta registrado en la base de datos`);
                }
        }),
        validateFields,
]
,usersPost);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;