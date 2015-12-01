var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("inside server");
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/cs5610');

var connectionString = 'mongodb://127.0.0.1/cs5610';
var db = mongoose.connect(connectionString);

console.log(mongoose);
require('./public/assignment/server/app.js')(app,mongoose,db);
//app.get('/', function(req, res){
//  var response = 'Main Page...Go to current_url/index.html to view website landing page';
//  res.send(response);
//});
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);


