define(['./view/ConnectModal',
		'tantaman/web/widgets/MenuItem',
		'http://dev.projectrobert.com:8080/socket.io/socket.io.js',
		'lang'],
function(ConnectModal,
		MenuItem,
		Socket,
		lang) {
	'use strict';

	var connectModal = null;
	var $modals = $('#modals');
	
	var service = {
		createMenuItems: function(editorModel) {
			var menuItems = [];

			if (connectModal == null) {
				connectModal = new ConnectModal({
					editorModel: editorModel,
				});
				connectModal.render();
				$modals.append(connectModal.$el);
			}

			menuItems.push(new MenuItem({ title: "Connect Glass", modal: connectModal }));

			menuItems.push({
				$el: $('<li class="divider"></li>'),
				render: function() { return this; }
			});

			return menuItems;
		}
	};

	var createSocket = function() {
		var socket = io.connect('http://localhost:8080');
		socket.on('connect', function(data) {
			if(data.status != null && data.status == "connected")
				connectModal.updateConnectionState(true);
			else if(data.status != null && data.status == "disconnected")
				connectModal.updateConnectionState(false);
		});
		return socket;
	}

	return {
		initialize: function(registry) {
			registry.register({
				interfaces: 'strut.LogoMenuItemProvider'
			}, service);

			var socket = createSocket();
			registry.register({
				interfaces: 'strut.glass.socket'
			}, socket);
		}
	}
});
