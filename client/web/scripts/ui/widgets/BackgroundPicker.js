// Generated by CoffeeScript 1.2.1-pre

define(["vendor/backbone", "./Templates", "css!./res/css/BackgroundPicker.css"], function(Backbone, Templates, empty) {
  return Backbone.View.extend({
    className: "backgroundPicker modal",
    events: {
      "click .ok": "okClicked",
      "click [data-option]": "optionChosen"
    },
    initialize: function() {},
    show: function(cb, bgOpts) {
      this.$el.modal("show");
      if (bgOpts != null) this._updatePicker(bgOpts);
      return this.cb = cb;
    },
    _updatePicker: function(bgOpts) {
      return this.$gradientPicker.gradientPicker("update", bgOpts);
    },
    _updateGradientPreview: function(styles) {
      this.$gradientPreview.css("background-image", styles[0]);
      return this.$gradientPreview.css("background-image", styles[1]);
    },
    okClicked: function() {
      return this.cb(this.$gradientPicker.gradientPicker("currentState"));
    },
    optionChosen: function() {},
    render: function() {
      var bgOpts,
        _this = this;
      this.$el.html(Templates.BackgroundPicker());
      this.$el.modal();
      this.$gradientPicker = this.$el.find(".gradientPicker");
      this.$gradientPreview = this.$el.find(".gradientPreview");
      bgOpts = this.options.bgOpts || {};
      bgOpts.change = function(points, styles) {
        return _this._updateGradientPreview(styles);
      };
      this.$gradientPicker.gradientPicker(bgOpts);
      this.$el.modal("hide");
      return this.$el;
    }
  });
});