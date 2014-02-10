define(['libs/backbone'],
function(Backbone) {
	return Backbone.Model.extend({
		initialize: function(editorModel) {
			this.set('socket', this.registry.get('strut.glass.socket'));
		},

		connect: function(options) {
			socket = editorModel.registry.get('strut.glass.socket');
			socket.emit('connect', { id: this.$el.find(".glassid").val() });
			socket.room = this.$el.find(".glassid").val();
		},

		constructor: function ActionHandlers(opts) {
			this._editorModel = opts.editorModel;
			Backbone.Model.prototype.constructor.call(this);
		}
	});
});