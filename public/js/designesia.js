 /* --------------------------------------------------
  * Â© Copyright 2023 - Rentaly by Designesia
  * --------------------------------------------------*/
(function($) {
    'use strict';

     var rtl_mode = 'off'; // on - for enable RTL, off - for deactive RTL
     var preloader = 'on'; // on - for enable preloader, off - for disable preloader
     var preloader_custom_image = 'off'; // insert image url to enable custom image, off - for disable custom image
     var loading_text = "Loading..."; // text for preloader. If you don't use text just leave it blank
     var loading_text_position = "0px"; // set position for loading text. Default value is 0px

     /* predefined vars begin */
     var mobile_menu_show = 0;
     var v_count = '0';
     var mb;
     var instances = [];
     var $window = $(window);
     var $op_header_autoshow = 0;
     var grid_size = 10;
     /* predefined vars end */

     function de_loader(){        
        if(preloader_custom_image=="off"){
            var myHtml = $("<div/>")
            .addClass("de-preloader")
            .append( $("<div/>").addClass("car")
            .append( $("<div/>").addClass("strike strike"))
            .append( $("<div/>").addClass("strike strike2"))
            .append( $("<div/>").addClass("strike strike3"))
            .append( $("<div/>").addClass("strike strike4"))
            .append( $("<div/>").addClass("strike strike5"))
            .append( $("<div/>").addClass("car-detail spoiler"))
            .append( $("<div/>").addClass("car-detail back"))
            .append( $("<div/>").addClass("car-detail center"))
            .append( $("<div/>").addClass("car-detail center1"))
            .append( $("<div/>").addClass("car-detail front"))
            .append( $("<div/>").addClass("car-detail wheel"))
            .append( $("<div/>").addClass("car-detail wheel wheel2"))
            .append( $("<div/>").addClass("text").text(loading_text))
            )            
        }else{
            var myHtml = $("<div/>")
            .addClass("de-preloader")
            .append( $("<div/>").addClass("custom-loader-image")
            .append( $("<div/>").addClass("text").text(loading_text))
            )
        }
        $("#de-preloader").append(myHtml);        
        $('.custom-loader-image').prepend('<img src="'+preloader_custom_image+'" />');
        $('.text').css('margin-top',loading_text_position);
     }
     
     de_loader();
     
     /* --------------------------------------------------
      * header | sticky
      * --------------------------------------------------*/
     function header_sticky() {
         jQuery("header").addClass("clone", 1000, "easeOutBounce");
         var $document = $(document);
         var vscroll = 0;
         var header = jQuery("header.autoshow");
         if ($document.scrollTop() >= 50 && vscroll == 0) {
             header.removeClass("scrollOff");
             header.addClass("scrollOn");
             header.css("height", "auto");
             vscroll = 1;
         } else {
             header.removeClass("scrollOn");
             header.addClass("scrollOff");
             vscroll = 0;
         }
     }
     /* --------------------------------------------------
      * plugin | magnificPopup
      * --------------------------------------------------*/
     function load_magnificPopup() {
         jQuery('.simple-ajax-popup-align-top').magnificPopup({
             type: 'ajax',
             alignTop: true,
             overflowY: 'scroll'
         });
         jQuery('.simple-ajax-popup').magnificPopup({
             type: 'ajax'
         });
         // zoom gallery
         jQuery('.zoom-gallery').magnificPopup({
             delegate: 'a',
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             },
             zoom: {
                 enabled: true,
                 duration: 300, // don't foget to change the duration also in CSS
                 opener: function(element) {
                     return element.find('img');
                 }
             }
         });
         // popup youtube, video, gmaps
         jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
             disableOn: 700,
             type: 'iframe',
             mainClass: 'mfp-fade',
             removalDelay: 160,
             preloader: false,
             fixedContentPos: false
         });
         // Initialize popup as usual
         $('.image-popup').magnificPopup({
             type: 'image',
             mainClass: 'mfp-with-zoom', // this class is for CSS animation below

             zoom: {
                 enabled: true, // By default it's false, so don't forget to enable it

                 duration: 300, // duration of the effect, in milliseconds
                 easing: 'ease-in-out', // CSS transition easing function

                 // The "opener" function should return the element from which popup will be zoomed in
                 // and to which popup will be scaled down
                 // By defailt it looks for an image tag:
                 opener: function(openerElement) {
                     // openerElement is the element on which popup was initialized, in this case its <a> tag
                     // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                     return openerElement.is('img') ? openerElement : openerElement.find('img');
                 }
             }

         });
         $('.image-popup-vertical-fit').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             mainClass: 'mfp-img-mobile',
             image: {
                 verticalFit: true
             }
         });
         $('.image-popup-fit-width').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             image: {
                 verticalFit: false
             }
         });
         $('.image-popup-no-margins').magnificPopup({
             type: 'image',
             closeOnContentClick: true,
             closeBtnInside: false,
             fixedContentPos: true,
             mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
             image: {
                 verticalFit: true
             },
             zoom: {
                 enabled: true,
                 duration: 300 // don't foget to change the duration also in CSS
             }
         });
         $('.image-popup-gallery').magnificPopup({
             type: 'image',
             closeOnContentClick: false,
             closeBtnInside: false,
             mainClass: 'mfp-with-zoom mfp-img-mobile',
             image: {
                 verticalFit: true,
                 titleSrc: function(item) {
                     return item.el.attr('title');
                     //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                 }
             },
             gallery: {
                 enabled: true
             }
         });
         $('.images-group').each(function() { // the containers for all your galleries
             $(this).magnificPopup({
                 delegate: 'a', // the selector for gallery item
                 type: 'image',
                 gallery: {
                     enabled: true
                 }
             });
         });

         $('.images-popup').magnificPopup({
             delegate: 'a', // child items selector, by clicking on it popup will open
             type: 'image'
             // other options
         });
     }
     /* --------------------------------------------------
      * plugin | enquire.js
      * --------------------------------------------------*/
     function init_resize() {
         enquire.register("screen and (min-width: 993px)", {
             match: function() {
                 mobile_menu_show = 1;
             },
             unmatch: function() {
                 mobile_menu_show = 0;
                 jQuery("#menu-btn").show();
             }
         });
         enquire.register("screen and (max-width: 993px)", {
             match: function() {
                 $('header').addClass("header-mobile");
                 var body = jQuery('body');
                 if (body.hasClass('side-content')) {
                     body.removeClass('side-layout');
                 }
             },
             unmatch: function() {
                 $('header').removeClass("header-mobile");
                 var body = jQuery('body');
                 if (body.hasClass('side-content')) {
                     body.addClass('side-layout');
                 }
             }
         });
         init();
         init_de();
         video_autosize();
         
         var header = $('header');
         header.removeClass('smaller');
         header.removeClass('logo-smaller');
         header.removeClass('clone');

         var mx = window.matchMedia("(max-width: 992px)");
         var osw = jQuery('.owl-slide-wrapper');
         if (mx.matches) {           
             osw.find("img").css("height", $(window).innerHeight());
             osw.find("img").css("width", "auto");
             if($op_header_autoshow==1){
                 header.removeClass('autoshow');
             }
             
         } else {
             osw.find("img").css("width", "100%");
             osw.find("img").css("height", "auto");
             if($op_header_autoshow==1){
                 header.addClass('autoshow');
             }
         }


     };
     /* --------------------------------------------------
      * plugin | owl carousel
      * --------------------------------------------------*/
     function load_owl() {
        jQuery("#items-carousel").owlCarousel({
            center: false,
            items:3,
            rewind:true,
            margin:25,
            nav:true,
            thumbs: false,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            dots:false,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

        jQuery("#items-carousel-alt-2").owlCarousel({
            center: true,
            items:3,
            loop:true,
            margin:25,
            nav:true,
            thumbs: false,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            dots:false,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

        jQuery("#slider-carousel").owlCarousel({
                loop: true,
                items: 1,
                dots: false,
                thumbs: true,
                thumbImage: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });

        jQuery("#collection-carousel").owlCarousel({
            center: false,
            items:4,
            loop:true,
            margin:25,
            nav:true,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            dots:false,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

        jQuery("#collection-carousel-alt").owlCarousel({
            center: false,
            items:5,
            loop:true,
            margin:25,
            nav:true,
            navText : ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
            dots:false,
            responsive:{
                1000:{
                    items:5
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery("#item-carousel-big").owlCarousel({
            loop:true,
            margin:25,
            nav:false,
            dots:false,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });

         jQuery("#item-carousel-big-type-2").owlCarousel({
            autoplay:true,
            loop:true,
            margin:25,
            nav:false,
            dots:false,
            responsive:{
                1000:{
                    items:1
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });

         var owl = $('#item-carousel-big');
         owl.owlCarousel();
         $('.d-carousel .d-arrow-right').click(function() {
             owl.trigger('next.owl.carousel');
         })
         $('.d-carousel .d-arrow-left').click(function() {
             owl.trigger('prev.owl.carousel');
         });

         var owl_2 = $('#item-carousel-big-type-2');
         owl_2.owlCarousel();
         $('.d-carousel .d-arrow-right').click(function() {
             owl_2.trigger('next.owl.carousel');
         })
         $('.d-carousel .d-arrow-left').click(function() {
             owl_2.trigger('prev.owl.carousel');
         });

         $(".owl-thumb-item").on("click", function() {
            $(this).parent().find(".owl-thumb-item").removeClass('active');
             $(this).addClass("active");
         });

         jQuery("#event-carousel").owlCarousel({
            center: false,
            items:3,
            loop:true,
            margin:0,
            nav:false,
            dots:false,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:3
                },
                0:{
                    items:1
                }
            }
         });

         jQuery("#crypto-carousel").owlCarousel({
            center: false,
            items:4,
            loop:true,
            margin:25,
            nav:false,
            dots:false,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:3
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#ss-carousel").owlCarousel({
            center: true,
            items:4,
            loop:true,
            margin:60,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:3
                },
                0:{
                    items:2
                }
            }
         });

        jQuery(".rtl #testimonial-carousel").owlCarousel({
            center: false,
            loop:true,
            margin:30,
            thumbs: false,
            rtl: true,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#testimonial-carousel").owlCarousel({
            center: false,
            loop:true,
            margin:30,
            thumbs: false,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });

         jQuery("#testimonial-carousel-1-col").owlCarousel({
            center: false,
            loop:true,
            margin:30,
            thumbs:false,
            responsive:{
                1000:{
                    items:1
                },
                600:{
                    items:1
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#blog-carousel").owlCarousel({
            center: false,
            items:3,
            loop:true,
            margin:25,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#blog-carousel-3").owlCarousel({
            center: true,
            items:5,
            loop:true,
            margin:20,
            responsive:{
                1000:{
                    items:3
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#owl-logo").owlCarousel({
            center: false,
            items:6,
            loop:true,
            dots: false,
            margin:25,
            autoplay:true,
            autoplayTimeout:2000,
            responsive:{
                1000:{
                    items:6
                },
                600:{
                    items:4
                },
                0:{
                    items:2
                }
            }
         });
         
         jQuery(".project-carousel-4-nav").owlCarousel({
            center: true,
            items:4,
            loop:true,
            margin:15,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:3
                },
                0:{
                    items:1
                }
            }
         });
         
         jQuery("#owl-features").owlCarousel({
            center: true,
            items:4,
            loop:true,
            dots: true,
            margin:25,
            autoplay:false,
            autoplayTimeout:0,
            responsive:{
                1000:{
                    items:4
                },
                600:{
                    items:2
                },
                0:{
                    items:1
                }
            }
         });
         
         // Custom Navigation owlCarousel
         $(".next").on("click", function() {
             $(this).parent().parent().find('.blog-slide').trigger('owl.next');
         });
         $(".prev").on("click", function() {
             $(this).parent().parent().find('.blog-slide').trigger('owl.prev');
         });

         jQuery('.owl-custom-nav').each(function() {
             var owl = $('.owl-custom-nav').next();
             var ow = parseInt(owl.css("height"), 10);
             $(this).css("margin-top", (ow / 2) - 25);
             owl.owlCarousel();
             // Custom Navigation Events
             $(".btn-next").on("click", function() {
                 owl.trigger('owl.next');
             });
             $(".btn-prev").on("click", function() {
                 owl.trigger('owl.prev');
             });
         });


         // custom navigation for slider
         var ows = $('#custom-owl-slider');
         var arr = $('.owl-slider-nav');
         var doc_height = $(window).innerHeight();
         arr.css("top", (doc_height / 2) - 25);
         ows.owlCarousel();
         // Custom Navigation Events
         arr.find(".next").on("click", function() {
             ows.trigger('owl.next');
         });
         arr.find(".prev").on("click", function() {
             ows.trigger('owl.prev');
         });

         jQuery(".owl-slide-wrapper").on("mouseenter", function() {
             arr.find(".next").css("right", "40px");
             arr.find(".prev").css("left", "40px");
         }).on("mouseleave", function() {
             arr.find(".next").css("right", "-50px");
             arr.find(".prev").css("left", "-50px");
         })
     }
     /* --------------------------------------------------
      * plugin | isotope
      * --------------------------------------------------*/
     function filter_gallery() {
         var $container = jQuery('#gallery');
         $container.isotope({
             itemSelector: '.item',
             filter: '*'
         });
         jQuery('#filters a').on("click", function() {
             var $this = jQuery(this);
             if ($this.hasClass('selected')) {
                 return false;
             }
             var $optionSet = $this.parents();
             $optionSet.find('.selected').removeClass('selected');
             $this.addClass('selected');
             var selector = jQuery(this).attr('data-filter');
             $container.isotope({
                 filter: selector
             });
             return false;
         });
     }

     function masonry() {
         var $container = jQuery('.row-masonry');
         $container.isotope({
             itemSelector: '.item',
         });
         jQuery('#filters a').on("click", function() {
             var $this = jQuery(this);
             if ($this.hasClass('selected')) {
                 return false;
             }
             var $optionSet = $this.parents();
             $optionSet.find('.selected').removeClass('selected');
             $this.addClass('selected');
             var selector = jQuery(this).attr('data-filter');
             $container.isotope({
                 filter: selector
             });
             return false;
         });
     }
     /* --------------------------------------------------
      * plugin | fitvids
      * --------------------------------------------------*/
     /*!
      * FitVids 1.0
      *
      * Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
      * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
      * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
      *
      * Date: Thu Sept 01 18:00:00 2011 -0500
      */
     ! function(a) {
         a.fn.fitVids = function(b) {
             var c = {
                     customSelector: null
                 },
                 d = document.createElement("div"),
                 e = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
             return d.className = "fit-vids-style", d.innerHTML = "&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>", e.parentNode.insertBefore(d, e), b && a.extend(c, b), this.each(function() {
                 var b = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']", "object", "embed"];
                 c.customSelector && b.push(c.customSelector);
                 var d = a(this).find(b.join(","));
                 d.each(function() {
                     var b = a(this);
                     if (!("embed" == this.tagName.toLowerCase() && b.parent("object").length || b.parent(".fluid-width-video-wrapper").length)) {
                         var c = "object" == this.tagName.toLowerCase() || b.attr("height") ? b.attr("height") : b.height(),
                             d = b.attr("width") ? b.attr("width") : b.width(),
                             e = c / d;
                         if (!b.attr("id")) {
                             var f = "fitvid" + Math.floor(999999 * Math.random());
                             b.attr("id", f)
                         }
                         b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * e + "%"), b.removeAttr("height").removeAttr("width")
                     }
                 })
             })
         }
     }(jQuery);
     /* --------------------------------------------------
      * back to top
      * --------------------------------------------------*/
     var scrollTrigger = 500; // px
     var t = 0;

     function backToTop() {
         var scrollTop = $(window).scrollTop();
         if (scrollTop > scrollTrigger) {
             $('#back-to-top').addClass('show');
             $('#back-to-top').removeClass('hide');
             t = 1;
         }

         if (scrollTop < scrollTrigger && t == 1) {
             $('#back-to-top').addClass('hide');
         }

         $('#back-to-top').on('click', function(e) {
             e.preventDefault();
             $('html,body').stop(true).animate({
                 scrollTop: 0
             }, 700);
         });
     };
     /* --------------------------------------------------
      * plugin | scroll to
      * --------------------------------------------------*/
     /*!
      * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
      * Scroll smooth to any element in your DOM.
      *
      * Copyright (c) 2012 Yannick Albert (http://yckart.com)
      * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
      * 2013/02/17
      **/
     $.scrollTo = $.fn.scrollTo = function(x, y, options) {
         if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

         options = $.extend({}, {
             gap: {
                 x: 0,
                 y: 0
             },
             animation: {
                 easing: 'easeInOutExpo',
                 duration: 600,
                 complete: $.noop,
                 step: $.noop
             }
         }, options);

         return this.each(function() {

             if (!jQuery('body').hasClass('side-layout')) {
                 var h = 69;
             } else {
                 var h = 0;
             }

             var elem = $(this);
             elem.stop().animate({
                 scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
                 scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - h // *edited
             }, options.animation);
         });
     };
     /* --------------------------------------------------
      * counting number
      * --------------------------------------------------*/
     function de_counter() {
         jQuery('.timer').each(function() {
             var imagePos = jQuery(this).offset().top;
             var topOfWindow = jQuery(window).scrollTop();
             if (imagePos < topOfWindow + jQuery(window).height() && v_count == '0') {
                 jQuery(function($) {
                     // start all the timers
                     jQuery('.timer').each(count);

                     function count(options) {
                         v_count = '1';
                         var $this = jQuery(this);
                         options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                         $this.countTo(options);
                     }
                 });
             }
         });
     }
     /* --------------------------------------------------
      * progress bar
      * --------------------------------------------------*/

     function text_rotate() {
         var quotes = $(".text-rotate-wrap .text-item");
         var quoteIndex = -1;

         function showNextQuote() {
             ++quoteIndex;
             quotes.eq(quoteIndex % quotes.length)
                 .fadeIn(1)
                 .delay(1500)
                 .fadeOut(1, showNextQuote);
         }

         showNextQuote();

     };
     /* --------------------------------------------------
      * custom background
      * --------------------------------------------------*/
     function custom_bg() {
         $("body,div,section,span,form").css('background-color', function() {
            if ($(this).is('[data-bgcolor]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgcolor');
         });
         $("body,div,section").css('background', function() {
            if ($(this).is('[data-bgimage]')) {
                jQuery(this).addClass("bgcustom");
            }
             return jQuery(this).data('bgimage');
         });
         $("body,div,section").css('background-size', function() {
             return '100% auto';
         });

         $("body,div,section").css('background-repeat', function() {
             return 'no-repeat';
         });
     }
     /* --------------------------------------------------
      * custom elements
      * --------------------------------------------------*/
     function custom_elements() {
         // --------------------------------------------------
         // tabs
         // --------------------------------------------------
         jQuery('.de_tab').find('.de_tab_content > div').hide();
         jQuery('.de_tab').find('.de_tab_content > div:first').show();
         jQuery('li').find('.v-border').fadeTo(150, 0);
         jQuery('li.active').find('.v-border').fadeTo(150, 1);
         jQuery('.de_nav li').on("click", function() {
             jQuery(this).parent().find('li').removeClass("active");
             jQuery(this).addClass("active");
             jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
             jQuery(this).parent().parent().find('.de_tab_content > div').hide();
             var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
             jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
             jQuery(this).find('.v-border').fadeTo(150, 1);
         });
         // request quote function
         var rq_step = 1;
         jQuery('#request_form .btn-right').on("click", function() {
             var rq_name = $('#rq_name').val();
             var rq_email = $('#rq_email').val();
             var rq_phone = $('#rq_phone').val();
             if (rq_step == 1) {
                 if (rq_name.length == 0) {
                     $('#rq_name').addClass("error_input");
                 } else {
                     $('#rq_name').removeClass("error_input");
                 }
                 if (rq_email.length == 0) {
                     $('#rq_email').addClass("error_input");
                 } else {
                     $('#rq_email').removeClass("error_input");
                 }
                 if (rq_phone.length == 0) {
                     $('#rq_phone').addClass("error_input");
                 } else {
                     $('#rq_phone').removeClass("error_input");
                 }
             }
             if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
                 jQuery("#rq_step_1").hide();
                 jQuery("#rq_step_2").fadeIn();
             }
         });
         // --------------------------------------------------
         // tabs
         // --------------------------------------------------
         jQuery('.de_review').find('.de_tab_content > div').hide();
         jQuery('.de_review').find('.de_tab_content > div:first').show();
         //jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
         jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);
         jQuery('.de_nav li').on("click", function() {
             jQuery(this).parent().find('li').removeClass("active");
             //jQuery(this).parent().find('li').fadeTo(150,.5);
             jQuery(this).addClass("active");
             jQuery(this).fadeTo(150, 1);
             jQuery(this).parent().parent().find('.de_tab_content > div').hide();
             var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
             jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
         });
         // --------------------------------------------------
         // toggle
         // --------------------------------------------------
         jQuery(".toggle-list h2").addClass("acc_active");
         jQuery(".toggle-list h2").toggle(function() {
             jQuery(this).addClass("acc_noactive");
             jQuery(this).next(".ac-content").slideToggle(200);
         }, function() {
             jQuery(this).removeClass("acc_noactive").addClass("acc_active");
             jQuery(this).next(".ac-content").slideToggle(200);
         })
         // --------------------------------------------------
         // toggle
         // --------------------------------------------------
         jQuery(".expand-custom .toggle").click(function() {
             jQuery(this).stop().toggleClass("clicked");
             jQuery(this).stop().parent().parent().parent().find(".details").slideToggle(500);
         })
     }
     /* --------------------------------------------------
      * video autosize
      * --------------------------------------------------*/
     function video_autosize() {
         jQuery('.de-video-container').each(function() {
             var height_1 = jQuery(this).css("height");
             var height_2 = jQuery(this).find(".de-video-content").css("height");
             var newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
             jQuery(this).find('.de-video-overlay').css("height", height_1);
             jQuery(this).find(".de-video-content").animate({
                 'margin-top': newheight
             }, 'fast');
         });
     }
     /* --------------------------------------------------
      * center x and y
      * --------------------------------------------------*/
     function center_xy() {
         jQuery('.center-xy').each(function() {
             jQuery(this).parent().find("img").on('load', function() {
                 var w = parseInt(jQuery(this).parent().find(".center-xy").css("width"), 10);
                 var h = parseInt(jQuery(this).parent().find(".center-xy").css("height"), 10);
                 var pic_w = jQuery(this).css("width");
                 var pic_h = jQuery(this).css("height");
                 var tp = jQuery(this).parent();
                 tp.find(".center-xy").css("left", parseInt(pic_w, 10) / 2 - w / 2);
                 tp.find(".center-xy").css("top", parseInt(pic_h, 10) / 2 - h / 2);
                 tp.find(".bg-overlay").css("width", pic_w);
                 tp.find(".bg-overlay").css("height", pic_h);
             }).each(function() {
                 if (this.complete) $(this).load();
             });
         });
     }
     /* --------------------------------------------------
      * add arrow for mobile menu
      * --------------------------------------------------*/
     function menu_arrow() {
         // mainmenu create span
         jQuery('#mainmenu li a').each(function() {
             if ($(this).next("ul").length > 0) {
                 $("<span></span>").insertAfter($(this));
             }
         });
         // mainmenu arrow click
         jQuery("#mainmenu > li > span").on("click", function() {
             
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     $(this).addClass("active");
                     $(this).parent().find("ul:first").css("height", "auto");
                     var curHeight = $(this).parent().find("ul:first").height();
                     $(this).parent().find("ul:first").css("height", "0");
                     $(this).parent().find("ul:first").animate({
                         'height': curHeight
                     }, 300, 'easeOutQuint');
                     break;
                 case 2:
                    var curHeight = $(this).parent().find("ul:first").height();
                     $(this).removeClass("active");
                     $(this).parent().find("ul:first").animate({
                         'height': "0"
                     }, 300, 'easeOutQuint');
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
         jQuery("#mainmenu > li > ul > li > span").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     $(this).addClass("active");
                     $(this).parent().find("ul:first").css("height", "auto");
                     $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                     var curHeight = $(this).parent().find("ul:first").height();
                     $(this).parent().find("ul:first").css("height", "0");
                     $(this).parent().find("ul:first").animate({
                         'height': curHeight
                     }, 400, 'easeInOutQuint');
                     break;
                 case 2:
                     $(this).removeClass("active");
                     $(this).parent().find("ul:first").animate({
                         'height': "0"
                     }, 400, 'easeInOutQuint');
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });

         jQuery(".de-country .d-title").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             
             switch (iteration) {
                 case 1:
                     jQuery(this).parent().addClass("expand");
                     break;
                 case 2:
                     jQuery(this).parent().removeClass("expand");
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });

         jQuery("#de-click-menu-profile").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             
             switch (iteration) {
                 case 1:
                     $('#de-submenu-profile').show();
                     $('#de-submenu-profile').addClass('open');
                     $('#de-submenu-notification').removeClass('open');
                     $('#de-submenu-notification').hide();
                     $('#de-click-menu-notification').data('iteration', 1);
                     break;
                 case 2:
                     $('#de-submenu-profile').removeClass('open');
                     $('#de-submenu-profile').hide();        
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });


         jQuery("#de-click-menu-notification").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             
             switch (iteration) {
                 case 1:
                     $('#de-submenu-notification').show();
                     $('#de-submenu-notification').addClass('open');
                     $('#de-submenu-profile').removeClass('open');
                     $('#de-submenu-profile').hide();
                     $('#de-click-menu-profile').data('iteration', 1);
                     break;
                 case 2:
                     $('#de-submenu-notification').removeClass('open');
                     $('#de-submenu-notification').hide();        
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
     }
     /* --------------------------------------------------
      * show gallery item sequence
      * --------------------------------------------------*/
     function sequence() {
         var sq = jQuery(".sequence > .gallery-item .picframe");
         var count = sq.length;
         sq.addClass("fadeIn");
         sq.find("img").addClass("slideInUp");
         for (var i = 0; i <= count; i++) {
             var sqx = jQuery(".sequence > .gallery-item:eq(" + i + ") .picframe");
             sqx.attr('data-wow-delay', (i / 8) + 's');
             sqx.find("img").attr('data-wow-delay', (i / 16) + 's');
         }
     }
     /* --------------------------------------------------
      * show gallery item sequence
      * --------------------------------------------------*/
     function sequence_a() {
         var sq = jQuery(".sequence").find(".sq-item");
         var count = sq.length;
         sq.addClass("fadeInUp");
         for (var i = 0; i <= count; i++) {
             var sqx = jQuery(".sequence").find(".sq-item:eq(" + i + ")");
             sqx.attr('data-wow-delay', (i / 8) + 's');
             sqx.attr('data-wow-speed', '1s');
         }
     }
     /* --------------------------------------------------
      * custom scroll
      * --------------------------------------------------*/
     $.fn.moveIt = function() {
         $(this).each(function() {
             instances.push(new moveItItem($(this)));
         });
     }

     function moveItItemNow() {
         var scrollTop = $window.scrollTop();
         instances.forEach(function(inst) {
             inst.update(scrollTop);
         });
     }

     function moveItItem(el) {
         this.el = $(el);
         this.speed = parseInt(this.el.attr('data-scroll-speed'));
     };
     moveItItem.prototype.update = function(scrollTop) {
         var pos = scrollTop / this.speed;
         this.el.css('transform', 'translateY(' + pos + 'px)');
     };
     $(function() {
         $('[data-scroll-speed]').moveIt();
     });
     /* --------------------------------------------------
      * multiple function
      * --------------------------------------------------*/
     function init() {
         var sh = jQuery('#de-sidebar').css("height");
         var dh = jQuery(window).innerHeight();
         var h = parseInt(sh) - parseInt(dh);

         function scrolling() {
             var mq = window.matchMedia("(min-width: 993px)");
             var ms = window.matchMedia("(min-width: 768px)");
             if (mq.matches) {
                 var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                     shrinkOn = 0,
                     header = jQuery("header");
                 if (distanceY > shrinkOn) {
                     header.addClass("smaller");
                 } else {
                     if (header.hasClass('smaller')) {
                         header.removeClass('smaller');
                     }
                 }
             }
             if (mq.matches) {
                 if (jQuery("header").hasClass("side-header")) {
                     if (jQuery(document).scrollTop() >= h) {
                         jQuery('#de-sidebar').css("position", "fixed");
                         if (parseInt(sh) > parseInt(dh)) {
                             jQuery('#de-sidebar').css("top", -h);
                         }
                         jQuery('#main').addClass("col-md-offset-3");
                         jQuery('h1#logo img').css("padding-left", "7px");
                         jQuery('header .h-content').css("padding-left", "7px");
                         jQuery('#mainmenu li').css("width", "103%");
                     } else {
                         jQuery('#de-sidebar').css("position", "relative");
                         if (parseInt(sh) > parseInt(dh)) {
                             jQuery('#de-sidebar').css("top", 0);
                         }
                         jQuery('#main').removeClass("col-md-offset-3");
                         jQuery('h1#logo img').css("padding-left", "0px");
                         jQuery('header .h-content').css("padding-left", "0px");
                         jQuery('#mainmenu li').css("width", "100%");
                     }
                 }

             }
         }

         // --------------------------------------------------
         // looping background
         // --------------------------------------------------

         scrolling();


         jQuery(".activity-filter > li").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                    jQuery('.activity-list > li').hide();                    
                    if(jQuery(this).hasClass("filter_by_followings")){                        
                        jQuery('li.act_follow').show();
                    }else if(jQuery(this).hasClass("filter_by_sales")){                        
                        jQuery('li.act_sale').show();
                    }else if(jQuery(this).hasClass("filter_by_offers")){                        
                        jQuery('li.act_offer').show();
                    }else if(jQuery(this).hasClass("filter_by_likes")){                        
                        jQuery('li.act_like').show();
                    };
                    jQuery('.activity-filter > li').removeClass('active');
                    jQuery(this).addClass('active');
                    break;
                 case 2:
                     
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });

         jQuery(".filter__r").on("click", function() {
            jQuery('.activity-filter > li').removeClass('active');
            jQuery('.activity-list > li').show();   
         });

         jQuery(".btn-close").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     jQuery('#popup-box').addClass('popup-hide');
                     jQuery('#popup-box').removeClass('popup-show');
                     break;
                 case 2:

                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
         
     }
      // init_de begin //
     function init_de() {
         jQuery('.de-team-list').each(function() {
             jQuery(this).find("img").on('load', function() {
                 var w = jQuery(this).css("width");
                 var h = jQuery(this).css("height");
                 var tpp = jQuery(this).parent().parent();
                 tpp.find(".team-pic").css("height", h);
                 tpp.find(".team-desc").css("width", w);
                 tpp.find(".team-desc").css("height", h);
                 tpp.find(".team-desc").css("top", h);
             }).each(function() {
                 if (this.complete) $(this).load();
             });
         });
         jQuery(".de-team-list").on("mouseenter", function() {
             var h;
             h = jQuery(this).find("img").css("height");
             jQuery(this).find(".team-desc").stop(true).animate({
                 'top': "0px"
             }, 350, 'easeOutQuad');
             jQuery(this).find("img").stop(true).animate({
                 'margin-top': "-100px"
             }, 400, 'easeOutQuad');
         }).on("mouseleave", function() {
             var h;
             h = jQuery(this).find("img").css("height");
             jQuery(this).find(".team-desc").stop(true).animate({
                 'top': h
             }, 350, 'easeOutQuad');
             jQuery(this).find("img").stop(true).animate({
                 'margin-top': "0px"
             }, 400, 'easeOutQuad');
         })
         // portfolio
         jQuery('.item .picframe').each(function() {
             var img = jQuery(this).find("img");
             img.css("width", "100%");
             img.css("height", "auto");
             img.on('load', function() {
                 var w = jQuery(this).css("width");
                 var h = jQuery(this).css("height");
                 //nh = (h.substring(0, h.length - 2)/2)-48;
                 jQuery(this).parent().css("height", h);
             }).each(function() {
                 if (this.complete) $(this).load();
             });
         });
         // --------------------------------------------------
         // portfolio hover
         // --------------------------------------------------
         jQuery('.overlay').fadeTo(1, 0);
         // gallery hover
         jQuery(".item .picframe").on("mouseenter", function() {
             var ov = jQuery(this).parent().find(".overlay");
             ov.width(jQuery(this).find("img").css("width"));
             ov.height(jQuery(this).find("img").css("height"));
             ov.stop(true).fadeTo(200, 1);
             var picheight = jQuery(this).find("img").css("height");
             var newheight;
             newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
             //alert(newheight);
             //jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight},200,'easeOutCubic');
             jQuery(this).parent().find(".pf_text").css('margin-top', newheight);
             jQuery(this).parent().find(".pf_text").stop(true).animate({
                 'opacity': '1'
             }, 1000, 'easeOutCubic');
             var w = jQuery(this).find("img").css("width");
             var h = jQuery(this).find("img").css("height");
             var w = parseInt(w, 10);
             var h = parseInt(h, 10);
             var $scale = 1;
             //alert(w);
             jQuery(this).find("img").stop(true).animate({
                 width: w * $scale,
                 height: h * $scale,
                 'margin-left': -w * ($scale - 1) / 2,
                 'margin-top': -h * ($scale - 1) / 2
             }, 400, 'easeOutCubic');
         }).on("mouseleave", function() {
             var newheight;
             var picheight = jQuery(this).find("img").css("height");
             newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
             //jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight - 30},200,'easeOutCubic');
             jQuery(this).parent().find(".pf_text").stop(true).animate({
                 'opacity': '0'
             }, 400, 'easeOutCubic');
             jQuery(this).parent().find(".overlay").stop(true).fadeTo(200, 0);
             jQuery(this).find("img").stop(true).animate({
                 width: '100%',
                 height: '100%',
                 'margin-left': 0,
                 'margin-top': 0
             }, 400, 'easeOutQuad');
         })
         jQuery('.overlay').fadeTo(1, 0);
         
        jQuery('.grid.border').css('padding-top', grid_size);
        jQuery('.grid.border').css('padding-left', grid_size);

        jQuery("#selector .opt.tc1").addClass("active");
        
        jQuery("#selector .opt").on("click", function() {
            jQuery("#selector .opt").removeClass("active");
            var color = jQuery(this).data('color');
            jQuery("#colors").attr("href", 'css/colors/'+color+'.css');
            jQuery(this).addClass("active");
         });
     }
     // de_init end //
     
     // rtl begin //
      if (rtl_mode=="on") {
            jQuery("body").addClass('rtl');
            jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
            jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.css');
            jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.css');
            jQuery("#mdb").attr("href", 'css/mdb.rtl.min.css');
            jQuery('html').attr("dir","rtl")
        };
     // rtl end // 

     if(preloader=="off"){
            jQuery("#de-preloader").hide();
     }

     function f_rtl(){
         jQuery("#selector #demo-rtl").on("click", function() {
            var iteration = $(this).data('iteration') || 1;
             switch (iteration) {
                 case 1:
                     jQuery("body").addClass('rtl');
                     jQuery("#bootstrap").attr("href", 'css/bootstrap.rtl.min.css');
                     jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.rtl.min.css');
                     jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.rtl.min.css');
                     jQuery("#mdb").attr("href", 'css/mdb.rtl.min.css');
                     jQuery('html').attr("dir","rtl");
                     jQuery(this).find(".sc-val").text('Click to Disable');
                     break;
                 case 2:
                    jQuery("body").removeClass('rtl');
                    jQuery("#bootstrap").attr("href", 'css/bootstrap.min.css');
                    jQuery("#bootstrap-grid").attr("href", 'css/bootstrap-grid.min.css');
                    jQuery("#bootstrap-reboot").attr("href", 'css/bootstrap-reboot.min.css');
                    jQuery("#mdb").attr("href", 'css/mdb.min.css');
                    jQuery('html').attr("dir","ltr");
                    jQuery(this).find(".sc-val").text('Click to Enable');
                    break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });
     }

     jQuery("#dark-mode").on("click", function() {
        if(jQuery('body').hasClass('dark-scheme')){
            window.location.href = 'https://www.designesia.com/themes/gospace/index.html';
        }else{
            window.location.href = 'https://www.designesia.com/themes/gospace/02_dark-index.html';
        }
     });

     function grid_gallery() {
            jQuery('.grid-item').each(function () {
                var this_col = Number(jQuery(this).parent().attr('data-col'));
                var this_gridspace = Number(jQuery(this).parent().attr('data-gridspace'));
                var this_ratio = eval($(this).parent().attr('data-ratio'));
                jQuery(this).parent().css('padding-left', this_gridspace);
                var w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
                var gi = $(this);
                var h = w * this_ratio;
                gi.css('width', w)
                gi.css('height', h);
                gi.find(".pf_title").css('margin-top', (h / 2) - 10);
                gi.css('margin-right', this_gridspace);
                gi.css('margin-bottom', this_gridspace);
                $(this).parent().css('padding-top',this_gridspace);
                if (gi.hasClass('large')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', (h * 2) + this_gridspace);
                }
                if (gi.hasClass('large-width')) {
                    $(this).css('width', (w * 2) + this_gridspace);
                    $(this).css('height', h);
                }
                if (gi.hasClass('large-height')) {
                    $(this).css('height', (h * 2) + this_gridspace);
                    gi.find(".pf_title").css('margin-top', (h) - 20);
                }
            })
        }

     /* --------------------------------------------------
      * center-y
      * --------------------------------------------------*/
     function centerY() {
         jQuery('.full-height').each(function() {
             var dh = jQuery(window).innerHeight();
             jQuery(this).css("min-height", dh);
         });
     }

     /* --------------------------------------------------
      * progress bar
      * --------------------------------------------------*/
     function de_progress() {
         jQuery('.de-progress').each(function() {
             var pos_y = jQuery(this).offset().top;
             var value = jQuery(this).find(".progress-bar").attr('data-value');
             var topOfWindow = jQuery(window).scrollTop();
             if (pos_y < topOfWindow + 550) {
                 jQuery(this).find(".progress-bar").css({
                     'width': value
                 }, "slow");
             }

             jQuery(this).find('.value').text(jQuery(this).find('.progress-bar').attr('data-value'));
         });
     }

     function de_countdown() {
         $('.de_countdown').each(function() {
             var y = $(this).data('year');
             var m = $(this).data('month');
             var d = $(this).data('day');
             var h = $(this).data('hour');
             $(this).countdown({until: new Date(y, m-1, d, h)});
         });
    }

    // --------------------------------------------------
    // preloader
    // --------------------------------------------------

    function copyText(element) {
      var $copyText = jQuery(element).text();
      var button = jQuery('#btn_copy');
      navigator.clipboard.writeText($copyText).then(function() {
        var originalText = button.text();
        button.html('Copied!');        
        button.addClass('clicked');
        setTimeout(function(){
          button.html(originalText);
          button.removeClass('clicked');
          }, 750);
      }, function() {
        button.html('Error');
      });
    } 

    // --------------------------------------------------
    // custom dropdown
    // --------------------------------------------------   
    function dropdown(e){
        var obj = $(e+'.dropdown');
        var btn = obj.find('.btn-selector');
        var dd = obj.find('ul');
        var opt = dd.find('li');
        
            obj.on("mouseenter", function() {
                dd.show();
            }).on("mouseleave", function() {
                dd.hide();
            })
            
            opt.on("click", function() {
                dd.hide();
                var txt = $(this).text();
                opt.removeClass("active");
                $(this).addClass("active");
                btn.text(txt);
            });
    }

    function de_sidebar(){
        enquire.register("screen and (min-width: 993px)", {
             match: function() {
                if ($('.sidebar_inner').length){
                     $('.sidebar_inner').sticky({
                         top: 130,
                         bottom: 20,
                         stopOn: 'footer',
                         disableOn: 993
                     });
                };

                if ($('#search_location').length){
                     $('#search_location').sticky({
                         top: 130,
                         bottom: 20,
                         stopOn: 'footer',
                         disableOn: 993
                     });
                };
            }
         });
    }

    function de_share(){
        var url = window.location.href;
        $('.fa-twitter').on("click", function() { window.open('https://twitter.com/share?url='+url,'_blank'); });
        $('.fa-facebook').on("click", function() { window.open('https://www.facebook.com/sharer/sharer.php?u='+url,'_blank'); });
        $('.fa-reddit').on("click", function() { window.open('http://www.reddit.com/submit?url='+url,'_blank'); });
        $('.fa-linkedin').on("click", function() { window.open('https://www.linkedin.com/shareArticle?mini=true&url='+url,'_blank'); });
        $('.fa-pinterest').on("click", function() { window.open('https://www.pinterest.com/pin/create/button/?url='+url,'_blank'); });
        $('.fa-stumbleupon').on("click", function() { window.open('http://www.stumbleupon.com/submit?url='+url,'_blank'); });
        $('.fa-delicious').on("click", function() { window.open('https://delicious.com/save?v=5&noui&jump=close&url='+url,'_blank'); });
        $('.fa-envelope').on("click", function() { window.open('mailto:?subject=Share With Friends&body='+url,'_blank'); });

    }

     /* --------------------------------------------------
      * document ready
      * --------------------------------------------------*/
     jQuery(document).ready(function() {
         'use strict';
         f_rtl();
         load_magnificPopup();
         center_xy();
         init_de();
         grid_gallery();
         init_resize();
         de_progress();
         de_countdown();
         dropdown('#select_lang');
         dropdown('#select_hour_format');
         de_sidebar();
         de_share();
         $(".jarallax").jarallax();

        $(function() {
            $('.lazy').lazy();
        });


        function formatState (state) {
          if (!state.id) { return state.text; }
          var $state = $(
            '<span><img src="' + $(state.element).attr('data-src') + '" class="img-flag" /> ' + state.text + '</span>'
          );
          return $state;
        };
        $('#vehicle_type').select2({
          minimumResultsForSearch: Infinity,
          templateResult: formatState,
          templateSelection: formatState,
          width: '100%'
        });

        /* detepicker */
        
        $('#date-picker').daterangepicker({
                "singleDatePicker": true,
                "showISOWeekNumbers": true,
                "timePicker": false,
                "autoUpdateInput": true,
                "locale": {
                    "format": "MMMM DD, YYYY",
                    "separator": " - ",
                    "applyLabel": "Apply",
                    "cancelLabel": "Cancel",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "weekLabel": "W",
                    "daysOfWeek": [
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa"
                    ],
                    "monthNames": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                    "firstDay": 1
                },
                "linkedCalendars": true,
                "showCustomRangeLabel": false,
                "startDate": 1,
                "endDate": moment().startOf('hour').add(24, 'hour'),
                "opens": "right"
            });


        $('#date-picker-2').daterangepicker({
                "singleDatePicker": true,
                "showISOWeekNumbers": true,
                "timePicker": false,
                "autoUpdateInput": true,
                "locale": {
                    "format": "MMMM DD, YYYY",
                    "separator": " - ",
                    "applyLabel": "Apply",
                    "cancelLabel": "Cancel",
                    "fromLabel": "From",
                    "toLabel": "To",
                    "customRangeLabel": "Custom",
                    "weekLabel": "W",
                    "daysOfWeek": [
                        "Su",
                        "Mo",
                        "Tu",
                        "We",
                        "Th",
                        "Fr",
                        "Sa"
                    ],
                    "monthNames": [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December"
                    ],
                    "firstDay": 1
                },
                "linkedCalendars": true,
                "showCustomRangeLabel": false,
                "startDate": 1,
                "endDate": moment().startOf('hour').add(24, 'hour'),
                "opens": "right"
            });

        // switch

        $('.opt-2').css('display','none');

         $("#sw-1").click(function() {
            if($(this).is(":checked")){
                $('.opt-1').css('display','none');
                $('.opt-2').css('display','inline-block');
            }else{
                $('.opt-2').css('display','none');
                $('.opt-1').css('display','inline-block');
            }
        });

         // --------------------------------------------------
         // custom positiion
         // --------------------------------------------------
         var $doc_height = jQuery(window).innerHeight();
         jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
         //jQuery('.full-height').css("height", $doc_height);
         //var picheight = jQuery('.center-y').css("height");
         //picheight = parseInt(picheight, 10);
         //jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2)-100);
         jQuery('.full-height .de-video-container').css("min-height", $doc_height);

         
        if(jQuery('header').hasClass("autoshow")){
            $op_header_autoshow = 1;
        }

        jQuery("#btn_copy").on("click", function() {
            copyText("#wallet");
        });

        $('#mainmenu > li:has(ul)').addClass('menu-item-has-children');

        $(".d-item").slice(0, 8).show();
          $("#loadmore").on("click", function(e){
            e.preventDefault();
            $(".d-item:hidden").slice(0, 4).slideDown();
            if($(".d-item:hidden").length == 0) {
              //$("#loadmore").text("No Content").addClass("noContent");
              $("#loadmore").hide();
            }
        });

         centerY();

         $('#mainmenu li:has(ul)').addClass('has-child');

         // bootstrap
         var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
         var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
           return new bootstrap.Tooltip(tooltipTriggerEl)
         })

         var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
         var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
           return new bootstrap.Popover(popoverTriggerEl)
         })

         // close bootstrap

         // --------------------------------------------------
         // blog list hover
         // --------------------------------------------------
         jQuery(".blog-list").on("mouseenter", function() {
             var v_height = jQuery(this).find(".blog-slide").css("height");
             var v_width = jQuery(this).find(".blog-slide").css("width");
             var newheight = (v_height.substring(0, v_height.length - 2) / 2) - 40;
             var owa = jQuery(this).find(".owl-arrow");
             owa.css("margin-top", newheight);
             owa.css("width", v_width);
             owa.fadeTo(150, 1);
             //alert(v_height);
         }).on("mouseleave", function() {
             jQuery(this).find(".owl-arrow").fadeTo(150, 0);
         })
         // --------------------------------------------------
         // navigation for mobile
         // --------------------------------------------------
         jQuery('#menu-btn').on("click", function() {

            var h = jQuery('header')[0].scrollHeight;
            
             if (mobile_menu_show == 0) {
                 jQuery('header').addClass('menu-open');
                 jQuery('header').css('height',$(window).innerHeight());
                 mobile_menu_show = 1;
             } else {
                jQuery('header').removeClass('menu-open');
                jQuery('header').css('height','auto');
                 mobile_menu_show = 0;
             }
         })
        //  jQuery('.menu-link').on("click", function() {
        //     if (mobile_menu_show == 0) {
        //         jQuery('header').addClass('menu-open');
        //         jQuery('header').css('height',$(window).innerHeight());
        //         mobile_menu_show = 1;
        //     } else {
        //        jQuery('header').removeClass('menu-open');
        //        jQuery('header').css('height','auto');
        //         mobile_menu_show = 0;
        //     }
        //  })
         jQuery("a.btn").on("click", function(evn) {
             if (this.href.indexOf('#') != -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         jQuery('.de-gallery .item .icon-info').on("click", function() {
             jQuery('.page-overlay').show();
             url = jQuery(this).attr("data-value");
             jQuery("#loader-area .project-load").load(url, function() {
                 jQuery("#loader-area").slideDown(500, function() {
                     jQuery('.page-overlay').hide();
                     jQuery('html, body').animate({
                         scrollTop: jQuery('#loader-area').offset().top - 70
                     }, 500, 'easeOutCubic');
                     //
                     jQuery(".image-slider").owlCarousel({
                         items: 1,
                         singleItem: true,
                         navigation: false,
                         pagination: true,
                         autoPlay: false
                     });
                     jQuery(".container").fitVids();
                     jQuery('#btn-close-x').on("click", function() {
                         jQuery("#loader-area").slideUp(500, function() {
                             jQuery('html, body').animate({
                                 scrollTop: jQuery('#section-portfolio').offset().top - 70
                             }, 500, 'easeOutCirc');
                         });
                         return false;
                     });
                 });
             });
         });
         jQuery('.de-gallery .item').on("click", function() {
             $('#navigation').show();
         });
         // btn arrow up
         jQuery(".arrow-up").on("click", function() {
             jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
                 jQuery("#hide-content").fadeIn(600, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '-40px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '0'
                     }, "slow");
                 });
             });
         });
         // btn arrow down
         jQuery(".arrow-down").on("click", function() {
             jQuery("#hide-content").fadeOut("slow", function() {
                 jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
                     jQuery('.arrow-up').animate({
                         'bottom': '0px'
                     }, "slow");
                     jQuery('.arrow-down').animate({
                         'top': '-40'
                     }, "slow");
                 });
             });
         });

         jQuery(".d-item_like").on("click", function() {
             var iteration = $(this).data('iteration') || 1;
             
             switch (iteration) {
                 case 1:
                     $(this).find("i").addClass("active");
                     var val = parseInt($(this).find("span").text())+1;
                     $(this).find("span").text(val);
                     break;
                 case 2:
                     $(this).find("i").removeClass("active");
                     var val = parseInt($(this).find("span").text())-1;
                     $(this).find("span").text(val);                   
                     break;
             }
             iteration++;
             if (iteration > 2) iteration = 1;
             $(this).data('iteration', iteration);
         });


         /* --------------------------------------------------
          after window load
          * --------------------------------------------------*/
         
        setTimeout(function () {
        $("#cookieConsent").fadeIn(400);
         }, 2000);
        $("#closeCookieConsent, .cookieConsentOK").click(function() {
            $("#cookieConsent").fadeOut(400);
        });

        $(".switch-with-title .checkbox").change(function() {
            if(this.checked) {
                jQuery(this).parent().parent().find('.hide-content').show();
            }else{
                jQuery(this).parent().parent().find('.hide-content').hide();
            }
        });

         video_autosize();
         filter_gallery();
         masonry();
         custom_bg();
         menu_arrow();
         load_owl();
         custom_elements();
         init(); 
         
         new WOW().init();

         // one page navigation
         /**
          * This part causes smooth scrolling using scrollto.js
          * We target all a tags inside the nav, and apply the scrollto.js to it.
          */
         $("#homepage nav a, .scroll-to").on("click", function(evn) {
             if (this.href.indexOf('#') != -1) {
                 evn.preventDefault();
                 jQuery('html,body').scrollTo(this.hash, this.hash);
             }
         });
         sequence();
         sequence_a();
    
        $('.accordion-section-title').click(function(e){
         var currentAttrvalue = $(this).data('tab');
         if($(e.target).is('.active')){
             $(this).removeClass('active');
             $('.accordion-section-content:visible').slideUp(300);
         } else {
             $('.accordion-section-title').removeClass('active').filter(this).addClass('active');
             $('.accordion-section-content').slideUp(300).filter(currentAttrvalue).slideDown(300);
         }
        });

        $('#get_file,#get_file_2').click(function(){
            $('#upload_file').click();
         });

        $('#upload_file').change(function(){
            var file = $(this).val();
            var filename = file.replace(/^.*\\/, "");
            $('#file_name').text(filename);
         });

        jQuery.each(jQuery('textarea[data-autoresize]'), function() {
            var offset = this.offsetHeight - this.clientHeight;
         
            var resizeTextarea = function(el) {
                jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
            };
            jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
        });
        

         /* --------------------------------------------------
          * window | on resize
          * --------------------------------------------------*/
         $(window).resize(function() {
             init_resize();
             centerY();
             grid_gallery();
             $("#vehicle_type").hide();
         });

         /* --------------------------------------------------
          * window | on scroll
          * --------------------------------------------------*/
         jQuery(window).on("scroll", function() {
             /* functions */
             header_sticky();
             de_counter();
             de_progress();
             init();
             backToTop();
             moveItItemNow();

            /* scroll zoom */
            var scroll = $(window).scrollTop();
            $(".scroll-zoom").css({
                backgroundSize: (100 + scroll/15)  + "%",
                top: -(scroll/10)  + "%",
            });
             
             /* fade base scroll position */
             var target = $('.fadeScroll');
             var targetHeight = target.outerHeight();
             var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
             if (scrollPercent >= 0) {
                 target.css('opacity', scrollPercent);
             } else {
                 target.css('opacity', 0);
             }
             /* custom page with background on side
             jQuery('.side-bg').each(function() {
                 jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
             }); */
             /* go to anchor */
             jQuery('#mainmenu li a').each(function() {
                 var cur = jQuery(this);
                 if (this.href.indexOf('#') != -1) {
                     var href = jQuery(this).attr('href');
                    if (location.hash!=="") {
                         if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
                             clearTimeout($.data(this, "scrollCheck"));
                             $.data(this, "scrollCheck", setTimeout(function() {
                                 jQuery('#mainmenu li a').removeClass('active');
                                 cur.addClass('active');
                             }, 250));

                         }
                     }
                 }
             });
             
             // acc
             $('.toggle').click(function(e) {
                e.preventDefault();
              
                var $this = $(this);
              
                if ($this.next().hasClass('show')) {
                    $this.next().removeClass('show');
                    $this.next().slideUp(350);
                } else {
                    $this.parent().parent().find('li .inner').removeClass('show');
                    $this.parent().parent().find('li .inner').slideUp(350);
                    $this.next().toggleClass('show');
                    $this.next().slideToggle(350);
                }
            });



         });
         $(function() {
             "use strict";
             var x = 0;
             setInterval(function() {
                 x -= 1;
                 $('.bg-loop').css('background-position', x + 'px 0');
             }, 50);
         });

         // price range slider

         const rangeInput = document.querySelectorAll(".range-input input"),
           priceInput = document.querySelectorAll(".price-input input"),
           range = document.querySelector(".slider .progress");
         let priceGap = 0;

         priceInput.forEach((input) => {
           input.addEventListener("input", (e) => {
             let minPrice = parseInt(priceInput[0].value),
               maxPrice = parseInt(priceInput[1].value);

             if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
               if (e.target.className === "input-min") {
                 rangeInput[0].value = minPrice;
                 range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
               } else {
                 rangeInput[1].value = maxPrice;
                 range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
               }
             }
           });
         });

         rangeInput.forEach((input) => {
           input.addEventListener("input", (e) => {
             let minVal = parseInt(rangeInput[0].value),
               maxVal = parseInt(rangeInput[1].value);

             if (maxVal - minVal < priceGap) {
               if (e.target.className === "range-min") {
                 rangeInput[0].value = maxVal - priceGap;
               } else {
                 rangeInput[1].value = minVal + priceGap;
               }
             } else {
               priceInput[0].value = minVal;
               priceInput[1].value = maxVal;
               if($('body').hasClass('rtl')){
                range.style.right = (minVal / rangeInput[0].max) * 100 + "%";
                range.style.left = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
               }else{                
                range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
                range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
               }
             }
           });
         });
     });

    // scroll magic begin
    var new_scroll_position = 0;
    var last_scroll_position;
    var header = $("header");

    jQuery(window).on("scroll", function() {
      last_scroll_position = window.scrollY;

      // Scrolling down
      if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
        // header.removeClass('slideDown').addClass('nav-up');
        header.addClass("scroll-down");
        header.removeClass("nav-up");

      // Scrolling up
      } else if (new_scroll_position > last_scroll_position) {
        // header.removeClass('nav-up').addClass('slideDown');
        header.removeClass("scroll-down");
        header.addClass("nav-up");
      }

      new_scroll_position = last_scroll_position;
    });
    // scroll magic end

    $(window).on('load', function() {
        jQuery('#de-preloader').fadeOut(500);
        filter_gallery();
        load_owl();  
        window.dispatchEvent(new Event('resize'));


        $('.grid').isotope({
            itemSelector: '.grid-item'
        });
        grid_gallery();
    });
    
 })(jQuery);