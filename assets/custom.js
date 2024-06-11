/* click-tap-image-zoom */
"use strict";
/*!
jQuery Plugin developed by Mario Duarte
https://github.com/Mario-Duarte/image-zoom-plugin/
Simple jQuery plugin that converts an image into a click to zoom image
perfect for store products and galleries
*/
/*!
jQuery Plugin developed by Mario Duarte
https://github.com/Mario-Duarte/image-zoom-plugin/
Simple jQuery plugin that converts an image into a click to zoom image
perfect for store products and galleries
*/
"use strict";

/*!
jQuery Plugin developed by Mario Duarte
https://github.com/Mario-Duarte/image-zoom-plugin/
Simple jQuery plugin that converts an image into a click to zoom image
perfect for store products and galleries
*/
(function ($) {
  // Thanks to Mozilla for this polyfill
  // find out more on - https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/replaceWith
  function ReplaceWithPolyfill() {
    'use-strict'; // For safari, and IE > 10

    var parent = this.parentNode,
        i = arguments.length,
        currentNode;
    if (!parent) return;
    if (!i) // if there are no arguments
      parent.removeChild(this);

    while (i--) {
      // i-- decrements i and returns the value of i before the decrement
      currentNode = arguments[i];

      if (typeof currentNode !== 'object') {
        currentNode = this.ownerDocument.createTextNode(currentNode);
      } else if (currentNode.parentNode) {
        currentNode.parentNode.removeChild(currentNode);
      } // the value of "i" below is after the decrement


      if (!i) // if currentNode is the first argument (currentNode === arguments[0])
        parent.replaceChild(currentNode, this);else // if currentNode isn't the first
        parent.insertBefore(currentNode, this.previousSibling);
    }
  }

  if (!Element.prototype.replaceWith) {
    Element.prototype.replaceWith = ReplaceWithPolyfill;
  }

  if (!CharacterData.prototype.replaceWith) {
    CharacterData.prototype.replaceWith = ReplaceWithPolyfill;
  }

  if (!DocumentType.prototype.replaceWith) {
    DocumentType.prototype.replaceWith = ReplaceWithPolyfill;
  }

  const imageObj = {};

  $.fn.imageZoom = function (options) {
    // Default settings for the zoom level
    let settings = $.extend({
      zoom: 150
    }, options); // Main html template for the zoom in plugin

    imageObj.template = `
			<figure class="containerZoom" style="background-image:url('${this.attr('src')}'); background-size: ${settings.zoom}%;">
				<img id="imageZoom" src="${this.attr('src')}" alt="${this.attr('alt')}" data-index="${this.attr('data-index')}"/>
			</figure>
		`; // Where all the magic happens, This will detect the position of your mouse
    // in relation to the image and pan the zoomed in background image in the
    // same direction

    function zoomIn(e) {
      let zoomer = e.currentTarget;
      let x, y, offsetX, offsetY;
      e.offsetX ? offsetX = e.offsetX : offsetX = e.touches[0].pageX;
      e.offsetY ? offsetY = e.offsetY : offsetY = e.touches[0].pageX;
      x = offsetX / zoomer.offsetWidth * 100;
      y = offsetY / zoomer.offsetHeight * 100;
      $(zoomer).css({
        "background-position": `${x}% ${y}%`
      });
    } // Main function to attach all events after replacing the image tag with
    // the main template code


    function attachEvents(container) {
      container = $(container);
      container.on('click', function (e) {
        if ("zoom" in imageObj == false) {
          // zoom is not defined, let define it and set it to false
          imageObj.zoom = false;
        }

        if (imageObj.zoom) {
          imageObj.zoom = false;
          $(this).removeClass('active');
        } else {
          imageObj.zoom = true;
          $(this).addClass('active');
          zoomIn(e);
        }
      });
      container.on('mousemove', function (e) {
        imageObj.zoom ? zoomIn(e) : null;
      });
      container.on('mouseleave', function () {
        imageObj.zoom = false;
        $(this).removeClass('active');
      });
    }

    let newElm = $(this).replaceWith(imageObj.template);
    attachEvents($('.containerZoom')[$('.containerZoom').length - 1]); // return updated element to allow for jQuery chained events

    return newElm;
  };
})(jQuery);

/*!
*	@name: jquery-izoomify
*   @version: 1.0
*	@author: Carl Lomer Abia
*/

