const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json('Obtener categorias');
});

// Obtener una categoria por id - publico
router.get('/:id', (req, res) => {
    res.json('get - id');
});

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', (req, res) => {
    res.json('post');
});

// Actualizar una categoria por id - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json('put');
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
})

module.exports = router;