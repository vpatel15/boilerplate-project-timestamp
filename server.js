// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res)=>{
  const date = new Date();
  res.json({
    "unix": date.valueOf(), 
    "utc" : date.toUTCString()
  });
});
app.get("/api/:timestamp", (req, res)=>{
  const date = req.params.timestamp;
  console.log("Date:" + date);
 
  if(/\d{5,}/.test(date)){
    console.log("is date unix?: Yes");
    res.json({
        "unix": parseInt(date), 
        "utc" : new Date(parseInt(date)).toUTCString()
      });
  }else{
    console.log("is date unix?: NOOO");
    var dateObj = new Date(date);
    if(dateObj.toString()=="Invalid Date"){
      res.json({error: "Invalid date"});
    }else{
      res.json({
        "unix": dateObj.valueOf(), 
        "utc" : dateObj.toUTCString()
      });      
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});