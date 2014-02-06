define(['./view/ConnectModal',
		'./model/ActionHandlers',
		'tantaman/web/widgets/MenuItem',
		'lang'],
function(ConnectModal,
		ActionHandlers,
		MenuItem,
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

			menuItems.push(new MenuItem({ title: "Connect Glass", modal: connectModal, handler: ActionHandlers.connect }));

			menuItems.push({
				$el: $('<li class="divider"></li>'),
				render: function() { return this; }
			});

			return menuItems;
		}
	};

	return {
		initialize: function(registry) {
			registry.register({
				interfaces: 'strut.LogoMenuItemProvider'
			}, service);
		}
	}
});
