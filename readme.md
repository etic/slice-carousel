# Slice Carousel

A jQuery plugin for viewing a series of images as a sequence of animated inline slices.

## Usage

Include the following lines in the `<head>` area of your document:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="https://raw.github.com/etic/slice-carousel/master/slice-carousel.js"></script>
```

A slice carousel widget is built for each `div.slide-carousel` element with `img` children in the DOM.

```html
<div class="slice-carousel">
	<img src="my-image-01.jpg"></img>
	<img src="my-image-02.jpg"></img>
	<img src="my-image-03.jpg"></img>
</div>
```

Widgets are automatically built upon document loading.  To build widgets at a later time, add the `slice-carousel` class to the desired elements through javascript and call `$(myElement).sliceCarousel()`.

### Options

| Name        | Default Value | Description                                        |
|-------------|:-------------:|----------------------------------------------------|
| sliceWidth  | 40            | The minimum width of a slice.                      |
| duration    | 300           | The duration of a transition in milliseconds.      |
| shadowSize  | 16            | The size of the box shadows of individual slices.  |
| shadowAlpha | 0.5           | The alpha of the box shadows of individual slices. |

Example:

```html
<div class="slice-carousel" sliceWidth="20" alphaSize="8">
	...
</div>
```

### Events

An event is fired every time the currently active image changes.  The index of this image can be retrieved with the `carouselImageChange` event.

```js
$( 'div.slice-carousel' ).on( 'carouselImageChange', function ( e, index ) {
	alert( 'Image ' + index + ' selected!' );
} );
```
