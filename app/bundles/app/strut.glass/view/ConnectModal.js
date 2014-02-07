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
			this.state = false;
		},

		render: function() {
			this.$el.html(this.template({
				title: this._title,
				state: this.state
			}));
		},

		updateConnectionState: function(state) {
			this.state = state;
			this.render();
		},

		show: function(actionHandler, title) {
			this.actionHandler = actionHandler;
			this._title = title;
			this.render();
			this.$el.modal('show');
		},

		_okClicked: function() {
			var gid = this.$el.find(".glassid").val();
			this.$el.find(".glassid").val("");
			this.socket.emit('webconnect', { id: gid });
			this.$el.modal('hide');
		},

		_disconnect: function() {
			this.socket.emit('stop', { disconnect: true });
			this.state = false;
			this.render();
			this.$el.modal('hide');
		},

		constructor: function AbstractStorageModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});