(function ($) {
    var defaults = {
        callback: false,
        target: false,
        duration: 120,
        magnify: 1.2,
        touch: true,
        url: false
    };

    var _izoomify = function (target, duration, magnify, url) {
        var xPos,
            yPos,
            $elTarget = $(target),
            $imgTarget = $elTarget.find('img:first'),
            imgOrigSrc = $imgTarget.attr('src'),
            imgSwapSrc,
            defaultOrigin = 'center top ' + 0 + 'px',
            resultOrigin,
            dUrl = 'data-izoomify-url',
            dMagnify = 'data-izoomify-magnify',
            dDuration = 'data-izoomify-duration',
            eClass = 'izoomify-in',
            eMagnify,
            eDuration;

        function imageSource(imgSource) {
            var _img = new Image();
            _img.src = imgSource;
            return _img.src;
        }

        function getImageAttribute($img, dataAttribute, defaultAttribute) {
            if ($img.attr(dataAttribute)) {
                return $img.attr(dataAttribute);
            }

            return defaultAttribute;
        }

        function getImageSource($img, dataImageSource, defaultImageSource) {
            if ($img.attr(dataImageSource)) {
                return imageSource($img.attr(dataImageSource));
            }

            return defaultImageSource ? imageSource(defaultImageSource) : false;
        }

        function getTouches(e) {
            return e.touches || e.originalEvent.touches;
        }

        imgSwapSrc = getImageSource($imgTarget, dUrl, url);

        eMagnify = getImageAttribute($imgTarget, dMagnify, magnify);

        eDuration = getImageAttribute($imgTarget, dDuration, duration);

        $elTarget
            .addClass(eClass)
            .css({
                'position': 'relative',
                'overflow': 'hidden'
            });

        $imgTarget.css({
            '-webkit-transition-property': '-webkit-transform',
            'transition-property': '-webkit-transform',
            '-o-transition-property': 'transform',
            'transition-property': 'transform',
            'transition-property': 'transform, -webkit-transform',
            '-webkit-transition-timing-function': 'ease',
            '-o-transition-timing-function': 'ease',
            'transition-timing-function': 'ease',
            '-webkit-transition-duration': eDuration + 'ms',
            '-o-transition-duration': eDuration + 'ms',
            'transition-duration': eDuration + 'ms',
            '-webkit-transform': 'scale(1)',
            '-ms-transform': 'scale(1)',
            'transform': 'scale(1)',
            '-webkit-transform-origin': defaultOrigin,
            '-ms-transform-origin': defaultOrigin,
            'transform-origin': defaultOrigin
        });

        return {
            moveStart: function (e, hasTouch) {
                var o = $(target).offset();

                if (hasTouch) {
                    e.preventDefault();
                    xPos = getTouches(e)[0].clientX - o.left;
                    yPos = getTouches(e)[0].clientY - o.top;
                } else {
                    xPos = e.pageX - o.left;
                    yPos = e.pageY - o.top;
                }

                resultOrigin = xPos + 'px ' + yPos + 'px ' + 0 + 'px';

                $imgTarget
                    .css({
                        '-webkit-transform': 'scale(' + eMagnify + ')',
                        '-ms-transform': 'scale(' + eMagnify + ')',
                        'transform': 'scale(' + eMagnify + ')',
                        '-webkit-transform-origin': resultOrigin,
                        '-ms-transform-origin': resultOrigin,
                        'transform-origin': resultOrigin
                    })
                    .attr('src', imgSwapSrc || imgOrigSrc);
            },
            moveEnd: function () {
                this.reset();
            },
            reset: function () {
                resultOrigin = defaultOrigin;

                $imgTarget
                    .css({
                        '-webkit-transform': 'scale(1)',
                        '-ms-transform': 'scale(1)',
                        'transform': 'scale(1)',
                        '-webkit-transform-origin': resultOrigin,
                        '-ms-transform-origin': resultOrigin,
                        'transform-origin': resultOrigin
                    })
                    .attr('src', imgOrigSrc);
            }
        }
    };

    $.fn.izoomify = function (options) {
        return this.each(function () {
            var settings = $.extend({}, defaults, options || {}),
                $target = settings.target && $(settings.target)[0] || this,
                src = this,
                $src = $(src),
                mouseStartEvents = 'mouseover.izoomify mousemove.izoomify',
                mouseEndEvents = 'mouseleave.izoomify mouseout.izoomify',
                touchStartEvents = 'touchstart.izoomify touchmove.izoomify',
                touchEndEvents = 'touchend.izoomify';

            var izoomify = _izoomify($target, settings.duration, settings.magnify, settings.url);

            function startEvent(e, hasTouch) {
                izoomify.moveStart(e, hasTouch);
            }

            function endEvent($src) {
                izoomify.moveEnd();

                if ($src) {
                    $src
                        .off(touchStartEvents)
                        .off(touchEndEvents);
                }
            }

            function resetImage() {
                izoomify.reset();
            }

            $src.one('izoomify.destroy', function () {

                $src.removeClass('izoomify-in');

                resetImage();

                $src
                    .off(mouseStartEvents)
                    .off(mouseEndEvents);

                if (settings.touch) {
                    $src
                        .off(touchStartEvents)
                        .off(touchStartEvents);
                }

                $target.style.position = '';
                $target.style.overflow = '';

            }.bind(this));

            $src
                .on(mouseStartEvents, function (e) {
                    startEvent(e);
                })
                .on(mouseEndEvents, function () {
                    endEvent();
                });

            if (settings.touch) {
                $src
                    .on(touchStartEvents, function (e) {
                        e.preventDefault();
                        startEvent(e, true);
                    })
                    .on(touchEndEvents, function () {
                        endEvent();
                    });
            }

            if ($.isFunction(settings.callback)) {
                settings.callback.call($src);
            }
        });
    };

    $.fn.izoomify.defaults = defaults;
}(window.jQuery));

/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

/*
 * jQuery Double Tap
 * Developer: Sergey Margaritov (github.com/attenzione)
 * License: MIT
 * Date: 22.10.2013
 * Based on jquery documentation http://learn.jquery.com/events/event-extensions/
 */

(function($){

  $.event.special.doubletap = {
    bindType: 'touchend',
    delegateType: 'touchend',

    handle: function(event) {
      var handleObj   = event.handleObj,
          targetData  = jQuery.data(event.target),
          now         = new Date().getTime(),
          delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
          delay       = delay == null ? 300 : delay;

      if (delta < delay && delta > 50) {
        targetData.lastTouch = null;
        event.type = handleObj.origType;
        ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
          event[property] = event.originalEvent.changedTouches[0][property];
        })

        // let jQuery handle the triggering of "doubletap" event handlers
        handleObj.handler.apply(this, arguments);
      } else {
        targetData.lastTouch = now;
      }
    }
  };

})(jQuery);

/**
 * Flickity fade v1.0.0
 * Fade between Flickity slides
 */

