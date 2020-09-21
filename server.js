const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')
  const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
      console.log("hello")
    });
  }
    else if (page == '/winner'){
      let playerResult = parseInt(params.playerResult, 10)
      console.log("player",playerResult);
      let computerResult= Math.floor(Math.random()*5);
      console.log('computer',computerResult);
      if((computerResult === 0 && (playerResult ===1 || playerResult === 3)) ||
      (computerResult ===1 && (playerResult ===2 || playerResult === 4)) ||
      (computerResult === 2 && (playerResult === 3 || playerResult === 0)) ||
      (computerResult === 3 && (playerResult ===4 || playerResult === 1)) ||
      (computerResult === 4 && (playerResult === 0 || playerResult === 2))){
        result = false
      }else if((playerResult === 0 && computerResult ===1 || computerResult === 3) ||
      (playerResult === 0 && (computerResult ===1 || computerResult === 3)) ||
      (playerResult ===1 && (computerResult ===2 || computerResult === 4)) ||
      (playerResult === 2 && (computerResult === 3 || computerResult === 0)) ||
      (playerResult === 3 && (playerResult ===4 || computerResult === 1)) ||
      (playerResult === 4 && (computerResult === 0 || computerResult === 2))){
        result = true;
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(JSON.stringify(result));
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/app.js'){
    fs.readFile('js/app.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});
server.listen(8000);
