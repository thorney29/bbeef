//fade in plugin

(function ($) {
  function FadeTransition(element, opts) {
    var el = element,
        $el = $(el),
        fadeTimer = null,
        current = 0,
        paused = false,
        self = this,
        options = $.extend({pauseTime: 5000,
                            transitionTime: 2000,
                            ignore: null,
                            singleLoop: false,
                            delayStart: 0,
                            pauseOnMouseOver: false,
                            manualNavigation: false,
                            createNavButtons: false,
                            navButtonContainer: null}, opts),
        els = (options.ignore)?$("> *:not(" + options.ignore + ")", el):$("> *", el);
                            
    function setup() {
      $el.css("position", "relative");
      els.css("display", "none").css({left: 0, top: 0, position: "absolute"});
      els.filter(':first').css("display", "block");
      
      if (options.createNavButtons) {
        createNavButtons();
        highlightNav();
      }
    
      if (options.pauseOnMouseOver) {
        $el.mouseover(pause).mouseout(unpause);
        $('a', options.navButtonContainer || el).mouseover(pause).mouseout(unpause);
      }
    
      if (options.delayStart > 0) {
        setTimeout(start, options.delayStart);
      }
      else {
        start();
      }
    }
    
    function transitionTo(nextIdx) {
      $(els[current]).fadeOut(options.transitionTime);
      $(els[current = nextIdx]).fadeIn(options.transitionTime, cue);
      highlightNav();
    }
    
    function manualNav(e) {
      var idx;
      this.blur();
      $(els).stop(true);
      clearTimeouts();
      $(els).css({'opacity': 1, 'display': 'none'});
      $(els[current]).css({'display': 'block'});
      idx = $('.fadenav a', el).index(this);
      transitionTo(idx);
      e.preventDefault();
    }
      
    function createNavButtons() {
      var i, nav = $('<div class="fadenav"></div>');
      for (i=0; i<els.length; i++) {
        $('<a class="nav' + i + '" href="#">&nbsp;</a>', options.navButtonContainer || el).click(manualNav).appendTo(nav);
      }
        
      nav.appendTo(options.navButtonContainer || el);
    }
    
    function highlightNav() {
      if (options.createNavButtons) {
        $('.fadenav a', options.navButtonContainer || el).removeClass('current');
        $('.fadenav a:nth-child(' + (1 + current) + ')', options.navButtonContainer || el).addClass('current');
      }
    }
      
    function start() {
      if (options.ignore) {
        $(options.ignore, el).fadeOut(options.transitionTime);
        $(els[current]).fadeIn(options.transitionTime);
        fadeTimer = setTimeout(self.next, options.pauseTime + options.transitionTime);
      }
      else {
        highlightNav();      
        if (!options.manualNavigation) {
          fadeTimer = setTimeout(self.next, options.pauseTime);
        }
      }
    }
    
    function pause() {
      paused = true;
      clearTimeouts();
    }
    
    function unpause() {
      paused = false;
      cue();
    }
    
    function clearTimeouts() {
      if (fadeTimer) {
        window.clearTimeout(fadeTimer);
        fadeTimer = null;
      }
    }
    
    this.show = function(item) {
      if (typeof(els[item]) !== 'undefined') {
        clearTimeouts();
        transition(item);
      }
      
      return this;
    };
    
    this.currentItem = function() {
      return current;
    }
    
    function cue() {
      if (paused || options.manualNavigation || (els.length < 2)) {
        return false;
      }
      clearTimeouts();
      fadeTimer = window.setTimeout(self.next, options.pauseTime);
    }
    
    this.next = function() {
      if (!options.singleLoop || ((current + 1) % els.length > 0)) {
        transitionTo((current + 1) % els.length || 0);
      }
    };

    this.prev = function() {
      transitionTo(((current || els.length) - 1) % els.length);
    };

    $el.data('Fader', this);
    setup();
  }
  
  $.fn.fadeTransition = function(options) {
    function getFader() {
      if (typeof $(this).data('Fader') === 'object') {
        return $(this).data('Fader');
      }
      else {
        return new FadeTransition(this, options);
      }
    }
    
    this.fader = function() {
      if (typeof $(this).filter(':first').data('Fader') === 'object') {
        return $(this).filter(':first').data('Fader');
      }
      
      return null;
    };
    
    return this.each(getFader);
  };
  

}(jQuery));



