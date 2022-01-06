var express = require('express');
require('dotenv').config()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
var register = require('./routing/register');

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify:false
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'))

app.use(function(req, res, next) {


    // Website you wish to allow to connect
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    //res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
   // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
   // next();
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});


app.use('/registration',register)
app.use('/login',register)
app.use('/display',register)
app.use('/errase',register)

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

/*
    http://localhost:3000/getparty
    http://localhost:3000/getproduct
*/