const hasRole            = require('../middlewares/validar-roles');
const validateFields     = require('../middlewares/validate-fields');
const validateJWT        = require('../middlewares/validate-jwt');
const validateUploadFile = require('../middlewares/validate-file');

module.exports = {
    ...hasRole,
    ...validateFields,
    ...validateJWT,
    ...validateUploadFile,
}