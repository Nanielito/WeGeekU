var setCookie = function(cname, cvalue) {
    document.cookie = cname + "=" + cvalue;
    return false;
}

var getCookie = function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return '';
}

$(document).ready(function($) {
    'use strict';

    var cookie = getCookie('i18next');
    var lng = (cookie != '' ? cookie : navigator.language || navigator.userLanguage);
    
    if ((/^es-\d+$/).test(lng)) lng = 'es';
    else if ((/^en-\d+$/).test(lng)) lng = 'en';
    
    var option = {
        lng: lng,
        useCookie: true,
        resGetPath: 'resources/locales/__lng__/__ns__.json',
        fallbacking: 'es'
    };
    
    $.i18n.init(option, function() {
        $('[id$="_section"]').i18n();
        return false;
    });
    
    $('.language input').on('click', function() {
        switch ($(this).attr('class')) {
            case 'spanish': lng = 'es'; break;
            case 'english': lng = 'en'; break;
            default       : lng = 'es';
        }
        
        setCookie("i18next", lng);
        window.location.reload();
        return false;
    });

/*=================================
||			add/remove Class
==================================*/
	var changeStyle = $('.navigationbar');
    var top = $('.top');
	function scroll() {
		if ($(window).scrollTop() > 700) {
			changeStyle.addClass('modified');
            top.addClass('show-top');

		}
        else {
			changeStyle.removeClass('modified');
            top.removeClass('show-top');
		}
        return false;
	}

	document.onscroll = scroll;

/*=================================
||			hide/show
==================================*/

	$('#iconhideshow').click(function(){
	    $(this).toggleClass('fa-bars fa-times-circle');
	    $('.nav').toggleClass('hide show');
        return false;
	});
/*=================================
||			Radial Progressive Bar
==================================*/
	setTimeout(function(){
        $('.demo-4').percentcircle({
            animate : true,
            diameter : 100,
            guage: 3,
            coverBg: 'rgb(48, 43, 56)',
            bgColor: '#e64e4e',
            fillColor: '#1EBDB9',
            percentSize: '18px',
            percentWeight: 'normal'
        });
    }, 50);

/*=================================
||			Owl Carousel
==================================*/
    $('#owl-demo').owlCarousel({
        navigation : false, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem: true,
        autoPlay: true,

        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });
/*=================================
||          Nivo-lightbox
==================================*/

    $('.portfolio-item').nivoLightbox({
        effect: 'fade',                             // The effect to use when showing the lightbox
        theme: 'default',                             // The lightbox theme to use
        keyboardNav: true,                             // Enable/Disable keyboard navigation (left/right/escape)
        clickOverlayToClose: true,                    // If false clicking the "close" button will be the only way to close the lightbox
        onInit: function(){},                         // Callback when lightbox has loaded
        beforeShowLightbox: function(){},             // Callback before the lightbox is shown
        afterShowLightbox: function(lightbox){},     // Callback after the lightbox is shown
        beforeHideLightbox: function(){},             // Callback before the lightbox is hidden
        afterHideLightbox: function(){},             // Callback after the lightbox is hidden
        onPrev: function(element){},                 // Callback when the lightbox gallery goes to previous item
        onNext: function(element){},                 // Callback when the lightbox gallery goes to next item
        errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
    });

/*=================================
||			Isotope
==================================*/

	// init Isotope
	var $container = $('#works_container').isotope({
	  // options
      itemSelector: '.works-single-item'
	});

	// filter items on button click
	$('#filters').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        $container.isotope({ filter: filterValue });
        return false;
	});

/*=================================
||          Isotope
==================================*/
    //$(document).on('change', 'select#lang', function(){
    //     window.location.assign("/"+$(this).find('option:selected').attr('id'))
    //});

    //var lenguaje = (/[a-zA-Z\s]*$/).exec((/\d+\/\w+/g).exec(window.location.href))[0];
    //if (lenguaje == 'null') lenguaje = 'es';
    //$(document).find('select#lang option#'+lenguaje).attr('selected', true);

    $('#works_container').removeAttr('style')
    $('#works_container').attr('style', 'height:217px;position:relative')
}); //(document).ready(function() closed
/*=================================
||			WOW
==================================*/
wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
});
wow.init();

/*=================================
||			Smooth Scrooling
==================================*/
$(function() {
    'use strict';
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                	scrollTop: (target.offset().top - 62)//top navigation height
                }, 1000);
                return false;
            }
        }
    });
});

	
/*=================================
||			Contact form
==================================*/

jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
    }, 'type the correct answer -_-');

// validate contact form
$(function() {
    $('#contact').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            },
            answer: {
                required: true,
                answercheck: true
            }
        },
        messages: {
            name: {
                required: 'come on, you have a name don\'t you?',
                minlength: 'your name must consist of at least 2 characters'
            },
            email: {
                required: 'no email, no message'
            },
            message: {
                required: 'um...yea, you have to write something to send this form.',
                minlength: 'thats all? really?'
            },
            answer: {
                required:'sorry, wrong answer!'
            }
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:'POST',
                data: $(form).serialize(),
                url:'contact.php',
                success: function() {
                    $('#contact :input').attr('disabled', 'disabled');
                    $('#contact').fadeTo( "slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success').fadeIn();
                    });
                },
                error: function() {
                    $('#contact').fadeTo( 'slow', 0.15, function() {
                        $('#error').fadeIn();
                    });
                }
            });
        }
    });
});
