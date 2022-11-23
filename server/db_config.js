const mysql = require('mysql')
const dotenv = require('dotenv')
let instance = null
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db ' + connection.state)
})

class db_config {
    static getDbConfigInstance() {
        return instance ? instance : new db_config()
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {

                const query = "SELECT * FROM sample;"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            //console.log(response)
            return response

        } catch (error) {
            console.log(error)
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date()
            const insertId = await new Promise((resolve, reject) => {

                const query = "INSERT INTO sample (name, date_added) VALUES (?, ?);"

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result.insertId)
                })
            })

            //console.log(response)
            return response

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = db_config