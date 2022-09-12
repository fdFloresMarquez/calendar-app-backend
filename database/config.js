const mongoose = require('mongoose');

const dbConnection = async() => {

    try{
        await mongoose.connect( process.env.DB_CNN);

        console.log('Connected to database')

    }catch(error){
        console.log(error);
        throw new Error('Error al inicilizar base de datos')
    }

}

module.exports = {
    dbConnection,
}