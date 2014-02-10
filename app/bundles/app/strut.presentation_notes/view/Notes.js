define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: 'presentation-notes',
		events: {
			'click .presentation-notes-toggle': 'toggle',
			'change .presentation-notes-content': 'update'
		},

		initialize: function() {
			this.editorModel = this.options.editorModel;
			delete this.options.editorModel;

			this._registry = this.editorModel.registry;
			this.socket = this._registry.getBest('strut.glass.socket');

			this.template = JST['strut.presentation_notes/Notes'];
		},

		render: function() {
			this.$el.html(this.template);
			this.$el.addClass('hiding');
			return this;
		},

		toggle: function() {
			if (this.$el.is('.hiding')) {
				this.$el.removeClass('hiding');
				this.$el.addClass('showing');
			} else {
				this.hide();
			}
		},

		hide: function() {
			this.$el.removeClass('showing');
			this.$el.addClass('hiding');
		},

		update: function() {
			note = this.$el.find("textarea").val();
			socket.emit('slideNotes', { slide: 1, notes: note});
		},

		constructor: function AbstractNotes() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});