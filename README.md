# vibrancy.js
> A jQuery plugin for adding stylish frosted glass effects over images.
[![Live Demo](https://raw.githubusercontent.com/dietrich-stein/vibrancy.js/3243c65d1af1155fe5cc1849869d355ed6ea5135/images/vibrancy-preview.png)](http://dietrich-stein.github.io/vibrancy.js/)

## Live Demo

http://dietrich-stein.github.io/vibrancy.js

## Requirements
* jQuery 1.7+
* [CamanJS 4.0+](https://github.com/meltingice/CamanJS)
* A [modern browser](http://caniuse.com/#feat=canvas) with support for the `<canvas>` tag

## Usage

Add script tags to include the jQuery, CamanJS, and this library:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/camanjs/4.0.0/caman.full.min.js"></script>
<script src="jquery.vibrancy-0.1.min.js"></script>
```

Create an attribute called `data-repo`:

```html
<div data-repo="jquery-boilerplate/jquery-boilerplate"></div>
```

Add HTML with any supported `data-` attributes on the child elements:

```html
<div class="target">
	<div class="panel panel-1" data-vibrancy-vibrance="100" data-vibrancy-brightness="20" data-vibrancy-blur="100">
		The perfect design is now within your grasp.
	</div>
</div>
```

Add CSS to control the dimensions and positioning of your target and child elements:

```css
.target {
	width: 800px;
	height: 533px;
}

.panel {
	position: absolute;
	z-index: 9000;
	box-sizing: border-box;
}

.target .panel-1 {
	font-size: 2em;
	color: #000;
	top: 30px;
	left: 30px;
	width: 392px;
	height: 108px;
	padding: 0.5em;
}
```

Call the plugin with the class shared by your child elements and the URI to your background image:

```javascript
$('.target').vibrancy({
	panelClass: 'panel',
	backgroundSrc: $('.thumbs-1 img:first-child').attr('src')
})
```

## Settings

## Releases

## Roadmap

## Acknowledgements

## License
