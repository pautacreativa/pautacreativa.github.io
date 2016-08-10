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
	var tween = TweenMax.to('#vid-box', 0.5, {width:'100%', margin: '0 0%', ease:Power2.easeOut});
	
}

function comenzar(){
	
	
	if($('.tunombre').val() != ''){
		if(cocaseleccionada != ''){
		
			tunombre = $('.tunombre').val();
			
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