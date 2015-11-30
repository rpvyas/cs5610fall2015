var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./public/assignment/server/app.js')(app);
//app.get('/', function(req, res){
//  var response = 'Main Page...Go to current_url/index.html to view website landing page';
//  res.send(response);
//});
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

console.log(mongoose);