var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var path = require('path');
var session = require('expr`ess-session');
var models = require('../models');
var Sequelize = require('sequelize');
const bcrypt = require('bcrypt');


var userRoutes = express.Router();
userRoutes.get('/login',function(req,res){
  console.log("ログインします！")
    res.render('/user/login');
});
userRoutes.get('/register',function(req,res){
  console.log("登録します！")
    res.render('/user/register',{errors: ""});
});
