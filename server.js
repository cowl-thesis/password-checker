var express = require('express');
var app = express();

app.use(express.static('files'));

app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

app.get('/checker', function (req, res) {
  res.sendfile('./checker.html');
});

// the rules for ranking a password
app.get('/rules', function (req, res) {
  res.sendfile('./password_rules.json');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
