/*

Copyright (c) 2013 Chris Lewis

Licensed under MIT
http://www.opensource.org/licenses/mit-license.php

*/

( function ( $ ) {

	$.fn.sliceCarousel = function () {

		// adds the classes necessary to display the slice carousel to the document
		function addSliceCarouselClasses( width, height, shadowSize, shadowAlpha ) {

			// only add the style element once
			if ( $( 'style#slice-carousel-style' ).length > 0 ) return;

			var sliceCarouselStyle = [

				'.slice-carousel {',
					'width: ' + width + 'px;',
					'height: ' + height + 'px;',
					'overflow: hidden;',
				'}'

			].join( '\n' );

			var sliceCarouselUlStyle = [

				'.slice-carousel ul {',
					'position: relative;',
					'left: -40px;',
					'width: ' + width + 'px;',
					'height: ' + height + 'px;',
					'list-style-type: none;',
					'overflow: hidden;',
				'}'

			].join( '\n' );

			var sliceCarouselLiStyle = [

				'.slice-carousel li {',
					'display: block;',
					'position: absolute;',
					'overflow: hidden;',
					'box-shadow: 3px 0px ' + shadowSize + 'px rgba(0, 0, 0, ' + shadowAlpha + ');',
				'}'

			].join( '\n' );

			var sliceCarouselImgStyle = [

				'.slice-carousel li img {',
					'display: block;',
					'min-width: ' + width + 'px;',
					'min-height: ' + height + 'px;',
				'}'

			].join( '\n' );

			var sliceCarouselStyleElement = [

				'<style type="text/css" id="slice-carousel-style">',
				sliceCarouselStyle,
				sliceCarouselUlStyle,
				sliceCarouselLiStyle,
				sliceCarouselImgStyle,
				'</style>'

			].join( '\n' );

			$( sliceCarouselStyleElement ).appendTo( 'body' );

		}

		// builds a slice carousel widget out of the given element
		function buildSliceCarousel( element ) {

			var defaults = {

				'sliceWidth': 40,
				'duration': 300,
				'shadowSize': 16,
				'shadowAlpha': 0.5

			}

			// pull attributes from the element into this, using default values if the 
			for ( var i = 0, defaultKeys = Object.keys( defaults ), il = defaultKeys.length; i < il; i++ ) {

				var attr = element.attr( defaultKeys[i] );

				if ( typeof attr !== 'undefined' ) {

					this[ defaultKeys[i] ] = parseFloat( attr );

				} else {

					this[ defaultKeys[i] ] = defaults[ defaultKeys [i] ];

				}

			}

			// build additional DOM elements
			var initialImages = element.find( 'img' );
			
			var ul = $('<ul></ul>');

			for ( var i = 0, il = initialImages.length; i < il; i++ ) {

				ul.append( $( '<li></li>' ).append( initialImages[i] ) );

			}

			element.html( ul );

			// prepare elements for mousemove events
			var sections = ul.find( 'li' ),
					numImages = sections.length,
					carouselImages = [],
					currentImage = 0,
					scope = this;

			for ( var i = sections.length - 1, j = 0; i >= 0; i--, j++ ) {

				carouselImages.push( $( sections[i] ).find( 'img' ) );
				// set slices to initial positions
				carouselImages[ j ].css( 'margin-right', ( -( numImages - 1 - j ) * scope.sliceWidth ) + 'px' );

			}

			// make sure images are loaded before querying their dimensions
			element.find( 'ul > li > img' ).load( function () {

				scope.imageWidth = carouselImages[0].width();
				scope.imageHeight = carouselImages[0].height();

				addSliceCarouselClasses( scope.imageWidth, scope.imageHeight, scope.shadowSize, scope.shadowAlpha );

				element.mousemove( function ( e ) {

					var offset = $( this ).offset(),
							relativeX = e.pageX - offset.left,
							newImage = Math.floor(relativeX / 188);

					// clamp newImage to array bounds
					newImage = newImage >= numImages ? numImages - 1 : newImage;

					if ( newImage !== currentImage ) {

						for ( var i = 0; i < numImages; i++ ) {

							if ( i < newImage ) {

								carouselImages[i].animate( 

									{ 'margin-right' : ( -scope.imageWidth + ( i + 1 ) * scope.sliceWidth ) + 'px' },
									{ 'duration': scope.duration, 'queue': false }

								);

							} else {

								carouselImages[i].animate(

									{ 'margin-right' : ( - ( numImages - 1 - i ) * scope.sliceWidth ) + 'px' },
									{ 'duration': scope.duration, 'queue': false }

								);

							}

						}

						currentImage = newImage;

						// for updating auxillary elements that depend on the currently active image in the carousel
						$( this ).trigger( 'carouselImageChange', [ currentImage ] );

					}

				} );

			} );


		}

		// build slice carousel widgets for each element passed into the function
		var elements = $( this );

		for( var i = 0, il = elements.length; i < il; i++ ) {

			var element = $( elements[i] );

			// ignore elements not marked as slice carousels
			if ( !element.hasClass( 'slice-carousel' ) ) continue;

			// ignore slice carousels that have already been built
			if ( element.find( 'ul' ).length > 0 ) continue;

			buildSliceCarousel( element );

		}

	}

	// automatically create slice carousel widgets when the document is fully loaded
	$( document ).ready( function () {

		$( '.slice-carousel' ).sliceCarousel();

	} );

} )( jQuery );