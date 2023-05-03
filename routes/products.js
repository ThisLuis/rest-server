const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdmin } = require('../middlewares');
const { existsProductById, existsCategorieById } = require('../helpers/db-validators');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'El id no pertenece a moongo').isMongoId(),
    check('id').custom(existsProductById),
    validateFields
], getProductById);

router.post('/', [
    validateJWT,
    check('name', 'Es necesario un nombre para crear el producto').not().isEmpty(),
    // Valiadmos que la categoria exista y sea un id valido, el user no lo validamos porque es el que esta logueado
    check('categorie', 'No es un id de mongo valido').isMongoId(),
    check('categorie').custom( existsCategorieById ),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    // check('categorie', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( existsProductById ),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'El id no es valido en moongo').isMongoId(),
    check('id').custom( existsProductById ),
    validateFields
], deleteProduct);

module.exports = router;