(function ($) {
    "use strict";
    
    
    /*====== SidebarSearch ======*/
    function sidebarSearch() {
        var searchTrigger = $('.search-active'),
            endTriggersearch = $('.search-close'),
            container = $('.main-search-active');
        
        searchTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('search-visible');
        });
        
        endTriggersearch.on('click', function() {
            container.removeClass('search-visible');
        });
        
    };
    sidebarSearch();
    
    /*====== SidebarCart ======*/
    function miniCart() {
        var navbarTrigger = $('.cart-active'),
            endTrigger = $('.cart-close'),
            container = $('.sidebar-cart-active'),
            wrapper2 = $('.main-wrapper');
        
        wrapper2.prepend('<div class="body-overlay"></div>');
        
        navbarTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('inside');
            wrapper2.addClass('overlay-active');
        });
        
        endTrigger.on('click', function() {
            container.removeClass('inside');
            wrapper2.removeClass('overlay-active');
        });
        
        $('.body-overlay').on('click', function() {
            container.removeClass('inside');
            wrapper2.removeClass('overlay-active');
        });
    };
    miniCart();
    
    /*====== QuickInfo ======*/
    function quickInfo() {
        var searchTrigger = $('.header-aside-button'),
            endTriggersearch = $('.aside-close'),
            container = $('.header-aside-active');
        searchTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('inside');
        });
        endTriggersearch.on('click', function() {
            container.removeClass('inside');
        });
    };
    quickInfo();
    
    /*====== Category menu ======*/
    function categoryMenu() {
        var searchTrigger = $('.grid-active'),
            endTriggersearch = $('.category-menu-close'),
            container = $('.category-menu-active');
        searchTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('inside');
        });
        endTriggersearch.on('click', function() {
            container.removeClass('inside');
        });
    };
    categoryMenu();
    
    /*-------- Main slider active --------*/
    $('.main-slider-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        dotsData: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    /*------- Main slider active 2 ----------*/
    $('.main-slider-active-2').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    /*------ Main slider active 3 -----------*/
    $('.main-slider-active-3').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    
    /*------ Main slider active 4 -----*/
    $('.main-slider-active-4').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        dotsData: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    /*-------------------------------
        Product slider active
    -----------------------------------*/
    $('.product-slider-active').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        fade: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        responsive: [{
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    /*--------------------------------
        Product slider active 3
    -----------------------------------*/
    $('.product-slider-active-3').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        fade: false,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        prevArrow: '<span class="slider-icon slider-prev"><i class="dlicon arrows-1_small-triangle-left"></i></span>',
        nextArrow: '<span class="slider-icon slider-next"><i class="dlicon arrows-1_small-triangle-right"></i></span>',
        responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    /*--------------------------------
        Banner slider active
    -----------------------------------*/
    $('.banner-slider-active').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        fade: false,
        arrows: true,
        centerMode: true,
        centerPadding: '0',
        prevArrow: '<span class="banner-slider-icon slider-prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="banner-slider-icon slider-next"><i class="fa fa-angle-right"></i></span>',
        responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                }
            }
        ]
    });
    
    /*--------------------------------
        Product slider active 5
    -----------------------------------*/
    $('.product-slider-active-5').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: false,
        arrows: true,
        centerMode: true,
        centerPadding: '438px',
        prevArrow: '<span class="product-slider-icon slider-prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="product-slider-icon slider-next"><i class="fa fa-angle-right"></i></span>',
        responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '300px',
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '200px',
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    });
    
    /*-------------------------------
        Product slider active 4
    -----------------------------------*/
    $('.product-slider-active-4').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        fade: false,
        arrows: true,
        centerMode: true,
        centerPadding: '375px',
        prevArrow: '<span class="slider-icon pro-slider-4 slider-prev"><i class="dlicon arrows-1_small-triangle-left"></i></span>',
        nextArrow: '<span class="slider-icon pro-slider-4 slider-next"><i class="dlicon arrows-1_small-triangle-right"></i></span>',
        responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '200px',
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: '150px',
                }
            },
            {
                breakpoint: 991,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            },
            {
                breakpoint: 320,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    });
    
    /*---------------------
        Countdown
      --------------------- */
    $('.timer [data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<span class="cdown day"> <span>%-D </span><p>Days</p></span> <span class="cdown hour"> <span> %-H</span> <p>Hours</p></span> <span class="cdown minutes"><span>%M</span> <p>Minutes</p></span class="cdown second"> <span> <span>%S</span> <p>Seconds</p></span>'));
        });
    });
    
    /*------- View demo active -----------*/
    var moreDemo = $('.view-demo-btn-active');
    moreDemo.on('click', function(e) {
        e.preventDefault();
        $('.view-demo-area').toggleClass('demo-visible');
    })
    
    /*----------------
        ScrollUp
    ------------------ */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
    
    /*------- Quickview slider active -------*/
    $('.quickview-slider-active').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="dlicon arrows-1_tail-left"></i>', '<i class="dlicon arrows-1_tail-right"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    /*------- Featured slider active -------*/
    $('.featured-slider-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 2,
        margin:20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            }
        }
    })
    
    /*------- Featured slider active 2 --------*/
    $('.featured-slider-active-2').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 3,
        margin:30,
        navText: ['<i class="dlicon arrows-1_small-triangle-left"></i>', '<i class="dlicon arrows-1_small-triangle-right"></i>'],
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    })
    
    /*----------------------------
    	Cart Plus Minus Button
    ------------------------------ */
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });
    
    /*-------------------
        Magnific Popup
    ------------------------*/
    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
    
    /*---------------------
        Video popup
    --------------------- */
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });
    
    /*---------------------
        Mobile menu
    --------------------- */
    var $offCanvasNav = $('.mobile-menu , .final-clickable-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.dropdown');
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });
    
    /*--- Language currency active ----*/
    $('.mobile-language-active').on('click', function(e) {
        e.preventDefault();
        $('.lang-dropdown-active').slideToggle(900);
    });
    $('.mobile-currency-active').on('click', function(e) {
        e.preventDefault();
        $('.curr-dropdown-active').slideToggle(900);
    });
    $('.mobile-account-active').on('click', function(e) {
        e.preventDefault();
        $('.account-dropdown-active').slideToggle(900);
    });
    
    /*----- Categories active active -----*/
    $('.categories-slider-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 3,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
    
    /*----- Product slider active 2 -----*/
    $('.product-slider-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 4,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2,
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    })
    
    /*----- Testimonial active -----*/
    $('.testimonial-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
        }
    })
    
    /*----- Banner slider active 2 -----*/
    $('.banner-slider-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 3,
        margin:20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2,
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
        }
    })
    
    /*----- Banner slider active 3 -----*/
    $('.banner-slider-active-3').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
        }
    })
    
    /*----- Banner slider active 4 -----*/
    $('.banner-slider-active-4').owlCarousel({
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="dlicon arrows-1_tail-right"></i>', '<i class="dlicon arrows-1_tail-left"></i>' ],
        item: 4,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1,
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
        }
    })
    
    /*----- Categories slider active 2 -----*/
    $('.categories-slider-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 8,
        margin:85,
        responsive: {
            0: {
                items: 2,
                margin:30,
            },
            576: {
                items: 2,
                margin:30,
            },
            768: {
                items: 4,
                margin:30,
            },
            992: {
                items: 5,
                margin:30,
            },
            1200: {
                items: 6,
                margin:50,
            },
            1601: {
                items: 8
            },
        }
    })
    
    /*--
    instafeed
    -----------------------------------*/
    // User Changeable Access
    var activeId = $("#instafeed"),
    limit = activeId.data("limit"),
        myTemplate = '<div class="single-instafeed"><a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a></div>';
    if (activeId.length) {
        var accessTokenID = "IGQVJWLXU1Ri1JbjE0RlhlRmVZAMy1mRllxUzJWZAG5najYxWUxLcGl1SV80UHNiN2ZAaUFdHTVllMEh6YjRucTZAIY09TQlowdGlScG9taHhWNHJwaXQzOVZAwUDdsZAHdqTjhTcHB5ZA2I5QWRVZAVZAtYjZA2SgZDZD",
            userFeed = new Instafeed({
                accessToken: accessTokenID,
                template: myTemplate,
                limit: limit,
            });
        userFeed.run();
    }
    
    /* Notification */
    $('.notification-close button').on('click', function() {
        $('.notification-section').slideUp();
    });
    
    /* Jarallax active  */
    $('.jarallax').jarallax({
        speed: 0.6,
    });
    
    /* Jarallax active 2  */
    $('.jarallax-2').jarallax({
        speed: 0.1,
        imgPosition: '5% calc(8% + 0)',
        imgSize: 'auto',
    });
    
    /*====== ClickableMainmenu active ======*/
    function clickableMainmenu() {
        var searchTrigger = $('.clickable-mainmenu-button'),
            endTriggersearch = $('.mainmenu-close'),
            container = $('.clickable-mainmenu-active');
        searchTrigger.on('click', function(e) {
            e.preventDefault();
            container.addClass('mainmenu-visible');
        });
        endTriggersearch.on('click', function() {
            container.removeClass('mainmenu-visible');
        });
    };
    clickableMainmenu();
    
    var $clickableMainMenu = $('.clickable-mainmenu-wrap'),
        $clickableSubMenu = $clickableMainMenu.find('.sub-menu'),
        $clickableSubMenu2 = $clickableMainMenu.find('.sub-menu-2');
    /*Add Toggle Button in Off Canvas Sub Menu*/
    $clickableSubMenu.siblings('a').append('<span class="menu-expand"><i class="fa fa-chevron-down"></i></span>');
    $clickableSubMenu2.siblings('a').append('<span class="menu-expand"><i class="fa fa-chevron-down"></i></span>');
    
    /*Close Off Canvas Sub Menu*/
    $clickableSubMenu.find('.sub-menu').slideUp();
    $clickableSubMenu2.slideUp();
    
    /*Category Sub Menu Toggle*/
    $clickableMainMenu.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ($this.parent('li').hasClass('has-sub-menu') || ($this.attr('href') === '#' || $this.hasClass('menu-expand'))) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length) {
                $this.parent('li').removeClass('active').children('ul').slideUp().siblings('a').find('.menu-expand i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            } else {
                $this.parent('li').addClass('active').children('ul').slideDown().siblings('a').find('.menu-expand i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                $this.parent('li').siblings('li').removeClass('active').find('ul:visible').slideUp().siblings('a').find('.menu-expand i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        }
    });
    
    /* Tilt active */
    $('.tilt-active').tilt({
        maxTilt: 10,
        perspective: 1000,
        easing: 'cubic-bezier(.03,.98,.52,.99)',
        speed: 1200,
        glare: true,
        maxGlare: 0.4,
        scale: 1
    });
    
    // Isotope active
    $('.grid').imagesLoaded(function() {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });
    });
    
    /*--------------------------
        Masonry active
    ---------------------------- */
    $('.grid-2').imagesLoaded(function() {
        // init Isotope
        $('.grid-2').isotope({
            itemSelector: '.grid-item-2',
            percentPosition: true,
            layoutMode: 'masonry',
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item-2',
            }
        });
    });
    
    // Clickalbe menu active
    function clickMenu2() {
        var trigger = $('.menu-active-15'),
            container = $('.menu-active-15'),
            container2 = $('.clickalbe-menu15-active');
        trigger.on('click', function(e) {
            e.preventDefault();
            container.toggleClass('open');
            container2.toggleClass('open');
            $('body').toggleClass('body-menu-overlay');
        })
    }
    clickMenu2();
    $('body').on('click', function(e) {
        var $target = e.target;
        // Mobile Menu Close
        if (!$($target).is('.header-sidebar-wrap-all3, .clickalbe-menu15-active') && !$($target).parents().is('.header-sidebar-wrap-all3, .clickalbe-menu15-active')) {
            $('.menu-active-15').removeClass('open');
            $('.clickalbe-menu15-active').removeClass('open');
            $('body').removeClass('body-menu-overlay');
        }
    });
    
    // Full page slider active js
	$('#fullpage').fullpage({
		lockAnchors: false,
		navigation: true,
		verticalCentered: false,
		responsiveWidth: 991,
		paddingTop: '0px',
		paddingBottom: '0px',
		autoScrolling: false,
	});
    
    /*------ Wow Active ----*/
    new WOW().init();
    
    /*-----------------------
        Shop filter active 
    ------------------------- */
    $('.shop-filter-active').on('click', function(e) {
        e.preventDefault();
        $('.product-filter-wrapper').slideToggle();
    })
    var shopFiltericon = $('.shop-filter-active');
    shopFiltericon.on('click', function() {
        $('.shop-filter-active').toggleClass('active');
    })
    
    /*---------------------
        Price slider
    --------------------- */
    var sliderrange = $('#slider-range');
    var amountprice = $('#amount');
    $(function() {
        sliderrange.slider({
            range: true,
            min: 16,
            max: 400,
            values: [0, 300],
            slide: function(event, ui) {
                amountprice.val("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });
        amountprice.val("$" + sliderrange.slider("values", 0) +
            " - $" + sliderrange.slider("values", 1));
    });
    
    // Instantiate EasyZoom instances
    var $easyzoom = $('.easyzoom').easyZoom();
    
    /*---------------------------------
        Quick view Slick Carousel
    -----------------------------------*/
    $('.pro-dec-big-img-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: false,
        asNavFor: '.product-dec-slider , .product-dec-slider-2',
    });
    
    /*---------------------------------
        Product details slider active
    -----------------------------------*/
    $('.product-dec-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        asNavFor: '.pro-dec-big-img-slider',
        dots: false,
        focusOnSelect: true,
        fade: false,
        prevArrow: '<span class="pro-dec-icon pro-dec-prev"><i class="dlicon arrows-1_tail-up"></i></span>',
        nextArrow: '<span class="pro-dec-icon pro-dec-next"><i class="dlicon arrows-1_tail-down"></i></span>',
        responsive: [{
                breakpoint: 767,
                settings: {
                }
            },
            {
                breakpoint: 420,
                settings: {
                    autoplay: true,
                    slidesToShow: 2,
                }
            }
        ]
    });
    
    /*----------------------------------
        Product details slider 2 active
    -----------------------------------*/
    $('.product-dec-slider-2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.pro-dec-big-img-slider',
        dots: false,
        focusOnSelect: true,
        fade: false,
        prevArrow: '<span class="pro-dec-icon pro-dec-prev"><i class="dlicon arrows-1_tail-left"></i></span>',
        nextArrow: '<span class="pro-dec-icon pro-dec-next"><i class="dlicon arrows-1_tail-right"></i></span>',
        responsive: [{
                breakpoint: 767,
                settings: {
                    
                }
            },
            {
                breakpoint: 420,
                settings: {
                    autoplay: true,
                    slidesToShow: 2,
                }
            }
        ]
    });
    
    /* Product details sidebar active */
    $('.pro-details-sidebar-active').owlCarousel({
        loop: true,
        nav: true,
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        autoplay: false,
        autoplayTimeout: 5000,
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    })
    
    /* Related product active */
    $('.related-product-active').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 5,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
            1500: {
                items: 5
            }
        }
    })
    
    /* Related product active 2 */
    $('.related-product-active-2').owlCarousel({
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 5,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            },
            1366: {
                items: 3
            },
            1500: {
                items: 5
            }
        }
    })
    
    /*------------------------
        Sidebar sticky active
    -------------------------- */
    $('.sidebar-active').stickySidebar({
        topSpacing: 0,
        bottomSpacing: 30,
        minWidth: 991,
    });
    
    /*--- Showlogin toggle function ----*/
    $('.checkout-click').on('click', function(e) {
        e.preventDefault();
        $('.checkout-login-info').slideToggle(1000);
    });
    
    /*---------------------
        Select active
    --------------------- */
    $('.select-active').select2();
    $(window).on('resize', function(){
        $('.select-active').select2()
    });
    
    /*--------------------------------
        Testimonial active 2
    -----------------------------------*/
    $('.testimonial-active-2').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        fade: false,
        arrows: false,
        responsive: [{
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
    
    /*--- Newsletter Popup activation---*/
    setTimeout(function() {
        if($.cookie('shownewsletter')==1) $('.newletter-popup').hide();
        $('#subscribe_pemail').keypress(function(e) {
            if(e.which == 13) {
                e.preventDefault();
                email_subscribepopup();
            }
            var name= $(this).val();
              $('#subscribe_pname').val(name);
        });
        $('#subscribe_pemail').change(function() {
         var name= $(this).val();
                  $('#subscribe_pname').val(name);
        });
        //transition effect
        if($.cookie("shownewsletter") != 1){
            $('.newletter-popup').bPopup();
        }
        $('#newsletter_popup_dont_show_again').on('change', function(){
            if($.cookie("shownewsletter") != 1){   
                $.cookie("shownewsletter",'1')
            }else{
                $.cookie("shownewsletter",'0')
            }
        }); 
    }, 1200);
    
    
    
})(jQuery);

