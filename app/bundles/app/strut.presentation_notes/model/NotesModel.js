define(['libs/backbone'],
function(Backbone) {
	return Backbone.Model.extend({
		initialize: function() {
			this.set("presentation_notes", []);
		},

		_addNote: function(index, content) {
			if(index < 0) return;
			found = false;
			this.get('presentation_notes').forEach(function(note) {
				if(note['index'] == index) {
					found = true
					note['content'] = content;
				}
			});
			if(!found) {
				note = {}
				note['index'] = index;
				note['content'] = content;
				this.get('presentation_notes').push(note);
			}
		},

		_getNote: function(index) {
			if(index < 0) return;
			content = null;
			this.get('presentation_notes').forEach(function(note) {
				if(note['index'] == index) {
					content = note['content'];
				}
			});
			return content;
		},

		import: function(rawObj) {
			this.set('presentation_notes', rawObj.presentation_notes);
		},

		constructor: function HeaderModel(registry, editorModel) {
			this.registry = registry;
			this._editorModel = editorModel;
			Backbone.Model.prototype.constructor.call(this);
		}
	});
});