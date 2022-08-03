const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

/**
 * A method that contains configuration for database cloutendance connection
 */
exports.connect = () => {
    mongoose.connect( process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true } ).then( () => { console.log('Database Cloudtendance Connected\n')} );
    mongoose.connection.on( 'error' , error => { console.log(`Database connection error: ${ error.message }\n`) } );
}
