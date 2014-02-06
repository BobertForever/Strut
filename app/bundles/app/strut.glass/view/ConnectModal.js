define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: "modal hide",
		events: {
			'click .ok': '_okClicked'
		},

		initialize: function() {
			this.editorModel = this.options.editorModel;
			delete this.options.editorModel;

			this.template = JST['strut.glass/ConnectModal'];
		},

		title: function(title) {
			this.$el.find('.title').html(title);
		},

		render: function() {
			// Don't load the data for a provider until its tab is selected...
			this.$el.html(this.template({
				title: this.__title()
			}));
		},

		show: function(actionHandler, title) {
			this.actionHandler = actionHandler;
			this.title(title);
			this.$el.modal('show');
		},

		__title: function() { return 'none'; },

		_okClicked: function() {
			if (this.actionHandler) {
				var self = this;
				var gid = self.$el.find(".glassid").val();
				this.actionHandler({ session_id : gid });
				self.$el.modal('hide');
			}
		},

		constructor: function AbstractStorageModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});