/* jshint browser: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'fizzy-ui-utils/utils',
    ], factory );
      } else if ( typeof module == 'object' && module.exports ) {
      // CommonJS
      module.exports = factory(
      require('flickity'),
      require('fizzy-ui-utils')
      );
      } else {
      // browser global
      factory(
      window.Flickity,
      window.fizzyUIUtils
      );
      }

      }( this, function factory( Flickity, utils ) {

      // ---- Slide ---- //

      var Slide = Flickity.Slide;

      var slideUpdateTarget = Slide.prototype.updateTarget;
      Slide.prototype.updateTarget = function() {
      slideUpdateTarget.apply( this, arguments );
      if ( !this.parent.options.fade ) {
      return;
      }
      // position cells at selected target
      var slideTargetX = this.target - this.x;
      var firstCellX = this.cells[0].x;
           this.cells.forEach( function( cell ) {
      var targetX = cell.x - firstCellX - slideTargetX;
      cell.renderPosition( targetX );
    });
  };

  Slide.prototype.setOpacity = function( alpha ) {
    this.cells.forEach( function( cell ) {
      cell.element.style.opacity = alpha;
    });
  };

  // ---- Flickity ---- //

  var proto = Flickity.prototype;

  Flickity.createMethods.push('_createFade');

  proto._createFade = function() {
    this.fadeIndex = this.selectedIndex;
    this.prevSelectedIndex = this.selectedIndex;
    this.on( 'select', this.onSelectFade );
    this.on( 'dragEnd', this.onDragEndFade );
    this.on( 'settle', this.onSettleFade );
    this.on( 'activate', this.onActivateFade );
    this.on( 'deactivate', this.onDeactivateFade );
  };

  var updateSlides = proto.updateSlides;
  proto.updateSlides = function() {
    updateSlides.apply( this, arguments );
    if ( !this.options.fade ) {
      return;
    }
    // set initial opacity
    this.slides.forEach( function( slide, i ) {
      var alpha = i == this.selectedIndex ? 1 : 0;
      slide.setOpacity( alpha );
    }, this );
  };

  /* ---- events ---- */

  proto.onSelectFade = function() {
    // in case of resize, keep fadeIndex within current count
    this.fadeIndex = Math.min( this.prevSelectedIndex, this.slides.length - 1 );
    this.prevSelectedIndex = this.selectedIndex;
  };

  proto.onSettleFade = function() {
    delete this.didDragEnd;
    if ( !this.options.fade ) {
      return;
    }
    // set full and 0 opacity on selected & faded slides
    this.selectedSlide.setOpacity( 1 );
    var fadedSlide = this.slides[ this.fadeIndex ];
    if ( fadedSlide && this.fadeIndex != this.selectedIndex ) {
      this.slides[ this.fadeIndex ].setOpacity( 0 );
    }
  };

  proto.onDragEndFade = function() {
    // set flag
    this.didDragEnd = true;
  };

  proto.onActivateFade = function() {
    if ( this.options.fade ) {
      this.element.classList.add('is-fade');
    }
  };

  proto.onDeactivateFade = function() {
    if ( !this.options.fade ) {
      return;
    }
    this.element.classList.remove('is-fade');
    // reset opacity
    this.slides.forEach( function( slide ) {
      slide.setOpacity('');
    });
  };

  /* ---- position & fading ---- */

  var positionSlider = proto.positionSlider;
  proto.positionSlider = function() {
    if ( !this.options.fade ) {
      positionSlider.apply( this, arguments );
      return;
    }

    this.fadeSlides();
    this.dispatchScrollEvent();
  };

  var positionSliderAtSelected = proto.positionSliderAtSelected;
  proto.positionSliderAtSelected = function() {
    if ( this.options.fade ) {
      // position fade slider at origin
      this.setTranslateX( 0 );
    }
    positionSliderAtSelected.apply( this, arguments );
  };

  proto.fadeSlides = function() {
    if ( this.slides.length < 2 ) {
      return;
    }
    // get slides to fade-in & fade-out
    var indexes = this.getFadeIndexes();
    var fadeSlideA = this.slides[ indexes.a ];
    var fadeSlideB = this.slides[ indexes.b ];
    var distance = this.wrapDifference( fadeSlideA.target, fadeSlideB.target );
    var progress = this.wrapDifference( fadeSlideA.target, -this.x );
    progress = progress / distance;

    fadeSlideA.setOpacity( 1 - progress );
    fadeSlideB.setOpacity( progress );

    // hide previous slide
    var fadeHideIndex = indexes.a;
    if ( this.isDragging ) {
      fadeHideIndex = progress > 0.5 ? indexes.a : indexes.b;
    }
    var isNewHideIndex = this.fadeHideIndex != undefined &&
        this.fadeHideIndex != fadeHideIndex &&
        this.fadeHideIndex != indexes.a &&
        this.fadeHideIndex != indexes.b;
    if ( isNewHideIndex ) {
      // new fadeHideSlide set, hide previous
      this.slides[ this.fadeHideIndex ].setOpacity( 0 );
    }
    this.fadeHideIndex = fadeHideIndex;
  };

  proto.getFadeIndexes = function() {
    if ( !this.isDragging && !this.didDragEnd ) {
      return {
        a: this.fadeIndex,
        b: this.selectedIndex,
      };
    }
    if ( this.options.wrapAround ) {
      return this.getFadeDragWrapIndexes();
    } else {
      return this.getFadeDragLimitIndexes();
    }
  };

  proto.getFadeDragWrapIndexes = function() {
    var distances = this.slides.map( function( slide, i ) {
      return this.getSlideDistance( -this.x, i );
    }, this );
    var absDistances = distances.map( function( distance ) {
      return Math.abs( distance );
    });
    var minDistance = Math.min.apply( Math, absDistances );
    var closestIndex = absDistances.indexOf( minDistance );
    var distance = distances[ closestIndex ];
    var len = this.slides.length;

    var delta = distance >= 0 ? 1 : -1;
    return {
      a: closestIndex,
      b: utils.modulo( closestIndex + delta, len ),
    };
  };

  proto.getFadeDragLimitIndexes = function() {
    // calculate closest previous slide
    var dragIndex = 0;
    for ( var i=0; i < this.slides.length - 1; i++ ) {
      var slide = this.slides[i];
      if ( -this.x < slide.target ) {
        break;
      }
      dragIndex = i;
    }
    return {
      a: dragIndex,
      b: dragIndex + 1,
    };
  };

  proto.wrapDifference = function( a, b ) {
    var diff = b - a;

    if ( !this.options.wrapAround ) {
      return diff;
    }

    var diffPlus = diff + this.slideableWidth;
    var diffMinus = diff - this.slideableWidth;
    if ( Math.abs( diffPlus ) < Math.abs( diff ) ) {
      diff = diffPlus;
    }
    if ( Math.abs( diffMinus ) < Math.abs( diff ) ) {
      diff = diffMinus;
    }
    return diff;
  };

  // ---- wrapAround ---- //

  var _getWrapShiftCells = proto._getWrapShiftCells;
  proto._getWrapShiftCells = function() {
    if ( !this.options.fade ) {
      _getWrapShiftCells.apply( this, arguments );
    }
  };

  var shiftWrapCells = proto.shiftWrapCells;
  proto.shiftWrapCells = function() {
    if ( !this.options.fade ) {
      shiftWrapCells.apply( this, arguments );
    }
  };

  return Flickity;

}));

/*!
 * Flickity imagesLoaded v2.0.0
 * enables imagesLoaded option for Flickity
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'flickity/js/index',
      'imagesloaded/imagesloaded'
    ], function( Flickity, imagesLoaded ) {
      return factory( window, Flickity, imagesLoaded );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('flickity'),
      require('imagesloaded')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.imagesLoaded
    );
  }

}( window, function factory( window, Flickity, imagesLoaded ) {
'use strict';

Flickity.createMethods.push('_createImagesLoaded');

var proto = Flickity.prototype;

proto._createImagesLoaded = function() {
  this.on( 'activate', this.imagesLoaded );
};

proto.imagesLoaded = function() {
  if ( !this.options.imagesLoaded ) {
    return;
  }
  var _this = this;
  function onImagesLoadedProgress( instance, image ) {
    var cell = _this.getParentCell( image.img );
    _this.cellSizeChange( cell && cell.element );
    if ( !_this.options.freeScroll ) {
      _this.positionSliderAtSelected();
    }
  }
  imagesLoaded( this.slider ).on( 'progress', onImagesLoadedProgress );
};

return Flickity;

}));

/*
*	Genemco Collection Filter Js
*/

