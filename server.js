
var http = require('http');

var server = http.createServer(function(req, res)
{
    res.writeHead(200, {'Content-Type':'text/html'});

    res.write("<h1>Welcome to Node JS Server</h1>");
    res.write("<h2>Server Development Practical</h2>");
    res.write("<p>My First Node JS Server</p>");

    res.end();
});

server.listen(3000, function()
{
    console.log("Server Started Successfully");
    console.log("Server is running at http://localhost:3000");
});
// ctrl+ C in the terminal to stop the server