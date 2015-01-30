jquery-hemi-intro
=========================

jQuery introduction (intro) plugin step by step.

Demo:
-----------

http://heminei.github.io/jquery-hemi-intro/demo/

Required:
-----------

Bootstrap (http://getbootstrap.com/)!

How to use:
-----------

```html
<link href="/src/jquery.hemiIntro-1.0.css" rel="stylesheet" type="text/css"/>
<script src="/src/jquery.hemiIntro-1.0.js" type="text/javascript"></script>
```

```javascript
$(function () {
	var intro = $.hemiIntro({
		steps: [
			{
				selector: ".nav-justified",
				placement: "bottom",
				content: "Text text text text text text text text text text",
			},
			{
				selector: ".jumbotron",
				placement: "bottom",
				content: "Text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2"
			},
		]
	});
	intro.start();
});
```

Options:
-----------
```javascript
$(function () {
	$.hemiIntro({
		debug: false,
		steps: [],
		startFromStep: 0,
		backdrop: {
			element: $("<div>"),
			class: "hemi-intro-backdrop"
		},
		popover: {
			template: '<div class="popover hemi-intro-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
		},
		buttons: {
			holder: {
				element: $("<div>"),
				class: "hemi-intro-buttons-holder"
			},
			next: {
				element: $("<button>Next</button>"),
				class: "btn btn-primary"
			},
			finish: {
				element: $("<button>Finish</button>"),
				class: "btn btn-primary"
			}
		},
		welcomeDialog: {
			show: false,
			selector: null
		},
		scroll: {
			anmationSpeed: 500
		},
		currentStep: {
			selectedClass: "hemi-intro-selected"
		},
		init: function (plugin) {

		},
		onLoad: function (plugin) {

		},
		onStart: function (plugin) {

		},
		onBeforeChangeStep: function (plugin) {

		},
		onAfterChangeStep: function (plugin) {

		},
		onShowModalDialog: function (plugin, modal) {

		},
		onHideModalDialog: function (plugin, modal) {

		},
		onComplete: function (plugin) {

		}
	});
});
```
