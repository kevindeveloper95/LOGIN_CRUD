
const mysql = require('mysql')
const connection = mysql.createConnection({

  host     : "localhost",
  user     : "root",
  password : "password",
  database : "login"


});


connection.connect((error) => {
if (error) {
    console.log("el error en la consola es" + error)
    return
}else{
    console.log('Conexion correcta')
}
   

})

module.exports = connection; 
