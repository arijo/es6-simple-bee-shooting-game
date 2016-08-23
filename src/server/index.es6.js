import express from 'express';

let server = express();

server.use(express.static('public'));

server.listen(8080, function() {
  console.log('Server is running ...');
});


