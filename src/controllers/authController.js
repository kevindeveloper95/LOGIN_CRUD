const bcrypts = require('bcrypt')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')
const connection = require('../database/db')




exports.register = async (req, res) => {

    try {
        const usuario = req.body.usuarios
        const name = req.body.name
        const rol = req.body.rol
        const pass = req.body.pass
        
        connection.query('INSERT INTO users SET ?', { user:usuario, name:name, rol:rol, password:pass}, async (error, results) => {
            if (!error) {
                res.render('register', {
                  alert: true,
                  alertTitle: 'registration',
                  alertMessage: "Success Registration",
                  alertIcon: 'success',
                  showConfirmationButton: false,
                  time: 1500,
                  ruta: 'login'  
                })
            }
    
        }) 
    } catch (error) {
        console.error(error)
    }
 
}

exports.login = async (req,res) => {

  try {
    const user = req.body.user;
    const pass = req.body.pass
    const passwordHash = await bcrypts.hash(pass, 8);
    if (!user && !pass) {
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error',
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: 'error',
                    showConfirmationButton: true,
                    time: false,
                    ruta: 'login'  
                  })
            }else{
                connection.query('SELECT * FROM users WHERE user = ? and password = ? ', [user, pass], async (error, results) => {
                if (results.length == 0 ){
                res.render('login', {
                    alert: true,
                    alertTitle: 'Error ',
                    alertMessage: "Usuario y/o password incorrectas",
                    alertIcon: 'error',
                    showConfirmationButton: true,
                    time: false,
                    ruta: 'login'  
                  })
             }else{
               const id = results[0].id
               const token = jwt.sign({id:id},"super_secret",{
                 expiresIn: "7d"
               })
               console.log(token + user)

               const cookiesOption = {
                 expires: new Date(Date.now()+ "90"  + 9999),
                 httpOnly: true
               }
               res.cookie('jwt',token,cookiesOption)
                res.render('login', {
                    alert: true,
                    alertTitle: 'success ',
                    alertMessage: "Login correcto",
                    alertIcon: 'success',
                    showConfirmationButton: true,
                    time: 1500,
                    ruta: ''  
                  })
             }
        })  
    }
  } catch (error) {
      console.log(error)
  }


}

exports.isAuthenticated = async (req,res, next)=>{
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, "super_secret")
      connection.query('SELECT * FROM users WHERE id = ?',[decodificada.id], (error, results) => {
        if (!results) {
          return next()
        }
        req.user = results[0]
        return next()
      })
    } catch (error) {
      console.error(error)
      return next()
    }
  
  }else{
    res.redirect('/login')
  }
}


exports.logout = (req,res) =>{
res.clearCookie('jwt')
return res.redirect('/')

}
