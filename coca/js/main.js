///////////*******************************************/////////

var indexpag = 1;
var paginas;

var cocaseleccionada = '';

$(document).ready(function(){
	
	paginas = $('.pagina');
	//paginas.eq(indexpag).css('display','block');
	
	$('.tunombre').keyup(function(){
	
		$('.nombrerotado').html($('.tunombre').val());
		
	});
	$('.pagina').css({'width':($(window).width())+'px'});
	
});

function sigPag(){
	
	var calcleft = (indexpag) * $(window).width();
	var tween = TweenMax.to('.contpags', 1, {left:'-'+calcleft+'px', ease:Power2.easeOut});
	var tween = TweenMax.to('.footer', 1, {left:'-'+(calcleft/3)+'px', ease:Power2.easeOut});
	indexpag++;
	
}

function comenzar(){
	
	
	if($('.tunombre').val() != ''){
		if(cocaseleccionada != ''){
			var calcleft = (indexpag) * $(window).width();
			var tween = TweenMax.to('.contpags', 1, {left:'-'+calcleft+'px', ease:Power2.easeOut});
			var tween = TweenMax.to('.footer', 1, {left:'-'+(calcleft/3)+'px', ease:Power2.easeOut});
			indexpag++;
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
	
    $(window).resize(function(){
		//console.log($(window).width());
		$('.pagina').css({'width':($(window).width())+'px'});
		
		var calcleft = (indexpag - 1) * $(window).width();
		$('.contpags').css('left','-'+calcleft+'px');
	})          
});