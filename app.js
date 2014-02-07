var io = require('socket.io').listen(8080);
io.set('log level', 1);
var log_level = 2;

var currentSessions = {};

io.sockets.on('connection', function (socket) {
	this.sessionID = null;

	/*
	 * Glass Connection
	 * Create a new SessionID, add the socket to that ID's room, and send back the ID
	 */
	socket.on('glassconnect', function(data) {
		this.sessionID = Math.floor(Math.random()*900000) + 100000;
		socket.join(this.sessionID);
		socket.emit('connect', { status: 'connected', sessionID: this.sessionID });
		console.log("Socket [" + socket.id + "] joined room [" + this.sessionID + "]");
	});

	/*
	 * Web Connection
	 * Add the socket to the provided ID's room, and return an OK.
	 */
	socket.on('webconnect', function(data) {
		this.sessionID = data.id;
		socket.join(this.sessionID);
		socket.emit('connect', { status: 'connected' });
		console.log("Socket [" + socket.id + "] joined room [" + this.sessionID + "]");
	});

	/*
	 * Leave
	 * Handles when a connection wants to leave its cuurent room
	 */
	socket.on('leave', function(data) {
		if(this.sessionID != null) {
			socket.leave(this.sessionID);
			socket.emit('connect', { status: 'disconnected' });
			console.log("Socket [" + socket.id + "] left room [" + this.sessionID + "]");
			this.sessionID = null;
		}
	})
});