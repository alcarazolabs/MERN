const Joi = require('@hapi/joi');
//validación de Registro de Usuario:

const registroValidacion = (data) => {
  const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
  return schema.validate(data);
}

const loginValidacion = (data) => {
  const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
  return schema.validate(data);
}

const actualizarValidacion = (data) => {
  const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email()
    });
  return schema.validate(data);
}

module.exports.registroValidacion = registroValidacion;
module.exports.loginValidacion = loginValidacion;
module.exports.actualizarValidacion = actualizarValidacion;

