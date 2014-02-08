define(['./view/Notes',
		'lang'],
function(Notes,
		lang) {
	'use strict';
	
	var service = {
		Presentation_notes: function (editorModel) {
			this._notes = new Notes();
			return this._notes.$el;
		}
	};

	return {
		initialize: function(registry) {
			registry.register({
				interfaces: 'strut.presentation_notes'
			}, service);
		}
	}
});
