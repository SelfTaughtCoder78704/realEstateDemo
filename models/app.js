const express = require('express')
const PORT = 3000
const bodyParser = require('body-parser');
const KEY = require('./config/keys')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index-routes')
const dashboardRouter = require('./routes/dashboard')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect(KEY,{useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))


app.use('/', indexRouter)
app.use('/dashboard', dashboardRouter)

app.listen(process.env.PORT | PORT, () =>{
    console.log(`Server started on ${PORT}`)
})