// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

vars = getUrlVars();

if(vars['socket'] != null) {
	var socket = io.connect('http://dev.projectrobert.com:8080');
	this.socket.emit('webconnect', { id: vars['socket'] });
	$(document).keydown(function(e){
		if (e.keyCode >= 37 && e.keyCode <= 40) { 
			curslide = $('.active').attr('id').slice(-1) - 1;
			if(!isNaN(curslide))
				socket.emit('currentSlide', { slide : impress.curslide });
		}
	});
	socket.on('currentSlide', function (data) {
		console.log(data);
		impress().goto(data.slide);
	});
}