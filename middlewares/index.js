const validateFields = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');
const hasRole = require('../middlewares/validar-roles');

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...hasRole,
}