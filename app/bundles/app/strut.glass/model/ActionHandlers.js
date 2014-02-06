define(['http://localhost:8080/socket.io/socket.io.js'],
function(Socket) {
	return {
		connect: function(options) {
			var socket = io.connect('http://localhost:8080');
			socket.on('slide', function (data) {
				console.log(data);
				socket.emit('data', { my: options.release });
			});
		}
	};
});