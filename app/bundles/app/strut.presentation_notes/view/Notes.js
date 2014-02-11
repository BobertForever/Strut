define(['libs/backbone'],
function(Backbone) {
	return Backbone.View.extend({
		className: 'presentation-notes',
		events: {
			'click .presentation-notes-toggle': 'toggle',
			'change .presentation-notes-content': 'update'
		},

		initialize: function() {
			this._editorModel = this.model._editorModel;
			this.socket = this.model.registry.getBest('strut.glass.socket');
			this.template = JST['strut.presentation_notes/Notes'];
			this.slideindex = this._editorModel.activeSlideIndex();
			this._editorModel._deck.on('change:activeSlide', this.change, this);
			this._isready = false;
			$( document ).ready(this.canupdate);
		},

		render: function() {
			this.$el.html(this.template);
			this.$el.addClass('hiding');
			return this;
		},

		canupdate: function() {
			this._isready = true;
		},

		toggle: function() {
			if (this.$el.is('.hiding')) {
				this.$el.removeClass('hiding');
				this.$el.addClass('showing');
				this.$el.find("textarea").val(this.model._getNote(this.slideindex));
			} else {
				this.hide();
			}
		},

		hide: function() {
			this.$el.removeClass('showing');
			this.$el.addClass('hiding');
		},

		update: function() {
			this.slideindex = this._editorModel.activeSlideIndex();
			note = this.$el.find("textarea").val();
			if(this.socket.room != null) {
				this.socket.emit('slideNotes', { slide: this.slideindex, notes: note});
			}
			this.model._addNote(this.slideindex, note);
		},

		change: function() {
			note = this.$el.find("textarea").val();
			if(this.socket.room != null) {
				this.socket.emit('slideNotes', { slide: this.slideindex, notes: note});
			}
			if(this._isready) this.model._addNote(this.slideindex, note);
			this.slideindex = this._editorModel.activeSlideIndex();
			this.$el.find("textarea").val(this.model._getNote(this.slideindex));
		},

		constructor: function AbstractNotes() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});