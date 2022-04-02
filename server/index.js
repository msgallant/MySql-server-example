
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'demodatabase',
})

connection.connect()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM my_table;"
    connection.query(sqlSelect,  (err, result) => {
            console.log(result)
            console.log("sent select query")
            res.send(result)
    })
})



app.post('/api/insert', (req, res) => {

    const dataName = req.body.dataName
    const dataValue = req.body.dataValue

    const sqlInsert = "INSERT INTO my_table (dataName, dataValue) VALUES (?, ?);"
    connection.query(sqlInsert, [dataName, dataValue], 
        (err, result) => {
            console.log("sent insert query")
    })
})

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id

    const sqlDelete = "DELETE FROM my_table WHERE id = ?;"
    connection.query(sqlDelete, [id], 
        (err, result) => {
            console.log("sent delete query")
    })
})

app.put('/api/update', (req, res) => {
    const id = req.body.id
    const dataValue = req.body.dataValue

    const sqlUpdate = "UPDATE my_table SET dataValue = ? WHERE id = ?;"
    connection.query(sqlUpdate, [dataValue, id], 
        (err, result) => {
            console.log("sent update query")
    })
})


//connection.end()

//test
//request, response
/*app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO my_table (dataName, dataValue) VALUES ('data name 1 vsc', 'value 1 vsc');"
    connection.query(sqlInsert, (err, result) => {

        res.send("hello, sent stuff >>>")
    })
    
})*/



app.listen(3004, () => {
    console.log("listening on port 3004")
})