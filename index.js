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


global.loggedIn = null;
app.use("*",(req, res, next) => {
  loggedIn = req.session.userId;
  next()
});

var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })
app.use(cookieParser())

const homeController = require('./controllers/home')
app.get('/',homeController)

const loginController = require('./controllers/login')
app.get('/auth/login',csrfProtection,loginController)

const loginUserController = require('./controllers/loginUser')
app.post('/users/login',parseForm,csrfProtection,loginUserController)


const registerUserController = require('./controllers/registerUser')
app.get('/auth/register',registerUserController)

const createUserController = require('./controllers/createUser')
app.post('/users/register',createUserController)


const postController = require('./controllers/post')
app.get('/post',postController)

const logoutController = require('./controllers/logout')
app.get('/auth/logout',logoutController)



app.listen(4001, ()=>{ console.log('App listening on port 4001')})
