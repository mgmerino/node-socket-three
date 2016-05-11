var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(server);

// server
var server = http.createServer(function(request, response){
    //console.log(request);
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, {'Content-Type': 'text/json'});
            response.write('{"greet": "Hello World"}');
            response.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.write('resource not found');
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data, 'utf8');
                    response.end();
                }
            });
            break;
        case '/detect.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(404, {'Content-Type': 'text/html'});
                    response.write('resource not found');
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data, 'utf8');
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.write('resource not found');
            response.end();
            break;
    }


});

server.listen(8000);

io.on('connection', function(socket){
    // 1 basic example
    socket.emit('sendMessage', {
        "message" : "These aren't the droids you're looking for.😇"
    });
    // 2 infinite loop
    socket.on('sendClientDate', function(data){
        console.log(data);
        socket.emit('sendServerDate',
            {
                "date": new Date(),
                "source": "Server"
            }
        );
    });
    // 3 device events
    socket.on('sendDeviceOrientation', function(data){
        console.log(data);
  		socket.emit('sendCoords', data)
  	});
});


// router