(function($){

  function URLToArray(url) {
    var request = Array();
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
      if(!pairs[i])
        continue;
      var pair = pairs[i].split('=');
      var obj = {};
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      request.push(obj);
    }
    return request;
  }

  $(document).ready(function($) {
    
    //Product Page Mobile Image

//     $(document).on('click', '.product-gallery__carousel-item img', function(e) {
      
//       if (window.innerWidth < 1000) {
//         var _this = $(this);
//         $('html').addClass('noscroll');
//         $('#product-mobile-image-gallery').css({"display": "block", "visibility": "visible", "opacity": 1});
        
//         var productMobileImageGalleryMain = new Flickity('#product-mobile-image-gallery-main .product-mobile-slider-wrapper', {
//           draggable: true,
//           pageDots: false,
//           prevNextButtons: false,
//           on: {
//             ready: function() {
//               setTimeout(function(){
//                 productMobileImageGalleryMain.select( _this.closest('.product-gallery__carousel-item.is-selected').index() );
//                 $('#product-mobile-image-gallery').css({"opacity": 1});
//               }, 300);
//             },
//             change: function( index ) {
//               productMobileImageGalleryThumbnail.select( index );
//             }
//           }
//         });

//         var productMobileImageGalleryThumbnail = new Flickity('#product-mobile-image-gallery-thumbnail .product-mobile-slider-wrapper', {
//           draggable: true,
//           pageDots: false,
//           prevNextButtons: false,
//           cellAlign: 'left',
//           on: {
//             staticClick: function(event, pointer, cellElement, cellIndex) {
//               if ( typeof cellIndex == 'number' ) {
//                 productMobileImageGalleryMain.options.draggable = true;
//                 productMobileImageGalleryMain.updateDraggable();
//                 $('#product-mobile-image-gallery-main').removeClass('mobile-zoom-enabled');
//                 $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
//                 productMobileImageGalleryThumbnail.select( cellIndex );
//                 productMobileImageGalleryMain.select( cellIndex );
//               }
//             }
//           }
//         });
        

//         $('.product-mobile-slider-back').on('click', function(e) {
//           productMobileImageGalleryMain.destroy();
//           productMobileImageGalleryThumbnail.destroy();
//           $('html').removeClass('noscroll');
//           $('#product-mobile-image-gallery-main').removeClass('mobile-zoom-enabled');
//           $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
//           $('#product-mobile-image-gallery').css({"display": "none", "visibility": "visible"});
//           $('#product-mobile-image-gallery-main').off('touchstart');
//           $('#product-mobile-image-gallery-main').off('touchmove');
//           $('#product-mobile-image-gallery .product-mobile-image-gallery-item img').off('click');
//         });
		
//         $('#product-mobile-image-gallery .product-mobile-image-gallery-item img').on('click', function() {
//           productMobileImageGalleryMain.options.draggable = !productMobileImageGalleryMain.options.draggable;
//           productMobileImageGalleryMain.updateDraggable();
//           $('#product-mobile-image-gallery-main').toggleClass('mobile-zoom-enabled');

//           if(!$('#product-mobile-image-gallery-main').hasClass('mobile-zoom-enabled')) {
//             $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
//             $('#product-mobile-image-gallery-main').off('touchstart');
//             $('#product-mobile-image-gallery-main').off('touchmove');
//           } else {
//             $('#product-mobile-image-gallery-main.mobile-zoom-enabled').on('touchstart', function(e) {
//               var xPos = e.originalEvent.touches[0].pageX;
//               var yPos = e.originalEvent.touches[0].pageY;
//               var currTrans = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css('transform').split(/[()]/)[1];
//               var crrTransX = parseInt(currTrans.split(',')[4]);
//               var crrTransY = parseInt(currTrans.split(',')[5]);

//               $('#product-mobile-image-gallery-main.mobile-zoom-enabled').on('touchmove', function(e) {
//                 var transX = e.originalEvent.touches[0].pageX - xPos + crrTransX;
//                 var transY = e.originalEvent.touches[0].pageY - yPos + crrTransY;
//                 var halfWidth = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').innerWidth() / 2;
//                 var halfHeight = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').innerHeight() / 2;

//                 transX = ((-halfWidth < transX) && (transX < halfWidth)) ? transX : ((-halfWidth >= transX) ? -halfWidth : halfWidth);
//                 transY = ((-halfHeight < transY) && (transY < halfHeight)) ? transY : ((-halfHeight >= transY) ? -halfHeight : halfHeight);

//                 var translate = "translate(" + transX + "px, " + transY + "px)";
//                 $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css({"transform": translate});

//                 xPos = e.originalEvent.touches[0].pageX;
//                 yPos = e.originalEvent.touches[0].pageY;
//                 currTrans = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css('transform').split(/[()]/)[1];
//                 crrTransX = parseInt(currTrans.split(',')[4]);
//                 crrTransY = parseInt(currTrans.split(',')[5]);
//               });
//             }); 
//           }
//         });
        
//       }
//     });
    
    $(document).on('click', '.product-gallery__carousel-item, .product-gallery__thumbnail-video, .product-gallery__thumbnail-attachment', function(e) {
      if (window.innerWidth < 1000) {
      	$('body').addClass('noscroll');
      } else {
        console.log($('.product-thumbnail-popup-image__slider-item img'));
        $('.product-thumbnail-popup-image__slider-item > div').izoomify({
          magnify: 2.5
        });
      }
      
      console.log("aaa");
      
      if (window.innerWidth > 0 ) {
        e.preventDefault();
        console.log(e);
        
        let mediaType = $(this).data('media-type');
        let mediaId = $(this).data('media-id');
        console.log(mediaType);
        console.log(mediaId);
        //Off all clicks
        $('.product-thumbnail-popup-close').off('click');
        $('.product-thumbnail-popup-back').off('click');
        $(document).off('click', '.product-thumbnail-popup-background');
        $(document).off('click', '.product-thumbnail-popup-image-arrows')
        $(document).off('click', '.popup-media-thumb img');
        $(document).off('click', '.popup-image-thumb img');
        $(document).off('click', '.popup-pdf-thumb img');
        $(document).off('click', '.product-thumbnail-tabs .tab-item a');

        $('#product-desktop-thumbnail-popup').css({"display": "block", "visibility": "visible", "opacity": 1});

        $('.product-thumbnail-popup-close, .product-thumbnail-popup-back').on('click', function(e) {
          $(this).closest('#product-desktop-thumbnail-popup').find('.product-thumbnail-popup-background').trigger('click');
        });

        let $videos = $('#popup-videos');
        if($videos.length) {
          if ($('.popup-media-thumbs').length) {
            let firstVideoUrl = $videos.find('.popup-media-thumb img').first().data('media-url') + '&autoplay=1&mute=1';
            let firstVideoAspect = $videos.find('.popup-media-thumb img').first().data('media-aspect')
            let $iframe = $videos.find('iframe');
            let $videoWrapper = $('.product-tumbnail-popup-iframe');
            let maxHeight = parseFloat($('#popup-videos .product-thumbanil-popup-left').height());
            var height = parseFloat($videoWrapper.width() / parseFloat(firstVideoAspect));
            if (height <= maxHeight) {
              $('.product-tumbnail-popup-iframe').css('height', height + 'px'); 
            } else {
              height = maxHeight;
              let width = height * parseFloat(firstVideoAspect);
              $('.product-tumbnail-popup-iframe').css({'height': height + 'px', 'width': width + 'px'}); 
            }
            if ($iframe.attr('src') == '') {
              $iframe.attr('src', firstVideoUrl); 
            } 
          } else {
            $('.product-tumbnail-popup-iframe').empty().append(`<h2>No video available</h2>`);
          }
        } else {
          //           $videoWrapper.empty().append(`<h2>No video available</h2>`);
        }

        let $images = $('#popup-images');
        if($images.length) {
          let firstImageUrl = $images.find('.popup-image-thumb img').first().data('image-url');
          let firstImageIndex = $images.find('.popup-image-thumb img').first().data('image-index');
          let $popupImage = $images.find('.product-thumbnail-popup-image img');
          if ($popupImage.attr('src') == '') {
            $popupImage.attr('src', firstImageUrl);
            $popupImage.attr('data-index', firstImageIndex); 
          }
        }

        // Close popup
        $(document).on('click', '.product-thumbnail-popup-background', function(e) {
          $('body').removeClass('noscroll');
          $('#product-desktop-thumbnail-popup').css({"display": "none", "visibility": "visible"});
        });

        // Next and Prev popup image
        $(document).on('click', '.product-thumbnail-popup-image-arrows .arrow-prev, .product-thumbnail-popup-image-arrows .arrow-next', function(e) {
          const $this = $(this);
          const $images = $('#popup-images');
          const direction = ($(e.target).hasClass('arrow-prev')) ? -1 : 1;
          const currentIndex = parseInt($images.find('.product-thumbnail-popup-image .product-thumbnail-popup-image__slider-item.is-active img').attr('data-index'));
          const targetIndex = currentIndex + direction;
          const targetElementSelector = '.popup-image-thumb img[data-image-index=' + targetIndex + ']';
          const target = $images.find(targetElementSelector);
          console.log(currentIndex);

          if ( target.length ) {
            target.trigger('click');
          }

        });

        $(document).on('click', '.popup-media-thumb img', function(e) {
          let $this = $(this);
          let videoUrl = $this.data('media-url') + '&autoplay=1&mute=1';
          let videoAspect = $this.data('media-aspect')
          let $iframe = $('.product-tumbnail-popup-iframe iframe');
          let $videoWrapper = $('.product-tumbnail-popup-iframe');
          let paddingTop = $videoWrapper.width() / parseFloat(videoAspect);
          $('.product-tumbnail-popup-iframe').css('padding-top', paddingTop + 'px');
          $iframe.attr('src', videoUrl);
          $('.popup-media-thumb').removeClass('is-active');
          $this.closest('.popup-media-thumb').addClass('is-active');
        });

        $(document).on('click', '.popup-image-thumb img', function(e) {
          let $this = $(this);
          let imageUrl = $this.data('image-url');
          let mediaId = $this.closest('.popup-image-thumbs').attr('data-media-id');
          $('.product-thumbnail-popup-image__slider-item').removeClass('is-active');
          $(`.product-thumbnail-popup-image__slider-item[data-media-id="${mediaId}"]`).addClass('is-active');
          console.log(`.product-thumbnail-popup-image__slider-item[data-media-id="${mediaId}"]`);
//           let imageIndex = $this.data('image-index');
//           var $popupImage = $('<img src="" data-index="">');
//           $popupImage.attr('src', imageUrl);
//           $popupImage.attr('data-index', imageIndex);
//           $('.product-thumbnail-popup-image').empty().append($popupImage);
//           $popupImage.imageZoom({zoom: 200});
          $('.popup-image-thumbs').removeClass('is-active');
          $this.closest('.popup-image-thumbs').addClass('is-active');
        });

        $(document).on('click', '.popup-pdf-thumb img', function(e) {
          let $this = $(this);
          let pdfUrl = $this.data('pdf-url');
          let pdfName = $this.data('pdf-name');
          let $pdfIframe = $('.product-tumbnail-popup-pdf iframe');
          $('.popup-pdf-thumbs').removeClass('is-active');
          $this.closest('.popup-pdf-thumbs').addClass('is-active');
          $pdfIframe.attr('src', pdfUrl);
          $pdfIframe.attr('data-pdf-name', pdfName);
          
          //Change product url params
          const url = new URL(window.location);
          url.searchParams.set('pdf', pdfName);
          window.history.pushState({}, '', url);
          document.querySelector('[rel="canonical"]').setAttribute('href', window.location.href);
        });

        $(document).on('click', '.product-thumbnail-tabs .tab-item a', function(e) {
          e.preventDefault();
          let href = $(this).attr('href');
          $('.product-thumbnail-tabs .tab-item').removeClass('is-active');
          $(this).parent('.tab-item').addClass('is-active');
          $('.product-thumbnail-popup-content').addClass('hidden');
          $(href).removeClass('hidden');

          let videoAspect = $('.popup-media-thumb.is-active img').data('media-aspect');
          let $videoWrapper = $('.product-tumbnail-popup-iframe');
          let paddingTop = $videoWrapper.width() / parseFloat(videoAspect);
          $('.product-tumbnail-popup-iframe').css('padding-top', paddingTop + 'px');
          
          if ($(e.target).attr('href') == "#popup-pdfs") {
            let pdfName = $('#popup-pdfs iframe').attr("data-pdf-name");
            $('#popup-pdfs .popup-pdf-thumbs').removeClass('is-active');
            $($(`#popup-pdfs .popup-pdf-thumbs img[data-pdf-name="${pdfName}"]`).closest('.popup-pdf-thumbs')).addClass('is-active');
            const url = new URL(window.location);
            url.searchParams.set('pdf', pdfName);
            window.history.pushState({}, '', url);
            document.querySelector('[rel="canonical"]').setAttribute('href', window.location.href);
            console.log(pdfName);
          }
          
        });

        if (mediaType == 'image') {
          $(`.product-thumbnail-tabs .tab-item a[href="#popup-images"]`).trigger('click');
          let targetMedia = $(`.popup-image-thumbs[data-media-id="${mediaId}"] img`).trigger('click');
        } else if (mediaType == 'external_video') {
        	$(`.product-thumbnail-tabs .tab-item a[href="#popup-videos"]`).trigger('click');  
        } else if (mediaType == 'attachment') {
        	$(`.product-thumbnail-tabs .tab-item a[href="#popup-pdfs"]`).trigger('click');  
        }
      }
      
      if (window.innerWidth < 1000) {
        var _this = $(this);
        $('#product-desktop-thumbnail-popup').css({"display": "block", "visibility": "visible", "opacity": 1});
        
        var productMobileImageGalleryMain = new Flickity('#product-mobile-image-gallery-main .product-mobile-slider-wrapper', {
          draggable: true,
          pageDots: false,
          prevNextButtons: true,
          imagesLoaded: true,
          on: {
            ready: function() {
              setTimeout(function(){
                productMobileImageGalleryMain.select( _this.closest('.product-gallery__carousel-item.is-selected').index() );
                $('#product-mobile-image-gallery').css({"opacity": 1});
              }, 300);
            },
            bgLazyLoad: function(event, cellElement) {
            	productMobileImageGalleryMain.resize();
            },
            change: function( index ) {
              productMobileImageGalleryThumbnail.select( index );
            }
          }
        });
        
        var productMobileImageGalleryThumbnail = new Flickity('#product-mobile-image-gallery-thumbnail .product-mobile-slider-wrapper', {
          draggable: true,
          pageDots: false,
          prevNextButtons: false,
          cellAlign: 'left',
          on: {
            staticClick: function(event, pointer, cellElement, cellIndex) {
              if ( typeof cellIndex == 'number' ) {
                productMobileImageGalleryMain.options.draggable = true;
                productMobileImageGalleryMain.updateDraggable();
                $('#product-mobile-image-gallery-main').removeClass('mobile-zoom-enabled');
                $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
                productMobileImageGalleryThumbnail.select( cellIndex );
                productMobileImageGalleryMain.select( cellIndex );
              }
            }
          }
        });


        //         $('.product-mobile-slider-back').on('click', function(e) {
        //           productMobileImageGalleryMain.destroy();
        //           productMobileImageGalleryThumbnail.destroy();
        //           $('html').removeClass('noscroll');
        //           $('#product-mobile-image-gallery-main').removeClass('mobile-zoom-enabled');
        //           $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
        //           $('#product-mobile-image-gallery').css({"display": "none", "visibility": "visible"});
        //           $('#product-mobile-image-gallery-main').off('touchstart');
        //           $('#product-mobile-image-gallery-main').off('touchmove');
        //           $('#product-mobile-image-gallery .product-mobile-image-gallery-item img').off('click');
        //         });

        $('#product-mobile-image-gallery .product-mobile-image-gallery-item img').on('click', function() {
          productMobileImageGalleryMain.options.draggable = !productMobileImageGalleryMain.options.draggable;
          productMobileImageGalleryMain.updateDraggable();
          $('#product-mobile-image-gallery-main').toggleClass('mobile-zoom-enabled');

          if(!$('#product-mobile-image-gallery-main').hasClass('mobile-zoom-enabled')) {
            $('#product-mobile-image-gallery-main').css({"transform": "translate(0, 0)"});
            $('#product-mobile-image-gallery-main').off('touchstart');
            $('#product-mobile-image-gallery-main').off('touchmove');
          } else {
            $('#product-mobile-image-gallery-main.mobile-zoom-enabled').on('touchstart', function(e) {
              var xPos = e.originalEvent.touches[0].pageX;
              var yPos = e.originalEvent.touches[0].pageY;
              var currTrans = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css('transform').split(/[()]/)[1];
              var crrTransX = parseInt(currTrans.split(',')[4]);
              var crrTransY = parseInt(currTrans.split(',')[5]);

              $('#product-mobile-image-gallery-main.mobile-zoom-enabled').on('touchmove', function(e) {
                var transX = e.originalEvent.touches[0].pageX - xPos + crrTransX;
                var transY = e.originalEvent.touches[0].pageY - yPos + crrTransY;
                var halfWidth = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').innerWidth() / 2;
                var halfHeight = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').innerHeight() / 2;

                transX = ((-halfWidth < transX) && (transX < halfWidth)) ? transX : ((-halfWidth >= transX) ? -halfWidth : halfWidth);
                transY = ((-halfHeight < transY) && (transY < halfHeight)) ? transY : ((-halfHeight >= transY) ? -halfHeight : halfHeight);

                var translate = "translate(" + transX + "px, " + transY + "px)";
                $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css({"transform": translate});

                xPos = e.originalEvent.touches[0].pageX;
                yPos = e.originalEvent.touches[0].pageY;
                currTrans = $('#product-mobile-image-gallery-main.mobile-zoom-enabled').css('transform').split(/[()]/)[1];
                crrTransX = parseInt(currTrans.split(',')[4]);
                crrTransY = parseInt(currTrans.split(',')[5]);
              });
            }); 
          }
        });

      }
    });
    
    
    //Show PDF popup if product url has pdf parameter
    const urlParams = new URLSearchParams(window.location.search);
	const pdfParam = urlParams.get('pdf');
    console.log(pdfParam);
    if (pdfParam != null ) {
      const pdfUrl = $(`.popup-pdf-thumb img[data-pdf-name="${pdfParam}"]`).attr('data-pdf-url');
      $(`#popup-pdfs iframe`).attr('src', pdfUrl);
      $(`#popup-pdfs iframe`).attr('data-pdf-name', pdfParam);
      $('#popup-pdfs .popup-pdf-thumbs').removeClass('is-active');
	  $($(`#popup-pdfs .popup-pdf-thumbs img[data-pdf-name="${pdfParam}"]`).closest('.popup-pdf-thumbs')).addClass('is-active');
      $('.product-gallery__thumbnail-attachment').trigger('click');
//       console.log(pdfUrl);
    }

    // Genemco Custom Product Filter
    window.golbalBoostFilters = {};
    window.updateGenemcoFilters = function(data) {

      //Build Genemco Filter
      let genemcoCollectionFilters = null;
      if (window.innerWidth < 1000) {
      	genemcoCollectionFilters = $('#mobile-genemco-collection-filter .genemco-filter-row');  
      } else {
        genemcoCollectionFilters = $('#desktop-genemco-collection-filter .genemco-filter-row'); 
      }
      var boostFilters = {};
      var boostFilterLabels = {};

      if ('filter' in data) {
        data.filter.options.forEach((v, i) => {
          const filterName = v.filterType.replace('metafield_::Genemco::', '');
          boostFilters[filterName] = v.values;
          if (v.displayType == 'range') {
            boostFilterLabels[filterName] = v.filterOptionId.replaceAll('_', '-');
          } else {
            boostFilterLabels[filterName] = v.label.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, " ").trim().replaceAll(/\s+/g, '-'); 
          }
        }); 
        Object.assign(window.golbalBoostFilters, boostFilters);
      } else {
        Object.assign(boostFilters, window.golbalBoostFilters);
      }
      
      console.log(data.filter.options);
      console.log('boostFilterLabels', boostFilterLabels);
      console.log(boostFilters);
      
      $('.genemco-filter-group').hide();

      if ( genemcoCollectionFilters.length ) {
        genemcoCollectionFilters.each((i, e) => {
          let _$e = $(e);
          let _$valuesContainer = _$e.find('.genemco-filter-option-values');
          const filterName = _$e.data('filter');
          const filterType = _$e.data('filter-type');
          _$valuesContainer.empty();
          _$e.hide();
          if ( filterName in boostFilters ) {
            switch (filterType) {
              case 'checkbox':
                var selector = '.boost-pfs-filter-option-' + boostFilterLabels[filterName] + ' .boost-pfs-filter-option-content';
                var boostTree = _$e.parents('.genemco_collection-filter-wrapper').prev('.boost-pfs-filter-tree');
                var timerCount = 0;
                var timer = setInterval(function() {
                  var boostTextbox = boostTree.find(selector);
                  timerCount++;
                  if (boostTextbox.length ) {
                    _$e.addClass('boost-pfs-filter-option-' + boostFilterLabels[filterName] + " boost-pfs-filter-option boost-pfs-filter-option-list boost-pfs-filter-has-scrollbar");
                    _$e.find('.boost-pfs-filter-option-content').remove();
                    boostTextbox.appendTo(_$e);
                    _$e.show();
                    _$e.closest('.genemco-filter-group').show();
                    clearInterval(timer);
                  } else if (timerCount > 100) {
                    clearInterval(timer);
                  }
                }, 500);
                break;
              case 'rangeslider':
                var selector = '.boost-pfs-filter-option-' + boostFilterLabels[filterName] + ' .boost-pfs-filter-option-content';
                var boostTree = _$e.parents('.genemco_collection-filter-wrapper').prev('.boost-pfs-filter-tree');
                var selectorID = `#boost-pfs-filter-tree-${boostFilterLabels[filterName]}`;
                console.log('selectorID', selectorID);
                var timerCount = 0;
                var timer = setInterval(function() {
                  var boostRangeSlider = boostTree.find(selectorID);
                  timerCount++;
                  if ( boostRangeSlider.length ) {
                    _$e.find('.boost-pfs-filter-option-content').remove();
                    boostRangeSlider.appendTo(_$e);                  
                    _$e.show();
                    _$e.closest('.genemco-filter-group').show();
                    console.log('found');
                    clearInterval(timer);
                  } else if (timerCount > 1000) {
                    clearInterval(timer);
                  }
                }, 500);               
                break;
              default:
                break;
            } 
            delete boostFilters[filterName];
            // _$e.show();
          } else {
           	_$e.remove(); 
          }
        });

        var genemcoRefinedTimeout = 0;
        var genemcoRefinedTimer = setInterval(function() {
          if (genemcoRefinedTimeout > 100) {
            clearInterval(genemcoRefinedTimer);
          } else {
            $('#genemco-filter-refined-by').empty();
            genemcoCollectionFilters.parents('.genemco_collection-filter-wrapper').prev('.boost-pfs-filter-tree').find('.boost-pfs-filter-refine-by-wrapper .boost-pfs-filter-refine-by').appendTo('#genemco-filter-refined-by'); 
            clearInterval(genemcoRefinedTimer);
          }
          genemcoRefinedTimeout++;
        }, 300);

      }


      $('.genemco-collection-filter').removeClass('disabled');
    }



    $(document).on('click', '.genemco-filter-option-values li input[type="checkbox"]', function(e) {

      var filter = $(this).data('boost-class');
      var filterValue = $(this).closest('li').find('input').val().toLowerCase();
      var filterClass = 'boost-pfs-filter-option-' + filter;
      var filterBoostTree = $(this).parents('.genemco_collection-filter-wrapper').prev('.boost-pfs-filter-tree');
      $.each($(filterBoostTree).find('.' + filterClass + ' .boost-pfs-filter-option-value'), (index, element) => {
        if ($(element).text().toLowerCase() == filterValue) {

          $('.genemco-collection-filter').addClass('disabled');
          $(element).closest('.boost-pfs-filter-button').trigger('click');

        }
      });
    });

    $(document).on('click', '.refine-by-item.boost-pfs-filter-option-label', function(e) {
      var key = $(this).find('.refine-by-type span').val();
      var value = $(this).find('.refine-by-type strong').val();
      console.log(key, value);
    });

    //Show Product image when thumbnail hover
    $('.product-gallery__thumbnail-list > a.product-gallery__thumbnail').mouseenter(function(e) {
      $(this).find('img').trigger('click');
    });

  });

  //Homepage Logo slider section
  $(document).ready(function($) {
    $.each($('.home-logo-carousel_container'), (idx, ele) => {
      var settings = $(ele).data('settings');
      new Flickity(ele, {
        cellAlign: 'center',
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        autoPlay: 2500,
        pauseAutoPlayOnHover: false,
        fade: false
      });
    });
  });

   $.each($('.home-logo-carousel_container'), (idx, ele) => {
      var settings = $(ele).data('settings');
      new Flickity(ele, {
        cellAlign: 'center',
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        autoPlay: 2500,
        pauseAutoPlayOnHover: false,
        fade: false
      });
    });
  


  //Filter slider accordian
  jQuery(document).ready(function($) {
    $('.filter-accordian .filter-accordian-title').on('click', function(e) {
      $(this).closest('.filter-accordian').find('.genemco-filter-row').toggleClass('show');
      $(this).closest('.filter-accordian.genemco-filter-row').find('.boost-pfs-filter-option-content').toggleClass('active');
    });
  });
  
  // Genemco accordian
  $('.genemco-accordian-container .genemco-accordian-item').each((index, ele) => {
    if ( $(ele).hasClass('active') ) {
      console.log('aaa');
      $(ele).find('.genemco-accordian-item__content').slideToggle();
    }
  });
  $(document).on('click', '.genemco-accordian-container .genemco-accordian-item__heading', function(e) {
    if ($(this).closest('.genemco-accordian-item').hasClass('active')) {
      $(this).closest('.genemco-accordian-item').toggleClass('active');
      $(this).next('.genemco-accordian-item__content').slideToggle();
    } else {
      $(this).closest('.genemco-accordian-container').find('.genemco-accordian-item').removeClass('active');
      $(this).closest('.genemco-accordian-container').find('.genemco-accordian-item__content').slideUp();
      $(this).closest('.genemco-accordian-item').toggleClass('active');
      $(this).next('.genemco-accordian-item__content').slideToggle(); 
    }
  });

  //Ajax create account
  $(document).on('submit', 'form[action="/account"]', function(e) {
    e.preventDefault();
    let data = jQuery(this).serialize();
    // console.log(data);
    jQuery.post('/account', data)
    .done(function(response){
      var logErrors = jQuery(response).find('.alert__error-item').text();
      if (logErrors != '' && logErrors != 'undefined'){
        alert(logErrors);
      }
      else{
        //window.location.replace('/pages/quote-confirm?register=1');
        window.location.reload(true);
      }
    }).fail(function(){alert('error could not submit');});
    return false;
  });

  //Ajax login accout
  $(document).on('submit', 'form[action="/account/login"]', function(e) {
    e.preventDefault();
    let data = jQuery(this).serialize();
    jQuery.post('/account/login', data)
    .done(function(response){
      var logErrors = jQuery(response).find('.alert--error').text();
      if (logErrors != '' && logErrors != 'undefined'){
        $(document).find('.login-alert').remove();
        $(`<div class="login-alert"><h4>There was a problem</h4><i class="a-icon a-icon-alert"></i><div class="alert-content">${logErrors}</div></div>`).insertBefore('#desktop-login');
        $(`<div class="login-alert"><h4>There was a problem</h4><i class="a-icon a-icon-alert"></i><div class="alert-content">${logErrors}</div></div>`).insertBefore('#mobile-login');
        $(`<div class="login-alert"><h4>There was a problem</h4><i class="a-icon a-icon-alert"></i><div class="alert-content">${logErrors}</div></div>`).insertAfter('#header_customer_login .popover__header');
        // alert(logErrors);
      }
      else{
        window.location.replace(window.location.href);
      }
    }).fail(function(e){alert('error could not login');});
    return false;
  });

  // Ajax lost password
  $(document).on('submit', 'form[action="/account/recover"]', function(e) {
    e.preventDefault();
    let data = jQuery(this).serialize();
    jQuery.post('/account/recover', data)
    .done(function(response) {
      const successMessage = jQuery(response).find('.alert--success').text();
      if (successMessage != '' && successMessage != 'undefined'){
        $(`<div>${successMessage}</div>`).insertAfter('form[action="/account/recover"] button');
      } else {
        
      }
    }).fail(function(e){alert(`Too many requests!`);});
  });

  $(document).ready(function() {
    $('body').addClass('dom-ready');
    // $(`form[action="/account"] [type="submit"]`).css({"pointer-events": "all"});
    // $(`form[action="/account/login"] [type="submit"]`).css({"pointer-events": "all"});

    $('.learn-more__title').on('click', e => {
      $('.learn-more__title').toggleClass('opened');
      $('.learn-more__content').slideToggle(400);
    });
  });

  $(document).on('click', '#boost-pfs-quickview-cart-btn', function(e) {
    e.preventDefault();
    const formData = {
      form_type: "product",
      id: $(this).data('id'),
      quantity: "1"
    }
    fetch("".concat(window.routes.cartAddUrl, ".js"), {
        body: JSON.stringify(formData),
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' // This is needed as currently there is a bug in Shopify that assumes this header

        }
      }).then(function (response) {
        document.dispatchEvent(new CustomEvent('theme:loading:end'));

        if (response.ok) {
          $('.boost-pfs-quickview-close').trigger('click');

          var _this2 = {};
          var url = '';
          var miniCartElement = document.querySelector('.mini-cart');

          if (window.theme.pageType !== 'cart') {
            url = "".concat(window.routes.cartUrl, "?view=mini-cart&timestamp=").concat(Date.now());
          } else {
            url = "".concat(window.routes.cartUrl, "?timestamp=").concat(Date.now());
          }

          fetch(url, {
            credentials: 'same-origin',
            method: 'GET'
          }).then(function (content) {
            content.text().then(function (html) {
              // We extract the data-item-count from the returned element
              var myDiv = document.createElement('div');
              myDiv.innerHTML = html;
  
              if (myDiv.firstElementChild && myDiv.firstElementChild.hasAttribute('data-item-count')) {
                _this2.itemCount = parseInt(myDiv.firstElementChild.getAttribute('data-item-count'));
              }
  
              document.querySelector('.header__cart-count').textContent = _this2.itemCount;
  
              if (true) {
                if (window.theme.pageType !== 'cart') {
                  // Note: we could use outerHTML here but outerHTML does not update the reference to new object
                  var tempElement = document.createElement('div');
                  tempElement.innerHTML = html; // When we re-render, we need to preserve the scroll position when content changes
  
                  var miniCartItemListElement = document.querySelector('.mini-cart__line-item-list'),
                      scrollPosition = null;
  
                  if (miniCartItemListElement) {
                    scrollPosition = miniCartItemListElement.scrollTop;
                  }
  
                  miniCartElement.innerHTML = tempElement.querySelector('.mini-cart').innerHTML;
  
                  var newMiniCartItemListElement = miniCartElement.querySelector('.mini-cart__line-item-list');
  
                  if (newMiniCartItemListElement && scrollPosition !== null) {
                    newMiniCartItemListElement.scrollTop = scrollPosition;
                  }
  
                  // _this2._checkMiniCartScrollability();
  
                  // _this2._calculateMiniCartHeight();
  
                  // _this2.element.dispatchEvent(new CustomEvent('cart:rerendered'));
                } else {
                  // The replacement of the DOM here could be made better and more resilient (maybe exploring using a virtual DOM approach in future?)
                  var _tempElement = document.createElement('div');
  
                  _tempElement.innerHTML = html;
                  var originalCart = document.querySelector('[data-section-type="cart"]');
                  originalCart.innerHTML = _tempElement.querySelector('[data-section-type="cart"]').innerHTML;
  
                  if (scrollToTop) {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    });
                  } // Reload the Shopify Review badges
  
  
                  // if (window.SPR) {
                  //   window.SPR.initDomEls();
                  //   window.SPR.loadBadges();
                  // }
  
                  // _this2.element.dispatchEvent(new CustomEvent('cart:rerendered', {
                  //   bubbles: true
                  // }));
                }
              }
            });
          });

        } else {
          // response.json().then(function (content) {
          //   var errorMessageElement = document.createElement('div');
          //   errorMessageElement.className = 'product-form__error';
          //   errorMessageElement.innerHTML = "<p class=\"alert alert--error\">".concat(content['description'].replace("cart", "Quote Cart"), "</p>");
          //   target.removeAttribute('disabled');
          //   target.parentNode.insertAdjacentElement('afterend', errorMessageElement);
          //   Animation.slideDown(errorMessageElement);
          //   setTimeout(function () {
          //     Animation.slideUp(errorMessageElement, function () {
          //       errorMessageElement.remove();
          //     });
          //   }, 5500);
          // });
        }
      });
  });
  
  // window.addEventListener('load', function() {
  //   const learnmoreTitle = document.querySelector('.learn-more__title');
  //   learnmoreTitle.addEventListener('click', e => {
  //     learnmoreTitle.classList.toggle('opened');
  //   });
  // });

})(jQuery);
