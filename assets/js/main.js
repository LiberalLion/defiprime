/*
	Phantom by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Touch?
			if (skel.vars.touch)
				$body.addClass('is-touch');

		// Forms.
			var $form = $('form');

			// Auto-resizing textareas.
				$form.find('textarea').each(function() {

					var $this = $(this),
						$wrapper = $('<div class="textarea-wrapper"></div>'),
						$submits = $this.find('input[type="submit"]');

					$this
						.wrap($wrapper)
						.attr('rows', 1)
						.css('overflow', 'hidden')
						.css('resize', 'none')
						.on('keydown', function(event) {

							if (event.keyCode == 13
							&&	event.ctrlKey) {

								event.preventDefault();
								event.stopPropagation();

								$(this).blur();

							}

						})
						.on('blur focus', function() {
							$this.val($.trim($this.val()));
						})
						.on('input blur focus --init', function() {

							$wrapper
								.css('height', $this.height());

							$this
								.css('height', 'auto')
								.css('height', $this.prop('scrollHeight') + 'px');

						})
						.on('keyup', function(event) {

							if (event.keyCode == 9)
								$this
									.select();

						})
						.triggerHandler('--init');

					// Fix.
						if (skel.vars.browser == 'ie'
						||	skel.vars.mobile)
							$this
								.css('max-height', '10em')
								.css('overflow-y', 'auto');

				});

			// Fix: Placeholder polyfill.
				$form.placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Menu.
			var $menu = $('#menu');

			$menu.wrapInner('<div class="inner"></div>');

			$menu._locked = false;

			$menu._lock = function() {

				if ($menu._locked)
					return false;

				$menu._locked = true;

				window.setTimeout(function() {
					$menu._locked = false;
				}, 350);

				return true;

			};

			$menu._show = function() {

				if ($menu._lock())
					$body.addClass('is-menu-visible');

			};

			$menu._hide = function() {

				if ($menu._lock())
					$body.removeClass('is-menu-visible');

			};

			$menu._toggle = function() {

				if ($menu._lock())
					$body.toggleClass('is-menu-visible');

			};

			$menu
				.appendTo($body)
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						if (href == '#menu')
							return;

						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				})
				.append('<a class="close" href="#menu">Close</a>');

			$body
				.on('click', 'a[href="#menu"]', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Toggle.
						$menu._toggle();

				})
				.on('click', function(event) {

					// Hide.
						$menu._hide();

				})
				.on('keydown', function(event) {

					// Hide on escape.
						if (event.keyCode == 27)
							$menu._hide();

        });
        
      $("#hamburger_menu").click(function (){
        $(".nav.nav--header").slideToggle('slow');
	  })
	});

	$(document).ready(function() {
		$(".tooltip").tooltipster({
			theme: ['tooltipster-customized'],
			functionPosition: function(instance, helper, data){
				var parent = $(helper.origin).closest(".asset_tool_card");
    
				//if content wider than container - put in inside
				if (data.size.width > parent.width()) {
					data.coord.left = parent.offset().left
					$(helper.tooltipClone).width(parent.width())
					var diffTop = $(helper.tooltipClone).height() - data.size.height;
					data.size.height = $(helper.tooltipClone).height();
					data.size.width = parent.width()
					data.coord.top -= diffTop;

					return data;
				}
    
				//if content go out of the left boundary - shift it inside
				if (data.coord.left < parent.offset().left) {
					data.coord.left = parent.offset().left

					return data;
				}

				//if content go out of the right boundary - shift it inside
				if (data.coord.left + $(helper.tooltipClone).width() - (parent.offset().left + parent.width()) > 0) {
					data.coord.left -= data.coord.left + $(helper.tooltipClone).width() - (parent.offset().left + parent.width());

					return data;
				}

				return data;
			}
    });


    $('.card_main_details p a').on('mouseover', function () {
      $(this).closest('.asset_tool_card').addClass('is-hover-link');
    }).on('mouseout', function () {
      $(this).closest('.asset_tool_card').removeClass('is-hover-link');
    });
    $('.card_main_details').on('mouseover', function () {
      $(this).closest('.asset_tool_card').addClass('is-hover');
    }).on('mouseout', function () {
      $(this).closest('.asset_tool_card').removeClass('is-hover');
    });
	});
	async function getTopicsAlpha() {
		const response = await fetch('https://alpha.defiprime.com/latest.json');
		const responseJson = await response.json();
		const latestAlpha = $(".latest_alpha");
		let innerHtml = ``;
		let color = ``;
		responseJson.topic_list.topics.forEach((item, index) => {
			color = index % 3 == 0 ? "orange" : index % 3 == 1 ? "cyan" : "violet";
			if (index < 6) {
				innerHtml += `<article class="latest_alpha_link recent-blog-color_${color}">
				<a href="https://alpha.defiprime.com/t/${item.slug}/${item.id}"  target="_blank">
					<h2>${item.title}</h2>
				</a>
			</article>`;
			}
		});
		latestAlpha.html(innerHtml);
	}
	getTopicsAlpha();

	$(".wrapper-buttons .period-button").on("click", function (e) {
		tablinks = document.getElementsByClassName("period-button");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}
		e.currentTarget.className += " active";
	});
})(jQuery);