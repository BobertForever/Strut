define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: 'presentation-notes',
		events: {
			'click .presentation-notes-toggle': '_toggle',
			'change .presentation-notes-content': '_update'
		},

		initialize: function() {
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

		constructor: function AbstractNotes() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});