const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../Util/validation')
const bcrypt = require('bcryptjs')
const verify = require('../Util/verifyToken')
const roles = require('../Util/roles')
const authorize = require('../Util/authorize')

router.get('/', verify, authorize(roles.Admin), async (req, res) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.send({message: error})
    }
})

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body)
    if(error) return res.status(404).send(error.details[0].message)
    
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const role = req.body.userRole
    if(role != roles.User && role != roles.Writer) return res.status(400).send('This role do not exist')

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        userRole: role
    })
    try {
        const savedUser = await user.save()
        res.send({
            user: user._id
        })
    } catch (error) {
        res.json({message: error})
    }
})

router.post('/login', async (req, res) => {
    
    const { error } = loginValidation(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email or password is wrong')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Email or password is wrong')

    const token = jwt.sign({
        _id: user._id,
        userRole: user.userRole
        },
        process.env.TOKEN_SECRET
    )
    res.header('Authorization', token).send({
        user:{
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.userRole,
            token
        }
    }) 
})
module.exports = router