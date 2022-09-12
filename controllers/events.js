const express = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = express.response) => {

    const events = await Event.find()
                                .populate('user', 'name');

    try {
        res.status(201).json({
            ok: true,
            events
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo obtener eventos'
        })
    }
}

const createEvent = async(req, res = express.response) => {

    const event = new Event(req.body);


    try {
        event.user = req.uid

        const savedEvent = await event.save();

        res.json({
            ok: true, 
            event: savedEvent
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async(req, res = express.response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId)

        //Si no se encuentra el evento da un error
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró evento con esa id'
            })
        };
        
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        };

        const newEvent ={
            ...req.body,
            user: req.uid
        };

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );


        res.status(201).json({
            ok: true, 
            event: updatedEvent
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteEvent = async(req, res = express.response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId)

        //Si no se encuentra el evento da un error
        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró evento con esa id'
            })
        };
        
        if(event.user.toString() !== req.uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento'
            });
        };

        const eventDeleted = await Event.findByIdAndDelete( eventId );


        res.status(201).json({
            ok: true, 
            event: eventDeleted
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};