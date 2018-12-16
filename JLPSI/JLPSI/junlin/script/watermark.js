/*水印*/
function watermark(str, thisparent) {
	$(thisparent).css("position", "relative");
	let $watermark = $('<div class="watermark"><div class="row text-center">' + str + '</div></div>');

	return $watermark;
}

/*文字跟随变动*/
$.fn.fontFlex = function(min, max, mid) {
	var $this = this;
	$(window).resize(function() {
		var size = window.innerWidth / mid;
		if(size < min) {
			size = min
		}
		if(size > max) {
			size = max
		}
		$this.css('font-size', size + 'px');
	}).trigger('resize');
};