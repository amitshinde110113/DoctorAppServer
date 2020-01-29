const http = require('http');

const port = process.env.PORT || 4000;

const app=require('./app');

const server= http.createServer(app);



server.listen(port)
// http.listen(3000, function() {
//    console.log('listening on localhost:3000');
// });