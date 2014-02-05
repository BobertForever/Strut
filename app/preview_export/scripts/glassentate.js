var socket = io.connect('http://localhost:8080');
socket.on('slide', function (data) {
	console.log(data);
	impress().goto(data.slide);
});