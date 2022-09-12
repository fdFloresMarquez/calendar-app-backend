const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');

require('dotenv').config()

const app = express();

dbConnection();

//CORS
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y Parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Serving on ${port}`);
})
