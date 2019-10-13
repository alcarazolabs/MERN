const express = require('express');
const app = express();
//conectarse a la base de datos:
require('./database.js')
//cors para compartir los recursos CORS 
var cors = require('cors')
app.use(cors())
//importar rutas
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//json middleware (post, get requests)..
app.use(express.json());
//rutas middlewares
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

app.listen(5000, () => console.log('Servidor Corriendo en Puerto 5000'))
