const mongoose = require('mongoose')

const jobsSchema = mongoose.Schema({
    author:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now
    },
    description:{
        type: String,
        require: true
    },
    active:{
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('Jobs', jobsSchema)