const mongoose = require('mongoose')

const Schema = mongoose.Schema
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true,
        maxlength: 10
    },
    picture:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: Schema.Types.ObjectId
    }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact
