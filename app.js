var io = require('socket.io').listen(8080);
io.set('log level', 1);

io.sockets.on('connection', function (socket) {
	console.log("Connected!");
	socket.on('connect', function(data) {
		console.log(data);
		socket.emit('connect', { status: 'ok' });
	});
});
