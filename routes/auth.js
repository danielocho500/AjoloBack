const { Router } = require('express');
const { check } = require('express-validator');
const { authLogin } = require('../controllers/auth/authLogin');
const { authRegister } = require('../controllers/auth/authRegister');
const { validateParams } = require('../helpers/validateParams');

const router = Router();
router.post('/login', [
    check('email', 'You should include a valid email').isEmail().notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    validateParams,
], authLogin);

router.post('/registerClient', [
    check('email', 'You should include a valid email').isEmail().notEmpty(),
    check('username', 'You should include a username').notEmpty(),
    check('password', 'You should include a password').notEmpty(),
    check('password', 'The password is not secure').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }),
    validateParams,
], authRegister);

module.exports = router;