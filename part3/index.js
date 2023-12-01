const express = require('express')
const app = express()

app.use(express.json())

let records = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39121212"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12654321"
  },
  {
    id: "1",
    name: "Mary Poppendicl",
    number: "555666777"
  },
]

app.get('/api/persons', (req, res) => {
  res.json(records)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})