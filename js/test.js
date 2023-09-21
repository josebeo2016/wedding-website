;(function () {
	'use strict';

	$(window).on('load', function() {
		$('.loader').delay(600).fadeOut('slow');
		setTimeout(function() {
			$('.cover .display-tc').addClass('fadeInUp');
		}, 800);
		
	});

    if ($("#donate-modal").length && $(".buttonDonate").length  && $(".donate-modal-close").length) {
		$(document).on('click','.buttonDonate',function(){
			$("#donate-modal").show();
		});
		$(document).on('click','.donate-modal-close',function(){
			$("#donate-modal").hide();
		});
		$(document).on('click','body',function(e){
			if(e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
		});
	}
	
	$(document).on('click', '#donate-modal .crypto-item', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').show();
		parent.find('.cryptos-box-view .coin-img').html('<img src="'+$(this).data('img')+'" />');
		parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
		parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
		parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({width: 160,height: 160,text: $(this).data('address')});
	});
	
	$(document).on('click', '#donate-modal .cryptos-box-view-close', function(){
		let parent = $(this).parents('.donate-card');
		parent.find('.cryptos-box-view').hide();
	});

	// Form
	var contactForm = function() {
		(function ($, window, document, undefined) {
		var $form = $('#contact-form');
		$form.submit(function (e) {
			// remove the error class
			$('.form-group').removeClass('has-error');
			$('.help-block').remove();
			var guestsList = [];
			$('.guest-list input').each(function() {
				guestsList.push(this.value);
			});
			// get the form data
			var formData = {
				'name' : $('input[name="form-name"]').val(),
				'email' : $('input[name="form-email"]').val(),
				'attending': $('.switch-field input[type="radio"]:checked').attr('id'),
				'guest': guestsList.join(', ')
			};
			// process the form
			$.ajax({
				type : 'POST',
				url  : 'form.php',
				data : formData,
				dataType : 'json',
				encode : true
			}).done(function (data) {
				// handle errors
				if (!data.success) {
					if (data.errors.name) {
						$('#name-field').addClass('has-error');
						$('#name-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.name + '</span>');
					}
					if (data.errors.email) {
						$('#email-field').addClass('has-error');
						$('#email-field').find('.col-sm-6').append('<span class="help-block">' + data.errors.email + '</span>');
					}
				} else {
					// display success message
					$form.html('<div class="message-success">' + data.message + '</div>');
				}
			}).fail(function (data) {
				// for debug
				// console.log(data);
			});
			e.preventDefault();
		});
	}(jQuery, window, document));
	}

	// Offcanvas
	var offcanvasMenu = function() {
		$('.main').prepend('<div id="offcanvas" />');
		$('.main').prepend('<a href="#" class="js-nav-toggle nav-toggle nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#offcanvas').append(clone2);

		$('#offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		$(window).on('resize', function() {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('.js-nav-toggle').removeClass('active');
			}
		});
	};

	// Page scroll
	var pageScroll = function() {
		$('body').on('click touch', '.page-scroll', function(event) {
			var $anchor = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$('.js-nav-toggle').toggleClass('active');
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('nav').affix({
			offset: {
				top: $('#header').height()
			}
		});
	};

	// Mobile menu
	var mobileMenuOutsideClick = function() {
		$(document).on('click', function (e) {
		var container = $("#offcanvas, .js-nav-toggle");
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			if ( $('body').hasClass('offcanvas') ) {
				$('body').removeClass('offcanvas');
				$('.js-nav-toggle').removeClass('active');
			}
		}
		});
	};

	// // Burgermenu
	var burgerMenu = function() {
		$('body').on('click', '.js-nav-toggle', function(event){
			var $this = $(this);
			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();
		});
	};

	// Content way point
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {
			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				i++;
				$(this.element).addClass('item-animate');
				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}
							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo' );
					});
				}, 100);
			}
		} , { offset: '85%' } );
	};

	// Dropdown
	var dropdown = function() {
		$('.has-dropdown').mouseenter(function(){
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');
		}).mouseleave(function(){
			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});
	};

	// Testimonials
	var testimonialCarousel = function(){
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	// Counter
	var counter = function() {
		$('.js-counter').countTo({
			formatter: function (value, options) {
			return value.toFixed(options.decimals);
		},
		});
	};

	var counterWayPoint = function() {
		if ($('#counter').length > 0 ) {
			$('#counter').waypoint( function( direction ) {
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	if ($("#clock").length) {
        function timeElapse(date){
            var current = Date();
            var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
            var days = Math.floor(seconds / (3600 * 24));
            if (days < 10) {
                days = "0" + days;
            }
            seconds = seconds % (3600 * 24);
            var hours = Math.floor(seconds / 3600);
            if (hours < 10) {
                hours = "0" + hours;
            }
            seconds = seconds % 3600;
            var minutes = Math.floor(seconds / 60);
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            seconds = seconds % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
			var html = '<div class="timer-item"><div><span class="days digit">' + days + '</span> <div class="smalltext">'+ $('#clock').data('text-day') +'</div></div></div><div class="timer-item"><div><span class="hours digit">' + hours + '</span> <div class="smalltext">'+ $('#clock').data('text-hour') +'</div></div></div><div class="timer-item"><div><span class="minutes digit">' + minutes + '</span> <div class="smalltext">'+ $('#clock').data('text-minute') +'</div></div></div><div class="timer-item"><div><span class="seconds digit">' + seconds + '</span> <div class="smalltext">'+ $('#clock').data('text-second') +'</div></div></div>';
            $('#clock').html(html);
        }

        $('#clock').countdown($('#clock').data('date'), function(event) {
            if(event.type == 'stoped'){
                var together = new Date($('#clock').data('date'));           
                together.setHours(0);                           
                together.setMinutes(0);             
                together.setSeconds(0);                 
                together.setMilliseconds(0);
                setInterval(function() {
                    timeElapse(together);
                }, 1000);
            }else{
               var $this = $(this).html(event.strftime(''
                + '<div class="timer-item"><div><span class="days digit">%D</span> <div class="smalltext">'+ $('#clock').data('text-day') +'</div></div></div>'
                + '<div class="timer-item"><div><span class="hours digit">%H</span> <div class="smalltext">'+ $('#clock').data('text-hour') +'</div></div></div>'
                + '<div class="timer-item"><div><span class="minutes digit">%M</span> <div class="smalltext">'+ $('#clock').data('text-minute') +'</div></div></div>'
                + '<div class="timer-item"><div><span class="seconds digit">%S</span> <div class="smalltext">'+ $('#clock').data('text-second') +'</div></div></div>'));
            }
        });
    }
    
    
    if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            messages: {
                name: {
                    required: 'Vui lòng nhập tên của bạn.',
                    minlength: 'Tên phải lớn hơn 5 ký tự.',
                },
                content: {
                    required: 'Vui lòng nhập lời chúc.',
                    minlength: 'Lời chúc phải lớn hơn 10 ký tự.',
                },
                email: {
                    email: 'Địa chỉ email không hợp lệ.'
                }
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "/wish",
                    data: $(form).serialize(),
                    success: function (res) {
                        $( "#loader").hide();
                        if(!res.error){
                            $('.wish-box').scrollTop(0);
                            $('.wish-box').prepend('<div class="wish-box-item bg"><strong>'+$(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</strong><p>'+$(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")+'</p></div>');
                            $( "#success").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 5000);
                        }else{
                            $( "#error").html(res.message).slideDown( "slow" );
                            setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }

	// Form
	function filledLabels() {
		var inputFields = $('.control-label').next();
		inputFields.each(function(){
			var singleInput = $(this);
			singleInput.on('focus blur', function(event){
				checkVal(singleInput);
			});
		});
	}

	function checkVal(inputField) {
		if (inputField.val() === '') {
			if (event.type === "focus") {
				inputField.prev('.control-label').addClass('filled')
			} else if (event.type === "blur") {
				inputField.prev('.control-label').removeClass('filled')
			}
		}
	}

	function addGuest() {
		var addBtn = $('.add-button');
		var guestInput = $('#form-guest-name');
		var guestList = $('.guest-list');

		addBtn.on('click', function() {
			event.preventDefault(); 
			var guestVal = guestInput.val();
			var appendString = '<div><input class="form-control" type="text" value="'+guestVal+'"/><a href="#" class="remove_field"><i class="fa fa-trash"></i></a></div>';
			if (guestVal == '') {
				guestInput.focus();
			} else {
				guestList.append(appendString);
				guestInput.val('');
			}
		});

		$('.guest-list').on('click', '.remove_field', function(e){
			e.preventDefault();
			$(this).parent('div').remove();
		});
	}

	var collapseEvents = function() {
		$('#accordion').on('show.bs.collapse hide.bs.collapse', function (e) {
			var elemId = $(e.target).attr('id') + '0';

			$('#accordion-img .collapse').collapse('hide');
			$('#'+elemId).collapse('toggle');
		});
	}

	var singlePost = function() {
		var hightLight = $('.post-hightlight');

		if ($('p').is('.post-hightlight')) {
			hightLight.prev().addClass('post-hightlight--before');
			hightLight.next().addClass('clearfix');
		}
	}

	var isotope = function() {
		var $container = $('.grid');

		$container.imagesLoaded( function() {
			$container.isotope({
				// options
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					// use element for option
					columnWidth: '.grid-sizer',
				},
				getSortData: {
					moments: '.moments', // text from querySelector
					category: '[data-category]',
					weight: function( itemElem ) { // function
						var weight = $( itemElem ).find('.weight').text();
						return parseFloat( weight.replace( /[\(\)]/g, '') );
					}
				}
			});
		})
		
		// filter functions
		var filterFns = {
			// show if number is greater than 50
			numberGreaterThan50: function() {
			var number = $(this).find('.number').text();
			return parseInt( number, 10 ) > 50;
			},
			// show if name ends with -ium
			ium: function() {
			var name = $(this).find('.name').text();
			return name.match( /ium$/ );
			}
		};
		// bind filter button click
		$('.filters-button-group').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			// use filterFn if matches value
			filterValue = filterFns[ filterValue ] || filterValue;
			$container.isotope({ filter: filterValue });
		});
		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
			});
		});
	}

	/*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/
    if ($(".video-play-btn").length) {
        $(".video-play-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });
    }

	$(function(){
		pageScroll();
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		counter();
		counterWayPoint();
		filledLabels();
		addGuest();
		collapseEvents();
		singlePost();
		isotope();
		contactForm();
	});

}());