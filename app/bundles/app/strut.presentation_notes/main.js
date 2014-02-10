define(['./view/Notes',
		'lang'],
function(Notes,
		lang) {
	'use strict';

	var notes = null;
	
	var service = {
		Presentation_notes: function (editorModel) {
			if(notes == null) {
				notes = new Notes({
					editorModel: editorModel
				});
				notes.render();
			}
			return notes;
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
