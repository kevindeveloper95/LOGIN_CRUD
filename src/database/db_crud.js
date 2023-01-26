
const mysql = require('mysql')



const db = mysql.createConnection({
    
    host     : "localhost",
    user     : "root",
    password : "password",
    database : "info_users"
  
})

db.connect((err) => {
if (err) 
    throw err
    console.log('conexion exitosa')

});






module.exports = db

