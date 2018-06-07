var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.all("*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

var streamRequest = require("./testReq");
app.use("/stream", streamRequest);


app.use(express.static(__dirname + '/src/views'));

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

var streamIDS = [];
