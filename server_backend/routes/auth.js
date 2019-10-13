const router = require('express').Router();
//Importar modelo usuario:
const User = require('../model/User')
//validación
const Joi = require('@hapi/joi');
//console.log(Joi.version)
const {registroValidacion, loginValidacion, actualizarValidacion} = require('../validacion')
//importar encriptador de passwords
const bcrypt = require('bcryptjs');
//import jsonwebtoken
const jwt = require('jsonwebtoken')
//importar la clave secreta
const config = require('../config')

const verificarToken = require('./verificarToken')

router.post('/registrar', async (req, res) =>{
    //validar los datos antes de crear el usuario
    //validar
    const { error } = registroValidacion(req.body);
    
    //const {error, value} = await schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    //console.log(error.details)
    //return res.status(400).send(error.datails) 
    //verificar si el usuario ya existe en la bd
    const emailExiste = await User.findOne({email: req.body.email})
    if(emailExiste) return res.status(400).send('Email ya existe')
    //encriptar contraseña con bcryptjs:
    const salt = await bcrypt.genSalt(10);
    //crear el hash
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
    const userguardado = await user.save();
    //res.send(userguardado);
    res.send({user: user._id})
    }catch(err){
        res.status(400).send(err)
    }

});
router.post('/Login', async (req, res) =>{
    //validar
    const { error } = loginValidacion(req.body);
    //if(error) return res.status(400).send("Los campos requiren mas información")
    if(error) return res.status(400).send(error.details[0].message);
    //return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email: req.body.email})
    //verificar si el email existe
    if(!user) return res.status(400).send('Email no encontrado')
    //la contraseña es correcta
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Contraseña Invalida')
    
    //Crear y asignar token
    const token = jwt.sign({_id: user._id}, config.token_secret);
    //res.header('auth-token', token).send(token);

    res.json({auth: true, token})

    res.send('Login correcto')
    
 });

 router.post('/actualizar/', verificarToken, async (req, res) =>{
    //validar
    const { error } = actualizarValidacion(req.body);
    //if(error) return res.status(400).send("Los campos requiren mas información")
    if(error) return res.status(400).send(error.details[0].message);
    const {name, email} = req.body
  
    await User.findByIdAndUpdate(req.user._id, {
        name: name,
        email: email
    });

    res.json({mensaje: 'Usuario Actualizado'})
  
 });

module.exports = router;