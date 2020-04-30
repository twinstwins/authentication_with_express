const express = require('express')
const app = new express()
const ejs = require('ejs');
app.use(express.static('public'))
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
const { Sequelize } = require('sequelize');



app.listen(4001, ()=>{ console.log('App listening on port 4001')})
