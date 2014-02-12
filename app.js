var io = require('socket.io').listen(8080);
io.set('log level', 1);
var log_level = 2;

var currentSessions = {};

io.sockets.on('connection', function (socket) {

	console.log("Socket [" + socket.id + "] new connection");

	/*
	 * Glass Connection
	 * Create a new SessionID, add the socket to that ID's room, and send back the ID
	 */
	socket.on('glassconnect', function(data) {
		socket.room = Math.floor(Math.random()*900000) + 100000;
		socket.join(socket.room);
		socket.emit('connect', { status: 'connected', sessionID: socket.room });
		console.log("Socket [" + socket.id + "] joined room [" + socket.room+ "]");
	});

	/*
	 * Web Connection
	 * Check to see if the provided room ID is valid. If it is, add the client to that
	 * room and return OK. If not, end the client an error
	 */
	socket.on('webconnect', function(data) {
		socket.room = data.id;
		if(io.sockets.clients(socket.room).length > 0) {
			socket.join(socket.room);
			socket.emit('connect', { status: 'connected' });
			console.log("Socket [" + socket.id + "] joined room [" + socket.room + "]");
		} else {
			socket.emit('connect', { status: 'fail' });
			console.log("Socket [" + socket.id + "] tried to joined invalid room [" + socket.room + "]");
		}
	});

	/*
	 * Leave
	 * Handles when a connection wants to leave its cuurent room
	 */
	socket.on('leave', function(data) {
		if(socket.room != null) {
			socket.leave(socket.room);
			socket.emit('connect', { status: 'disconnected' });
			console.log("Socket [" + socket.id + "] left room [" + socket.room + "]");
			socket.room = null;
		}
	});

	/*
	 * Stream Handlers
	 * intercept messages on these channdels and broadcast them to their respective rooms
	 */
	socket.on('startPresentation', function(data) {
		console.log("Socket [" + socket.id + "] sent startPresentation to room");
		socket.broadcast.to(socket.room).emit('startPresentation', data);
	});
	socket.on('slideNotes', function(data) {
		console.log("Socket [" + socket.id + "] sent slideNotes to room");
		socket.broadcast.to(socket.room).emit('slideNotes', data);
	});
	socket.on('currentSlide', function(data) {
		console.log("Socket [" + socket.id + "] sent currentSlide to room");
		socket.broadcast.to(socket.room).emit('currentSlide', data);
	});

	/*
	 * Disconnect
	 * Log that the socket has disconnected
	 */
	socket.on('disconnect', function() {
		console.log("Socket [" + socket.id + "] disconnect");
	})
});
