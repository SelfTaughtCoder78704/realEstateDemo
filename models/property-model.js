const mongoose = require('mongoose')
const Schema = mongoose.Schema


const propertySchema = new Schema({
    streetAdr : {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: false
    },
    agentName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: false
    },
    squareFootage: {
        type: Number,
        required: false
    },
    bathrooms: {
        type: Number,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
})

const Property = mongoose.model('prop', propertySchema)

module.exports = Property