const { name } = require('ejs')
const conexion = require('../database/db_crud')


exports.save = (req, res) => {
const user = req.body.user
const rol = req.body.rol
const activities = req.body.activities
conexion.query("INSERT INTO users SET ?", {name:user, rol:rol, activities:activities}, (error,result) =>{
if (error) {
    console.log(error)
}else{
    res.redirect('/')
}
})
}


exports.update = (req, res) => {
const id = req.body.id
const user = req.body.user
const rol = req.body.rol
const activities = req.body.activities
conexion.query("UPDATE users SET ? WHERE id = ?", [{ name:user, rol:rol, activities:activities}, id], (error, result) => {
    if (error) {
        console.log(error)
    }else{
        res.redirect('/')
    }
})

}