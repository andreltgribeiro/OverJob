const joi = require('@hapi/joi')

const registerValidation = data =>{
    const schema = {
        name: joi.string(),
        email: joi.string().required().email(),
        password: joi.string().min(6).required(),
        userRole: joi.string().required()
    }
    return joi.validate(data, schema)
}
const loginValidation = data =>{
    const schema = {
        email: joi.string().required().email(),
        password: joi.string().min(6).required()
    }
    return joi.validate(data, schema)
}
const jobValidation = data =>{
    const schema = {
        author: joi.string().required(),
        description: joi.string().required(),
        active: joi.boolean()
    }
    return joi.validate(data, schema)
}
module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.jobValidation = jobValidation
