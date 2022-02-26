
const path = require('path')
// 1 - Invocamos a Express
const express = require('express');
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './src/env/.env'});



//4 -seteamos el directorio de assets
app.use('/resources',express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));
app.set('views',path.join(__dirname,'views'))
app.use(express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantillas
app.set('view engine','ejs');

//6 -Invocamos a bcrypt
const bcrypt = require('bcrypt');




// 8 - Invocamos a la conexion de la DB
const conection = require('./database/db');
const cookieParser = require('cookie-parser');
app.use(cookieParser())

app.use('/', require('./routes/routes'))

app.use(function(req, res, next){
    if (!req.user) 
        res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
        next();
    
})

app.listen(3000, (req, res) => {
    console.log('corriendo')
})