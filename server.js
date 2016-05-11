var http = require('http');
var url = require('url');
var fs = require('fs');


var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('Hola mundo!');
            response.end();
            break;
        case '/index.html':
            fs.readFile(__dirname + path, function(error, data){
                if (error){
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write('Content not found');
                    response.end();
                } else{
                    response.writeHead(200, {'Content-Type' : 'text/html'});
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
            break;
    }
});
var io = require('socket.io')(server);
server.listen(8000);

io.on('connection', function(socket){
    socket.emit('fooBarEvent', {
        'message' : 'These aren\'t the droids you\'re looking for.😇'
    });
    socket.on('sendClientData', function(data){
        console.log(data);
    });

    socket.on('sendDeviceOrientation', function(data){
        console.log(data);
        socket.broadcast.emit('sendCoords', data);
    });
});
