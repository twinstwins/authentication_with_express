const express = require('express')
const app = new express()
const ejs = require('ejs');
app.set('view engine', 'ejs')
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var path = require('path');
var session = require('express-session');
const bcrypt = require('bcrypt');
var Sequelize = require('sequelize');


const loginController = require('./controllers/loginUser')
app.get('/auth/login',loginController)

const registerUserController = require('./controllers/registerUser')
app.get('/auth/register',registerUserController)

const newUserController = require('./controllers/newUser')
app.post('/users/register',newUserController)



app.listen(4001, ()=>{ console.log('App listening on port 4001')})
