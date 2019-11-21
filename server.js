const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('pusher-chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator:'v1:us1:b4fb7491-710e-4e1b-99b9-0f0d6b2c7715',
  key: '16722f3c-ad62-4e7a-9de2-c22574311f5e:UPIfZqlPxhxKFJaevGEE7pM1wFzNkK+0FW4W9ri8JkU=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req,res) => {
  const { username } = req.body

  chatkit
  .createUser({
    name: username,
    id: username
  })
  .then(() => res.sendStatus(201))
  .catch(error => {
    if (error.error_type === 'services/chatkit/user_already_exists') {
      res.sendStatus(200)
    } else {
      res.status(error.statusCode).json(error)
    }
  })
})

const PORT = 3000
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
