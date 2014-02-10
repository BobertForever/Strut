define(function() {
	'use strict';
	var launch = 0;

	function PreviewLauncher(editorModel) {
		this._editorModel = editorModel;
	};

	PreviewLauncher.prototype = {
		launch: function(generator) {
			if (window.previewWind)
				window.previewWind.close();

			this._editorModel.trigger('launch:preview', null);

			var socket = this._editorModel.registry.getBest('strut.glass.socket');

			var socketref = socket.room != null ? '?socket=' + socket.room : '';

			var previewStr = generator.generate(this._editorModel.deck());

			localStorage.setItem('preview-string', previewStr);
			localStorage.setItem('preview-config', JSON.stringify({
				surface: this._editorModel.deck().get('surface')
			}));

			window.previewWind = window.open(
				'preview_export/' + (generator.file || generator.id) + '.html' + generator.getSlideHash(this._editorModel) + socketref,
				window.location.href);
			var sourceWind = window;
		}
	};

	return PreviewLauncher;
});