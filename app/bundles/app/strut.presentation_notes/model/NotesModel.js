define(['libs/backbone'],
function(Backbone) {

	return Backbone.Model.extend({
		initialize: function() {
			//noop
		},

		constructor: function HeaderModel(registry, editorModel) {
			this.registry = registry;
			this._editorModel = editorModel;
			Backbone.Model.prototype.constructor.call(this);
		}
	});
});