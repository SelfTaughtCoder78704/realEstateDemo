const express = require('express')

const path = require('path')

const bodyParser = require('body-parser');
const KEY = require('./config/keys')

const methodOverride = require('method-override')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index-routes')
const dashboardRouter = require('./routes/dashboard')


const app = express()

// Middleware
//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//Method Override
app.use(methodOverride('_method'))


// Static folder
app.use(express.static('public'))
app.use('/uploads/',express.static('uploads'))
// View Engine
app.set('view engine', 'ejs')



// Connect to mLab
mongoose.connect(KEY,{useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))



// Routing
app.use('/', indexRouter)
app.use('/dashboard', dashboardRouter)


// Port setup

const PORT = 3000
app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server started on ${PORT}`)
})