// SETTINGS for HUE Template
// Available on Themeforest: http://themeforest.net/user/CosmicLabs/portfolio
// By CosmicLabs


// To setup, change the variables below
// Follow instructions in comments, see documentation for more detail

// ==== COLOUR SCHEME ====
// Type in the HEX Code for the colour you want to use as the background of the site
// Remember to include the Hex (#) symbol, e.g. #2c3e50
// Need some colours to choose from? Nice choice of Flat UI colours here: http://flatuicolors.com
// Darker colours work best - avoid light / pale colours
// Set opacity of colour overlay, between 0 and 1

var colour = "#000";
var bgOpacityLevel = "0.65";


// ==== SLIDESHOW BACKGROUND ====
// Set URLs to background images inside the array
// Each image must be on its own line, inbetween speech marks (" ") and with a comma at the end of the line
// Add / remove images by changing the number of lines below
// Variable slideshowFade = transition speed for fade animation, in milliseconds
// Variable slideshowDuration = time each slide is shown for, in milliseconds

var slideshowBackground = 'on';

var slideshowBackgroundURLS = [
	"images/basil-2.jpg",
	// "images/background2.jpg",
	// "images/background3.jpg",
	// "images/background4.jpg",
];

var slideshowFade = 1000;
var slideshowDuration = 4000;

		
// ==== VIDEO BACKGROUND ====
// Enable Video Background - 'on' to enable, 'off' to disable
// Cannot work on mobile devices due to device restrictions, instead shows slideshow
// If disabled slideshow is shown
// Paste YouTube URL into the videoBackgronudURL variable - use YouTube link NOT embed code
// Set videoMuted to 'true' and background videos will be muted with no toggle mute button visible
// Set videoMuted to 'false' and videos will not be muted, and the toggle mute button will be visible on the site so users can turn off audio if they want

var videoBackground = 'off';
// var videoBackgroundURL = 'PASTE-YOUTUBE-URL-HERE';
// var videoMuted = true;

// Hue template script
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
	

