
const mysql = require('mysql')



const db = mysql.createConnection({
    
    host     : process.env.DB_HOST2,
    user     : process.env.DB_USER2,
    password : process.env.DB_PASS2,
    database : process.env.DB_DATABASE2
  
})

db.connect((err) => {
if (err) 
    throw err
    console.log('conexion exitosa')

});






module.exports = db

