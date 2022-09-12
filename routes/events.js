/*
    Event Routes
    /api/events
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { validateData } = require('../middlewares/validateData');
const { validateJWT } = require('../middlewares/validateJws');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

router.use(validateJWT);

//Obtener eventos
router.get('/', getEvents );

//Crear eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validateData
    ],
    createEvent 
);

//Update eventos
router.put(
    '/:id', 
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validateData
    ],
    updateEvent );

//Eliminar eventos
router.delete('/:id', deleteEvent );

module.exports = router;