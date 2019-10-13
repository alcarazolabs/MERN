//codigo de la base de datos
const mongoose = require('mongoose');
//crear conexion a la BD
console.log(process.env.MONGODB_URI)
const URI = process.env.MONGODB_URI
             ? process.env.MONGODB_URI:
             'mongodb://localhost/jsonwebtokendb';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 

});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log('Conectado a la BD');
});

