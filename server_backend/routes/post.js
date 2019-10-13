const router = require('express').Router();
const verify = require('./verificarToken')
const User = require('../model/User')


router.get('/', verify, async (req, res) => {
   res.json({posts: {
        title: "mi primer post",
        descripcion: "alguna descripcion"
        }}) 
    

});

router.get('/getinfo', verify, async (req, res) => {
    /*res.json({posts: {
         title: "mi primer post",
         descripcion: "alguna descripcion"
         }}) 
        */ 
     //res.send(req.user); Envia el id del usuario y otra cosa. Solo con el token. Cada token identifica un usuario.
     //const user =  await User.findOne({_id: req.body._id})
     console.log("Id del usuario: " +req.user._id);
     //Buscar usuario
     const user =  await User.findOne({_id: req.user._id})
     console.log(user)
     //retornar al cliente la información del usuario:
     res.send(user)
 });

module.exports = router;