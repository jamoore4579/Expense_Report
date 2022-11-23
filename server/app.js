const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const db_config = require('./db_config')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))

// create
app.post('/insert', (request, response) => {
    const { name } = request.body
})

// read
app.get('/getAll', (request, response) => {
    const db = db_config.getDbConfigInstance()

    const result = db.getAllData()
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err))

})

// update

//delete

app.listen(process.env.PORT, () => console.log('app is running'))