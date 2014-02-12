define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: "modal hide",
		events: {
			'click .ok': '_okClicked',
			'click .disconnect': '_disconnect'
		},

		initialize: function() {
			this.editorModel = this.options.editorModel;
			delete this.options.editorModel;

			this._registry = this.editorModel.registry;
			this.socket = this._registry.getBest('strut.glass.socket');
			this.template = JST['strut.glass/ConnectModal'];
			this._title = null;
			this._state = false;
			this._error = false;
		},

		render: function() {
			this.$el.html(this.template({
				title: this._title,
				state: this._state,
				error: this._error
			}));
		},

		updateConnectionState: function(state, error) {
			this._state = state;
			this._error = error;
			this.render();
		},

		show: function(actionHandler, title) {
			this.actionHandler = actionHandler;
			this._title = title;
			this.render();
			this.$el.modal('show');
		},

		_okClicked: function() {
			// User has already connected
			if(this._state) {
				this.$el.modal('hide');
				return;
			}
			
			var gid = this.$el.find(".glassid").val();
			if(gid == '') {
				// session ID is empty; remove error message and close
				this.$el.modal('hide');
				this.updateConnectionState(false, false);
				return;
			}

			// Emit the session ID and set the socket's room
			this.$el.find(".glassid").val("");
			this.socket.emit('webconnect', { id: gid });
			this.socket.room = gid;
		},

		_disconnect: function() {
			this.socket.emit('leave', null);
		},

		constructor: function AbstractStorageModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});