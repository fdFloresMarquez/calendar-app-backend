/*
    Rutas de usuarios / Auth
    host + /api/auth
*/
const express = require('express');
const { check } = require('express-validator');
const { validateData } = require('../middlewares/validateData')
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJws')

const router = express.Router();

router.post(
    '/new',
    [check('name', 'El nombre es obligatorio').notEmpty()], 
    [check('email', 'El email es obligatorio').isEmail()], 
    [check('password', 'El password debe tener al menos 6 caracteres').isLength({min:6})], 
    validateData,
    createUser,
);

router.post(
    '/', 
    [check('email', 'El email es obligatorio').isEmail()], 
    [check('password', 'El password debe ser de 6 caracteres').isLength({min:6})],
    validateData,
    loginUser
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;