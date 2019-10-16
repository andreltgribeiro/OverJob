const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        min: 6
    },
    userRole: {
        type: String
    }
})

module.exports = mongoose.model('Users', userSchema)