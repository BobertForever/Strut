var io = require('socket.io').listen(8080);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
	socket.emit('slide', { slide: 1 });
	socket.on('data', function(data) {
		console.log(data);
	})
});
