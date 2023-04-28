const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields }= require('../middlewares');
const { createCategorie, getCategories, getCategorieById, updateCategorie, deleteCategorie } = require('../controllers/categories');

const { existsCategorieById } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', getCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Moongo valido').isMongoId(),
    check('id').custom(existsCategorieById),
    validateFields,
],getCategorieById);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validateJWT,
    check('name', 'Es necesario un nombre para crear una categoria').not().isEmpty(),
    validateFields
], createCategorie);

// Actualizar una categoria por id - privado - cualquiera con token valido
router.put('/:id', [
    validateFields,
],updateCategorie);

// Borrar una categoria - Admin
router.delete('/:id', [
    validateFields,
],deleteCategorie);

module.exports = router;