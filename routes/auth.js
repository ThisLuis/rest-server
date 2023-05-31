const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { login, googleSignIn, renewJWT } = require('../controllers/auth');
const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login);

router.post('/google', [
    check('id_token', 'El Google Token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

router.get('/', validateJWT, renewJWT );

module.exports = router;