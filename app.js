var io = require('socket.io').listen(8080);
io.set('log level', 1);
var log_level = 2;

var currentSessions = {};

io.sockets.on('connection', function (socket) {
	client = null;
	sid = null;

	/*
	 * Glass Connection
	 * Create a new SessionID, add it and the socket's ID to the current sessions,
	 * and send back an OK with the sessionID
	 */
	socket.on('glassconnect', function(data) {
		client = 'Glass';
		sid = Math.floor(Math.random()*900000) + 100000;
		currentSessions[sid] = { glass: socket.id };
		socket.emit('connect', { status: 'ok', sessionID: sid });
		info(client, socket.id, sid, "session created")
	});

	/*
	 * Web Connection
	 * Find the provided SessionID in the current sessions, and add the web connection's
	 * socket ID to it.
	 */
	socket.on('webconnect', function(data) {
		client = 'Web'
		sid = data.id;
		info(client, socket.id, sid, "connecting");
		if(currentSessions[sid] == null) {
			socket.emit('error', { message: 'invalid sessionID'});
			error(client, socket.id, sid, "invalid sessionID");
		} else {
			currentSessions[sid][web] = socket.id;
			socket.emit('connect', { status: 'ok' });
			info(client, socket.id, sid, "connection successful");
		}
	});

	/*
	 * Disconnect
	 * Remove the socketID from the current session, and delete the session if it is empty
	 */
	socket.on('disconnect', function() {
		delete currentSessions[sid][client.toLowerCase()];
		if(Object.keys(currentSessions[sid]) === 0)
			delete currentSessions[sid];
		info(client, socket.id, sid, "disconneced");
	})
});

// Logging methods
var INFO = 2;
var ERROR = 1;
function info(client, socket, session, message) {
	if(log_level >= INFO)
		console.log("INFO: [" + client + "] [" + socket + "] [" + session + "] " + message)
}
function error(client, socket, session, message) {
	if(log_level >= ERROR)
		console.log("ERROR: [" + client + "] [" + socket + "] [" + session + "] " + message)
}