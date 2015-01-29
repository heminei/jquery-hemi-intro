/*!
 * author: Heminei
 * site: https://github.com/heminei/jquery-hemi-intro
 * email: heminei@heminei.com
 * v1.0
 */
(function ($) {
	var pluginName = "hemiIntro";

	$[pluginName] = function (userOptions) {
		var plugin = this;

		var defaultOptions = {
			debug: false,
			steps: [],
			startFromStep: 0,
			backdrop: {
				element: $("<div>"),
				class: "hemi-intro-backdrop"
			},
			popover: {
				template: '<div class="popover hemi-intro-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
			},
			buttons: {
				holder: {
					element: $("<div>"),
					class: ""
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
			onBeforeChangeStep: function () {

			},
			onAfterChangeStep: function () {

			},
			onShowModalDialog: function (plugin, modal) {

			},
			onHideModalDialog: function (plugin, modal) {

			},
			onComplete: function (plugin) {

			}
		};

		plugin.options = $.extend(true, defaultOptions, userOptions);
		plugin.options.init(plugin); //CALLBACK

		var currentIndex = plugin.options.startFromStep;
		var currentElement = null;

		plugin.backdrop = plugin.options.backdrop.element.clone().addClass(plugin.options.backdrop.class);
		plugin.backdrop.appendTo("body");

		plugin.options.onLoad(plugin); //CALLBACK

		plugin.start = function () {
			if (plugin.options.welcomeDialog.show) {
				var modal = $(plugin.options.welcomeDialog.selector);
				modal.modal("show");
				modal.on('show.bs.modal', function (e) {
					plugin.options.onShowModalDialog(plugin, modal); //CALLBACK
				});
				modal.on('hidden.bs.modal', function (e) {
					plugin.options.onHideModalDialog(plugin, modal); //CALLBACK
					goToStep(currentIndex);
				});
			} else {
				goToStep(currentIndex);
			}
		};

		plugin.next = function () {
			goToStep(currentIndex + 1);
		};

		plugin.prev = function () {
			if (currentIndex - 1 < 0) {
				goToStep(currentIndex);
			} else {
				goToStep(currentIndex - 1);
			}
		};

		plugin.finish = function () {
			onFinish();
		};
		plugin.goToStep = function (index) {
			goToStep(index);
		};

		var goToStep = function (index) {
			if (plugin.options.steps[index]) {
				var step = plugin.options.steps[index];

				currentElement = $(step.selector);
				if (currentElement.length > 0) {
					currentIndex = index;
					plugin.options.onBeforeChangeStep(plugin); //CALLBACK

					currentElement.addClass(plugin.options.currentStep.selectedClass);
					scrollToElement(currentElement, function () {
						var template = $(plugin.options.popover.template);
						var uniq = "id" + Math.random().toString(30).slice(2);
						var buttonsHolder = plugin.options.buttons.holder.element.clone().addClass(plugin.options.buttons.holder.class);
						var button;
						if (plugin.options.steps[index + 1]) {
							button = plugin.options.buttons.next.element.clone();
							button.addClass(plugin.options.buttons.next.class).addClass(uniq);
							buttonsHolder.append(button);
						} else {
							button = plugin.options.buttons.finish.element.clone();
							button.addClass(plugin.options.buttons.finish.class).addClass(uniq);
							buttonsHolder.append(button);
						}

						var content = $("<div>").append(step.content).append(buttonsHolder.get(0).outerHTML);

						currentElement.popover({
							content: content.get(0).outerHTML,
							html: true,
							trigger: 'manual',
							placement: step.placement,
							template: template.get(0).outerHTML
						}).popover('show');

						currentElement.on('shown.bs.popover', function () {
							plugin.options.onAfterChangeStep(plugin); //CALLBACK
							$("." + uniq).on("click", function () {
								if (plugin.options.steps[index + 1]) {
									currentElement.removeClass(plugin.options.currentStep.selectedClass);
									currentElement.popover('destroy');
									plugin.next();
								} else {
									plugin.finish();
								}
							});
						});
					});
				} else {
					debugLog(pluginName + ":", "Step element not found: ", step);
				}
			} else {
				debugLog(pluginName + ":", "Step not found");
			}
		};


		var onFinish = function () {
			currentElement.removeClass(plugin.options.currentStep.selectedClass);
			currentElement.popover('destroy');
			plugin.backdrop.remove();
			plugin.options.onComplete(plugin); //CALLBACK
		};

		var scrollToElement = function (element, callback) {
			if (typeof callback != "function") {
				callback = $.noop();
			}
			$('html').animate({
				scrollTop: element.offset().top
			}, plugin.options.scroll.anmationSpeed, callback);
		};

		var debugLog = function () {
			if (plugin.options.debug) {
				console.log.apply(console, arguments);
			}
		}

		return plugin;
	};
})(jQuery);