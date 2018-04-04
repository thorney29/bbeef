function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

	var rgbaColour = "rgba(" + hexToRgb(colour).r + "," + hexToRgb(colour).g + "," + hexToRgb(colour).b + "," + bgOpacityLevel + ")";
	var rgbaLightColour = "rgba(" + hexToRgb(colour).r + "," + hexToRgb(colour).g + "," + hexToRgb(colour).b + ",0.15)";
	
	$('.overlay').css('background-color', rgbaColour);
	$('.countdown-circle').css('background-color', rgbaLightColour);
	$('.countdown-circle h2').css('color', colour);
	$('.about-box span').css('color', colour);
	$('.contact-box.right ul li i.fa').css('color', colour);
	$('.contact-form-button').css('border', '1px solid ' + colour);
	$('.contact-form-button').css('color', colour);
	$('#contact-success').css('color', colour);
	
		
	var div = $("<div />", {
    	html: '&shy;<style> ::selection { background-color: ' + rgbaColour + '; color: white; } ::-moz-selection { background-color: ' + rgbaColour + '; color: white; } .backstretch:after { background-color: ' + rgbaColour + '; } .YTPOverlay { background-color: ' + rgbaColour + '; } .coloured-h2 { color: ' + colour + ' !important; } .page-loading { background-color: ' + colour + '; } .about-box:after { background-color: ' + rgbaLightColour + ' !important; } .section.aboutsection a { color: ' + colour + '; } .section.aboutsection a:hover { border-bottom: 1px solid ' + colour + '; } .subscribe .signup-button { color: ' + colour + '; } .subscribe .signup-button:hover { background-color: ' + colour + '; } .signup-success { color: ' + colour + '; } .contact-box.right input[type="submit"]:hover { background-color: ' + colour + '; } .section.footersection a.footer-social:hover { color: ' + colour + ' !important; } </style>'
  	}).appendTo("body");
	
	
$(".scroll").click(function (event) {
    event.preventDefault();
    //calculate destination place
    var dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $(this.hash).offset().top;
    }
    //go to destination
    $('html,body').animate({
        scrollTop: dest
    }, 1000, 'swing');
    $('.active').removeClass('active');
    $(this).addClass('active');
});