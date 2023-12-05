const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL;

mongoose.connect(url).then(() => {
    console.log('connected to MongoDB')
}).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2}-\d{6}|^\d{3}-\d{5}/.test(v)
            },
            message: p => `${p.value} is not a valid phone number!`
        },
        required: [true, 'Phone number required!']
    }
})

personSchema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})
  
module.exports = mongoose.model('Person', personSchema)