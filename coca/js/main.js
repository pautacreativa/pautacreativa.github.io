///////////*******************************************/////////

var indexpag = 1;
var paginas;

var cocaseleccionada = '';
var tunombre = '';

$(document).ready(function(){
	
	paginas = $('.pagina');
	
	var tween = TweenMax.to('.pagina', 0.5, {opacity:1, ease:Power2.easeOut});
	
	//paginas.eq(indexpag).css('display','block');
	
	$('.tunombre').keyup(function(){
	
		$('.nombrerotado').html($('.tunombre').val());
		
	});
	
	$('.pagina').css({'width':($(window).width())+'px'});
	
	//login();
	//makeCall();
	
	/*$('.videocontainer').click(function(){
		
		$('#vid-box').html(' ');
		login();
		
	})*/
	
});
$(window).load(function() {
	
});
function sigPag(){
	
	var calcleft = (indexpag) * $(window).width();
	var tween = TweenMax.to('.contpags', 1, {left:'-'+calcleft+'px', ease:Power2.easeOut});
	var tween = TweenMax.to('.footer', 1, {left:'-'+(calcleft/3)+'px', ease:Power2.easeOut});
	indexpag++;
	
	/*if(indexpag == 4)
		zoomVideo();
	*/
}

function zoomVideo(){
	//alert('video zoom');
	$('#vid-box video').css('width','auto');
	$('#vid-box video').css({
	'left' : '-50%',
  '-webkit-transform' : 'translateX(50%)',
  '-moz-transform'    : 'translateX(50%)',
  '-ms-transform'     : 'translateX(50%)',
  '-o-transform'      : 'translateX(50%)',
  'transform'         : 'translateX(50%)'
});
	var tween = TweenMax.to('#vid-box video', 1, {height:'100%', margin: '0 0%', ease:Power2.easeOut});
	
}

function comenzar(){
	
	
	if($('.tunombre').val() != ''){
		if(cocaseleccionada != ''){
		
			tunombre = $('.tunombre').val().trim();
			
			var calcleft = (indexpag) * $(window).width();
			var tween = TweenMax.to('.contpags', 1, {left:'-'+calcleft+'px', ease:Power2.easeOut});
			var tween = TweenMax.to('.footer', 1, {left:'-'+(calcleft/3)+'px', ease:Power2.easeOut});
			indexpag++;
			
			zoomVideo();
			listenComienza();
			
			}else{
			
			$('.error1').trigger('click');
			
		}
		}else{
		$('.error0').trigger('click');
	}
	
}


function seleccionarCoca(coca){
	cocaseleccionada = coca;
	var tween = TweenMax.to('.cocas div img', 0, {border:'2px solid transparent;', ease:Power2.easeOut});
	var tween = TweenMax.to('.coca'+cocaseleccionada+' img', 1, {border:'2px solid #fff;', ease:Power2.easeOut});
	
}
function stripVowelAccent(str)
{
 var rExps=[
 {re:/[\xC0-\xC6]/g, ch:'A'},
 {re:/[\xE0-\xE6]/g, ch:'a'},
 {re:/[\xC8-\xCB]/g, ch:'E'},
 {re:/[\xE8-\xEB]/g, ch:'e'},
 {re:/[\xCC-\xCF]/g, ch:'I'},
 {re:/[\xEC-\xEF]/g, ch:'i'},
 {re:/[\xD2-\xD6]/g, ch:'O'},
 {re:/[\xF2-\xF6]/g, ch:'o'},
 {re:/[\xD9-\xDC]/g, ch:'U'},
 {re:/[\xF9-\xFC]/g, ch:'u'}/*,
 {re:/[\xD1]/g, ch:'N'},
 {re:/[\xF1]/g, ch:'n'}*/ ];

 for(var i=0, len=rExps.length; i<len; i++)
  str=str.replace(rExps[i].re, rExps[i].ch);

 return str;
}
$(function(){
    var windowW = $(window).width();
    var wrapperW = $('.pagina').width();
	//alert(windowW);
	//alert(wrapperW);
    
	
	$('.pagina').css({'width':($(window).width())+'px'});
	$('.videocontainer').css({'width':($(window).width())+'px'});
	
	
    $(window).resize(function(){
		//console.log($(window).width());
		$('.pagina').css({'width':($(window).width())+'px'});
		$('.videocontainer').css({'width':($(window).width())+'px'});
	
		var calcleft = (indexpag - 1) * $(window).width();
		$('.contpags').css('left','-'+calcleft+'px');
	})          
});