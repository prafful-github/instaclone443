const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT
// oKYYAfdtXxI5IgWS password of username = praffulkumar121 on mongodb
const {MONGOURI} = require('./config/keys')
const cors = require('cors');
const path = require('path');

// to solve cors error
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["GET", "POST", "PUT", "DELETE"]
// }))


mongoose.connect(MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log("connected to mongos ")
})
mongoose.connection.on('error', (err)=>{
    console.log("err connecting", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// const customMiddleware = (req, res, next)=>{
//     console.log("middleware executed!")
//     next()
// }

// app.get('/',(req,res)=>{
//     res.send("hello world")
//     console.log("in home")
// })

// app.get('/about',customMiddleware,(req, res)=>{
//     res.send("about page")
//     console.log("in about page")
// })

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

// if(process.env.NODE_ENV=="production"){
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }

app.listen(PORT, ()=>{
    console.log("server is running on ", PORT)
})
