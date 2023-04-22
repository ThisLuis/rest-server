const { Router } = require('express');
const { check } = require('express-validator');

const { itsValidRole, emailExists, userExistsById } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

const { usersGet, 
        usersPut, 
        usersPost, 
        usersPatch, 
        usersDelete } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-fields');
        
const router = Router();

router.get('/', usersGet);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( userExistsById ),
        check('role').custom( itsValidRole ),
        validateFields
],usersPut);

router.post('/', [
        // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        // Cuando tengamos una funcion o cun callback cuyo primer argumento es el mismo argumento que estamos recibiendo este se puede obviar
        // check('role').custom( (role) => itsValidRole(role) ),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo ingresado no es valido').isEmail(),
        check('email').custom(emailExists),
        check('role').custom( itsValidRole ),
        validateFields,
]
,usersPost);

router.delete('/:id', [
        validateJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( userExistsById),
        validateFields

],usersDelete); 

router.patch('/', usersPatch);

module.exports = router;