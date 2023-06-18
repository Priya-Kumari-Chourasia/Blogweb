const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const app = express();
const port= process.env.PORT || 8000

require('dotenv').config();
app.use(express.urlencoded ({extended: true}));
//const static_path = path.join(__dirname,"../views")
app.use(express.static('public'));
//console.log(path.join(__dirname,"../views"))
app.use(expressLayouts);

app.set('layout','./layouts/main')
app.set('view engine', 'ejs')

const routes = require('./server/routes/blogroutes')
app.use('/',routes);
/*
app.get("",(req,res) => {
    res.send("welcome to my blog website")
})

app.get("/segments",(req,res) => {
    res.send("welcome to my segment page")
})

app.get("/events",(req,res) => {
    res.send("welcome to my events page")
})

app.get("/jobs",(req,res) => {
    res.send("welcome to my jobs page")
})

app.get("/news",(req,res) => {
    res.send("welcome to my news page")
})

app.get("/footer",(req,res) => {
    res.send("welcome to my footer page")
})
*/
app.listen(port,() => {
    console.log(`listening to the port at ${port}`)
})