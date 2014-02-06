define(['libs/backbone', 'css!styles/storage/storageModal.css'],
function(Backbone) {
	return Backbone.View.extend({
		className: "storageModal modal hide",
		events: {
			'click a[data-provider]': '_providerSelected',
			'click .ok': '_okClicked',
			'destroyed': 'dispose'
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
				title: this.__title(),
				tabs: ["Connect"]
			}));

			this._providerChanged();
			this.$el.find('.tabContent').append(this);
		},

		show: function(actionHandler, title) {
			this.actionHandler = actionHandler;
			this.title(title);
			this.$el.modal('show');
		},

		_providerChanged: function() {
			if (this.$lastProviderTab) {
				this.$lastProviderTab.removeClass('active');
			}

			this.$lastProviderTab = 
				this.$el.find('[data-provider="Glass"]').parent();

			this.$lastProviderTab.addClass('active');
		},

		__title: function() { return 'none'; },

		_okClicked: function() {
			if (this.actionHandler) {
				var self = this;
				this.actionHandler({ release: "True" });
				self.$el.modal('hide');
			}
		},

		_providerSelected: function(e) {
			// change the storage interface's selected
			// storage provider
			this.storageInterface.selectProvider(e.target.dataset.provider);
		},

		constructor: function AbstractStorageModal() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});