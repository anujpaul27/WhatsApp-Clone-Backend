const express = require('express')
const app = express()
const cors = require('cors')
const router = require('../src/routes/message.routes')


// middleware 
app.use(express.json())
app.use(cors())

app.use('/api/messages', router)

app.get('/',(req,res)=> 
{
    res.send('Server is running')
})


module.exports = app
