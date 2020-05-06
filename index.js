const express = require('express')
const app = new express()
const ejs = require('ejs');
app.set('view engine', 'ejs')
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var cookieParser = require('cookie-parser')

var session = require('express-session');
app.use(session({
  secret: 'cocteau twins',
  saveUninitialized: true,
  resave: true
}));

var Sequelize = require('sequelize');
var models = require('./models')
const bcrypt = require('bcrypt');
const User = require('./models/user')

global.loggedIn = null;
app.use("*",(req, res, next) => {
  loggedIn = req.session.userId;
  next()
});



var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
app.use(cookieParser())

require('dotenv').config()
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
    }
});


const homeController = require('./controllers/home')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const registerUserController = require('./controllers/registerUser')
const createUserController = require('./controllers/createUser')
const postController = require('./controllers/post')
const logoutController = require('./controllers/logout')
const forgotpasswordController = require('./controllers/forgotpassword')
const resetpasswordController_get = require('./controllers/resetpassword_get')
const resetpasswordController_post = require('./controllers/resetpassword_post')

const redirectAuthUser = require('./middlewares/redirectAuthUser')
const userEmailValidation = require('./middlewares/userEmailValidation')


app.get('/',homeController)
app.get('/auth/login',redirectAuthUser,loginController)
app.post('/users/login',loginUserController)
app.get('/auth/logout',logoutController)
app.get('/auth/register',redirectAuthUser,csrfProtection,registerUserController)
app.post('/users/register',userEmailValidation,parseForm,csrfProtection,createUserController)
app.get('/post',postController)
app.get('/forgot-password', function(req, res, next) {
  res.render('./forgotpassword', { });
});
app.post('/forgot-password',forgotpasswordController)
app.get('/reset-password',resetpasswordController_get)
app.post('/reset-password',resetpasswordController_post)


module.exports = app

app.listen(4001, ()=>{ console.log('App listening on port 4001')})
