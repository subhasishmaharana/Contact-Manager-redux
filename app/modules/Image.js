const mongoose = require('mongoose')

const Schema = mongoose.Schema
const imageSchema = new Schema({
    name: {
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

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
