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

                const query = "SELECT * FROM expense_records;"

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            return response

        } catch (error) {
            console.log(error)
        }
    }

    async insertNewName(name) {
        try {
            const dateAdded = new Date()
            const insertId = await new Promise((resolve, reject) => {

                const query = "INSERT INTO expense_records (name, date_added) VALUES (?, ?);"

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result.insertId)
                })
            })
            
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded
            }

        } catch (err) {
            console.log(err)
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM expense_records WHERE id = ?;"

            connection.query(query, [id] , (err, result) => {
                if(err) reject(new Error(err.message))
                resolve(result.affectedRows)
            })
        })

            return response === 1 ? true : false

        } catch (error) {
            console.log(error)
            return false
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE expense_records SET name = ? WHERE id = ?"

                connection.query(query, [name, id] , (err, result) => {
                    if(err) reject(new Error(err.message))
                    resolve(result.affectedRows)
                })
        })

            return response === 1 ? true : false
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {

                const query = "SELECT * FROM expense_records WHERE name = ?;"

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })

            return response

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = db_config