/*! Backstretch - v2.0.4 - 2013-06-19
* http://srobbin.com/jquery-plugins/backstretch/
* Copyright (c) 2013 Scott Robbin; Licensed MIT */
(function(a,d,p){a.fn.backstretch=function(c,b){(c===p||0===c.length)&&a.error("No images were supplied for Backstretch");0===a(d).scrollTop()&&d.scrollTo(0,0);return this.each(function(){var d=a(this),g=d.data("backstretch");if(g){if("string"==typeof c&&"function"==typeof g[c]){g[c](b);return}b=a.extend(g.options,b);g.destroy(!0)}g=new q(this,c,b);d.data("backstretch",g)})};a.backstretch=function(c,b){return a("body").backstretch(c,b).data("backstretch")};a.expr[":"].backstretch=function(c){return a(c).data("backstretch")!==p};a.fn.backstretch.defaults={centeredX:!0,centeredY:!0,duration:5E3,fade:0};var r={left:0,top:0,overflow:"hidden",margin:0,padding:0,height:"100%",width:"100%",zIndex:-999999},s={position:"absolute",display:"none",margin:0,padding:0,border:"none",width:"auto",height:"auto",maxHeight:"none",maxWidth:"none",zIndex:-999999},q=function(c,b,e){this.options=a.extend({},a.fn.backstretch.defaults,e||{});this.images=a.isArray(b)?b:[b];a.each(this.images,function(){a("<img />")[0].src=this});this.isBody=c===document.body;this.$container=a(c);this.$root=this.isBody?l?a(d):a(document):this.$container;c=this.$container.children(".backstretch").first();this.$wrap=c.length?c:a('<div class="backstretch"></div>').css(r).appendTo(this.$container);this.isBody||(c=this.$container.css("position"),b=this.$container.css("zIndex"),this.$container.css({position:"static"===c?"relative":c,zIndex:"auto"===b?0:b,background:"none"}),this.$wrap.css({zIndex:-999998}));this.$wrap.css({position:this.isBody&&l?"fixed":"absolute"});this.index=0;this.show(this.index);a(d).on("resize.backstretch",a.proxy(this.resize,this)).on("orientationchange.backstretch",a.proxy(function(){this.isBody&&0===d.pageYOffset&&(d.scrollTo(0,1),this.resize())},this))};q.prototype={resize:function(){try{var a={left:0,top:0},b=this.isBody?this.$root.width():this.$root.innerWidth(),e=b,g=this.isBody?d.innerHeight?d.innerHeight:this.$root.height():this.$root.innerHeight(),j=e/this.$img.data("ratio"),f;j>=g?(f=(j-g)/2,this.options.centeredY&&(a.top="-"+f+"px")):(j=g,e=j*this.$img.data("ratio"),f=(e-b)/2,this.options.centeredX&&(a.left="-"+f+"px"));this.$wrap.css({width:b,height:g}).find("img:not(.deleteable)").css({width:e,height:j}).css(a)}catch(h){}return this},show:function(c){if(!(Math.abs(c)>this.images.length-1)){var b=this,e=b.$wrap.find("img").addClass("deleteable"),d={relatedTarget:b.$container[0]};b.$container.trigger(a.Event("backstretch.before",d),[b,c]);this.index=c;clearInterval(b.interval);b.$img=a("<img />").css(s).bind("load",function(f){var h=this.width||a(f.target).width();f=this.height||a(f.target).height();a(this).data("ratio",h/f);a(this).fadeIn(b.options.speed||b.options.fade,function(){e.remove();b.paused||b.cycle();a(["after","show"]).each(function(){b.$container.trigger(a.Event("backstretch."+this,d),[b,c])})});b.resize()}).appendTo(b.$wrap);b.$img.attr("src",b.images[c]);return b}},next:function(){return this.show(this.index<this.images.length-1?this.index+1:0)},prev:function(){return this.show(0===this.index?this.images.length-1:this.index-1)},pause:function(){this.paused=!0;return this},resume:function(){this.paused=!1;this.next();return this},cycle:function(){1<this.images.length&&(clearInterval(this.interval),this.interval=setInterval(a.proxy(function(){this.paused||this.next()},this),this.options.duration));return this},destroy:function(c){a(d).off("resize.backstretch orientationchange.backstretch");clearInterval(this.interval);c||this.$wrap.remove();this.$container.removeData("backstretch")}};var l,f=navigator.userAgent,m=navigator.platform,e=f.match(/AppleWebKit\/([0-9]+)/),e=!!e&&e[1],h=f.match(/Fennec\/([0-9]+)/),h=!!h&&h[1],n=f.match(/Opera Mobi\/([0-9]+)/),t=!!n&&n[1],k=f.match(/MSIE ([0-9]+)/),k=!!k&&k[1];l=!((-1<m.indexOf("iPhone")||-1<m.indexOf("iPad")||-1<m.indexOf("iPod"))&&e&&534>e||d.operamini&&"[object OperaMini]"==={}.toString.call(d.operamini)||n&&7458>t||-1<f.indexOf("Android")&&e&&533>e||h&&6>h||"palmGetResource"in d&&e&&534>e||-1<f.indexOf("MeeGo")&&-1<f.indexOf("NokiaBrowser/8.5.0")||k&&6>=k)})(jQuery,window);