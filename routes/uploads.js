const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFileUpload } = require('../middlewares');
const { allowedCollections } = require('../helpers');
const { uploadFiles, updateImage } = require('../controllers/uploads');

const router = Router();


router.post('/', validateFileUpload,uploadFiles);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('collection').custom( c => allowedCollections( c, [ 'users', 'products' ])),
    validateFields
], updateImage);

module.exports = router;