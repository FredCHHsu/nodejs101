var http = require('http'),
    fs = require('fs');

function serveStaticFile (res, path, contentType, responseCode) {
  // body...
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err,data){
    if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('500 - internal Error');
    } else {
        res.writeHead( responseCode, {'Content-Type': contentType});
        res.end(data);
    }
  });
};

http.createServer( function(req, res){
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.end('hello world');

  var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

  switch(path){
    case '':
      // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.end('Homepage');
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.end('About');
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;
    case '/img/logo.jpg':
      serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
      break;
    default:
      // res.writeHead(404, { 'Content-Type': 'text/plain' });
      // res.end('Not Found');
      serveStaticFile(res, '/public/404.html', 'text/html', 404);
      break;
  }

}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl+C to teminate...');