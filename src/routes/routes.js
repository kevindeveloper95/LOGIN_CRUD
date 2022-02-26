const { Router } = require('express');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const conexion = require('../database/db')
const conn = require('../database/db_crud')


router.get('/', authController.isAuthenticated, (req,res) => {
  
    conn.query("SELECT * FROM users", (err, result) => {
     if (err) {
       console.log('hay un error')
     }else{
       res.render('principal', {results:result,user:req.user})
     }
 }) 
 })

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/register', (req,res)=>{
    res.render('register')
})


router.post('/login', authController.login )
router.post('/register', authController.register )
router.get('/logout', authController.logout )


router.get('/create',authController.isAuthenticated,(req,res) => {
res.render('create', {user:req.user})
})

router.get('/edit/:id', authController.isAuthenticated, (req,res) => {
  const id = req.params.id
  conn.query('SELECT * FROM users WHERE id= ?',[id], (err, result) => {
    if (err) {
      console.log('hay un error')
    }else{
      res.render('edit', {user:result[0]})
    }
  })
  })


  router.get('/delete/:id', (req, res) => {
    const pa = req.params.id;
    conn.query('DELETE FROM users WHERE id= ?', [pa], (err, results) => {
      if (err) {
        console.log(err)
      }else{
        res.redirect('/')
      }
    })
  })


const crud = require('../controllers/crud')
router.post('/save', crud.save)
router.post('/update', crud.update)


module.exports =  router

