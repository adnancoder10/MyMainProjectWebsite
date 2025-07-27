require('dotenv').config(); 
const express = require('express')
const { Connectedb } = require('./db/connectedb')
const Router_01 = require('./routes/router_01')
const app = express()
const cookieParser = require("cookie-parser");
const Router_02 = require('./routes/router_02');

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Loading my node-cron or cron code here
require('./cron/cleanupTemp')

// connect mongoodb code here
Connectedb(process.env.MAIN_DB_URL)
require('./db/localConnectiondb');

// Loading ejs engine here
app.set('view engine', 'ejs')
app.set('views', './views')

// Loading public folder here
app.use(express.static('public'))
app.use('/BusinessProfiles', express.static('UsersFiles/BusinessProfiles'));

// Loading rouers here
app.use('/', Router_01)
app.use('/', Router_02)

app.listen(8000, ()=>{
    console.log('Server is runing on port: http://localhost:8000/');
})
