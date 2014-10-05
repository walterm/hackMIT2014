$(document).on('ready', function() {
	slidr.create('article', {
		transition: 'cube',
		controls: 'none'
	}).start();



	// when the flick happens

	$(document).on('like', function() {
		if (slidr.canSlide('right')) {
			slidr.slide('right');
		}
		
	});
});
