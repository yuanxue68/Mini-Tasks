var express = require('express');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("=> 🌎  Listening on port 3000");
  }
});