const express = require('express')
const bodyParser = require('body-parser')


const app = express()
const db = require('./queries')
const port = 3003;
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json({ info: 'Node.js, Express, and Postgres API for users' })


})


app.get('api/user', db.getUser)
app.get('api/user/:id', db.getUserById)
app.post('api/user', db.createUser)
app.put('api/user/:id', db.updateUser) 
app.delete('api/user/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

