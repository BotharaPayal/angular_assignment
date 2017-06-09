var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');
//
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath));

app.get('/tasksAPI', function(req,res){
  var task = fs.readFileSync('task.json', 'utf8');
      res.setHeader('Content-Type', 'application/json');
      res.send(task);
});

app.post('/tasksAPI',function(req,res){
  var taskList = req.body;
    fs.writeFileSync('task.json', JSON.stringify(taskList));
    res.send(taskList);
});

app.get('/', function(req, res, next) {
    res.sendFile(path.join(rootPath + '/index.html'));
});

app.listen(8012);
console.log('Listening on port ' + 8012 + '...');
