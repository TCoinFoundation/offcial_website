(function($) {
	'use strict';
	jQuery(document).on('ready', function(){
		$(window).on('load', function() {
			$('.status').fadeOut();
			$('.preloader').delay(350).fadeOut('slow');
		});

		if ($(window).scrollTop() > 200) {
			$('.fixed-top').addClass('menu-bg');
		} else {
			$('.fixed-top').removeClass('menu-bg');
		}

		if (document.body.clientWidth > 768) {
			$(window).on('scroll', function() {
				if ( $(window).scrollTop() > 70 ) {
					$('.site-navigation, .header-white, .header').addClass('navbar-fixed');
				} else {
					$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
				}
			});
		} else {
			$('.site-navigation, .header-white, .header').removeClass('navbar-fixed');
		}

		jQuery("#home-slider").flexslider({
			directionNav: false,
			controlnav: true,
		});

		$('.counter_feature').on('inview', function(event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$(this).find('.counter-num').each(function () {
					var $this = $(this);
					$({ Counter: 0 }).animate({ Counter: $this.text() }, {
						duration: 2000,
						easing: 'swing',
						step: function () {
							$this.text(Math.ceil(this.Counter));
						}
					});
				});
				$(this).unbind('inview');
			}
		});

		// if (document.body.clientWidth > 640) {
		// 	$('#partner').slick({
		// 		infinite: true,
		// 		autoplay: true,
		// 		autoplaySpeed: 2000,
		// 		speed: 500,
	  //     draggable: true,
	  //     arrows: false,
	  //     dots: false,
	  //     focusOnSelect: true,
	  //     pauseOnHover: true,
		// 		fade: false,
		// 		zIndex: 1,
		// 		touchMove: true,
		// 		slidesToShow: 3,
		// 		slidesToScroll: 1
		// 	})
		// }

		$('#homeSliderBack').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 2000,
			speed: 3000,
			fade: true,
			draggable: false,
			arrows: false,
			dots: false,
			focusOnSelect: true,
			pauseOnHover: true,
			zIndex: 3,
			useCSS: true,
			touchMove: false,
			slidesToShow: 1,
			slidesToScroll: 1
		})
	});

	(function () {
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		} else {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true
			});
		}
	}());

	AOS.init();

})(jQuery);

$(function() {
	var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || false;
		var links = this.el.find('.link');
		links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
	}
	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();
			$next.slideToggle();
			$this.parent().toggleClass('open');
		if (!e.data.multiple) {
			$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
		};
	}
	var accordion = new Accordion($('#accordion'), false);

	function udLanguage(lang) {
		$.i18n.properties({
			name: 'strings',
			path: '/assets/i18n/',
			mode: 'map',
			language: lang,
			callback:function() {
				$("[data-name]").each(function(){
					var name = $(this).data('name')
					$(this).html($.i18n.map[name]);
				});
			}
		});
	}
	udLanguage(navigator.language)

	function developmentRoute() {
		if (navigator.language.indexOf('zh') != -1) {
			if (document.body.clientWidth > 760) {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWeb.png")
			} else {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWap.png")
			}
			$('#whitePaper').attr('href', 'http://oh3804si5.bkt.clouddn.com/TCoinWhite%20Paper.pdf')
		} else {
			if (document.body.clientWidth > 760) {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWeb.png")
			} else {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWap.png")
			}
			$('#whitePaper').attr('href', '')
		}
	}
	developmentRoute()
	if (navigator.language === 'en') {
		$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteEn.png")
	}

	$(".menuLanguage").on("click", function(e){
		var lang = e.target.dataset.language
		udLanguage(lang)
		if (lang === "en") {
			$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteEn.png")
		} else if (lang === "zh_CN" || lang === "zh_TW") {
			if (document.body.clientWidth > 760) {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWeb.png")
			} else {
				$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteWap.png")
			}
		}
	})
	$(".mouseoutLanguage").on("mouseover mouseout click", function(event) {
		event.preventDefault();
		if (event.type == "mouseover" || event.type == "touchstart"){
			$(".dropdown .dropdown-menu").css("display", "block")
		} else if (event.type == "mouseout"){
			$(".dropdown .dropdown-menu").css("display", "none")
		} else if (event.type == "click") {
			$(".dropdown .dropdown-menu").css("display", "none")
		}
	})

	var language = navigator.language
	$('#udLanguage').on('click', function() {
		language === 'en' ? navigator.language.indexOf('zh-CN') != -1 ? language = 'zh-CN' : language = 'zh-TW' : language = 'en'
		if (language === 'en') {
			$('.developmentRouteImg').attr("src", "/assets/images/developmentRouteEn.png")
		} else {
			developmentRoute()
		}
		udLanguage(language)
	})
});
