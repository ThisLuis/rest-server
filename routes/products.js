const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdmin } = require('../middlewares');
const { existsProductById } = require('../helpers/db-validators');
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
    check('name', 'Es necesario un nombre para crear el producto'),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    check('id').custom( existsProductById ),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'El id no es valido en moongo'),
    check('id').custom( existsProductById ),
    validateFields
], deleteProduct);

module.exports = router;