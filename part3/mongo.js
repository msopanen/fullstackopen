const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://mikkopsopanen:${password}@fullstack-cluster.bv7ifwa.mongodb.net/phonebookApp?retryWrites=true&w=majority`
  
mongoose.set('strictQuery', false)
mongoose.connect(url)

const recordSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Record = mongoose.model('Record', recordSchema)


if (process.argv.length<5) {
  Record.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(({ name, number }) => {
      console.log(`${name} ${number}`)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3];
  const number = process.argv[4];
  const id = Math.floor(Math.random() * 1000001);

  const record = new Record({ name, number, id })

  record.save().then(result => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}
