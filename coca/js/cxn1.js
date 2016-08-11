var video_out = document.getElementById("vid-box");
var stream;
var UUID = 'C1';
var UUID2 = 'C2';

var turno = '';

login();

var jugador = {'accion':'', 'uuid':'', 'nombre':'', 'oportunidades':3, 'status':''};
var oponente = {'accion':'', 'uuid':'', 'nombre':'', 'oportunidades':3, 'status':''};

var juego = {'accion':'', 'turno':'', 'gano':'', 'perdio':''};

var xacertar = 0;
var aciertosGlobales = 0;
var oportunidadesGlobales = 3;
var phone;
$(window).bind('beforeunload',function(){
	
     //save info somewhere
	juego['accion'] = 'reload';
	stream.publish({
			channel: 'coca',
			message: juego
		});
   

});

function login() {
		phone = window.phone = PHONE({
		number        : UUID, // listen on username line else Anonymous
		publish_key   : 'pub-c-4c902a56-d0d3-4f28-8424-8d0400870e89', // Your Pub Key
		subscribe_key : 'sub-c-172d1fbc-5b79-11e6-8ee6-0619f8945a4f', // Your Sub Key
		ssl : true
	});	
	 
	phone.ready(function(){phone.hangup(UUID2);makeCall();});
	phone.receive(function(session){
		session.connected(function(session) { video_out.appendChild(session.video);console.log("esperando video!")});
		session.ended(function(session) { video_out.innerHTML='';console.log('session ended'); phone.hangup(UUID2);});
	});
	
	stream = PUBNUB.init({
        publish_key: 'pub-c-4c902a56-d0d3-4f28-8424-8d0400870e89',
        subscribe_key: 'sub-c-172d1fbc-5b79-11e6-8ee6-0619f8945a4f',
		//ssl : (('https:' == document.location.protocol) ? true : false),
		ssl : true,
		uuid : UUID
	});
	
	
	stream.subscribe({
		channel: 'coca',
		message: function(m){
			console.log(m);
			
			switch(m.accion) {
				case 'loginjugador':
				if(m.uuid != UUID){
					oponente['nombre'] = m.nombre;
					oponente['uuid'] = m.uuid;
					oponente['oportunidades'] = m.oportunidades;
					
					crearNombreOponente();
				}
				break;
				case 'updateTurno':
					juego['turno'] = m.turno;
				
				break;
				case 'cambiarTurno':
					juego['turno'] = m.turno;
					if(juego['turno'] == UUID){
						miTurno();
					}else{
						noesmiTurno();
					}
				break;
				case 'ganar':
					if(m.gano == UUID){
						ganarJuego();
					}else{
						terminarJuego();
					}
				
				break;
				case 'perder':
				
					if(oponente['status'] == 'perdio' && m.perdio == UUID){
						descalificar2();
					}else if(m.perdio == UUID){
						descalificar();
					}
				
				break;
				case 'descalificar':
				
					if(m.uuid == UUID2){
						oponente['status'] = 'perdio';
					}
				
				break;
				case 'reload':
					phone.hangup(UUID2);
					location.reload();
				break;
			}
			
			
			
		},
		presence: function(m) {
			console.log(m);
		}
	});
	
	return false;
}
function volverAJugar(){
	juego['accion'] = 'reload';
	stream.publish({
			channel: 'coca',
			message: juego
		});
}
function ganarJuego(){
	$('.btnsletras').addClass('overlaytransparente');
	$('.ganar').trigger('click'); 
}
function terminarJuego(){
	$('.btnsletras').addClass('overlaytransparente');
	$('.perder').trigger('click');
}
function descalificar(){
	
	jugador['accion'] = 'descalificar';
	jugador['uuid'] = UUID;
	jugador['status'] = 'perdio';
	
	stream.publish({
		channel: 'coca',
		message: jugador
	}); 
	$('.turno').css('visibility','hidden');
	$('.mensaje').css('visibility','hidden');
	$('.btnsletras').addClass('overlaytransparente');
	$('.descalificar').trigger('click');
}
function descalificar2(){
	$('.turno').css('visibility','hidden');
	$('.mensaje').css('visibility','hidden');
	$('.btnsletras').addClass('overlaytransparente');
	$('.descalificar2').trigger('click');
}


function retiraOportunidad(){
	var xx = $('.view'); 
	$(xx).eq(3 - oportunidadesGlobales).find('#tarjeta').addClass('flipped'); 
	oportunidadesGlobales --; 
	if(oportunidadesGlobales == 0){ 
		juego['perdio'] = UUID;
		juego['accion'] = 'perder';
		stream.publish({
			channel: 'coca',
			message: juego
		});
	}
}
function clicLetra(elem){
	
	$('.btnsletras').addClass('overlaytransparente');
	$(elem).addClass('rojoSeleccionado');
	$(elem).attr('onclick','').unbind('click');
	
	var letra = $(elem).html();
	console.log(letra);
	
	var tween = TweenMax.to('.L'+letra, 1, {opacity:1, ease:Power2.easeOut});
	var aciertos = $('.L'+letra).length;
	aciertosGlobales += aciertos;
	
	if(aciertos == 0){
		retiraOportunidad();
	}
	
	//revisar si ya se ha ganado
	if(aciertosGlobales == xacertar){
		juego['gano'] = UUID;
		juego['accion'] = 'ganar';
	}else{
		//cambiar turno
		juego['accion'] = 'cambiarTurno';
		juego['turno'] = UUID2;
	}
	stream.publish({
			channel: 'coca',
			message: juego
		});
}

function crearNombreOponente(){
	
	xacertar = 0;
	$('.nombreoponente').html(' ');
	var nombreOponente = oponente['nombre'];
	var letra;
	
	for(var i = 0; i < nombreOponente.length; i++){
	
		if(nombreOponente.charAt(i) == ' '){
			$('.nombreoponente').append("<li class='letraoponente espacio'></li>");
		}else{
			xacertar ++;
			letra = stripVowelAccent(nombreOponente.charAt(i)).toUpperCase();
			$('.nombreoponente').append("<li class='letraoponente ocupado'><span class='L"+letra+"'>"+nombreOponente.charAt(i)+"</span></li>");
		}
	}
	
	var containerW = 100;
	var letraoponenteW = containerW / nombreOponente.length;
	var decimo = letraoponenteW/10;
	letraoponenteW = letraoponenteW - decimo;
	
	$('.letraoponente').css('width',letraoponenteW+'%');
	$('.letraoponente').css('margin-right',(decimo/2)+'%');
	$('.letraoponente').css('margin-left',(decimo/2)+'%');
		
}

function miTurno(){
	$('.btnsletras').removeClass('overlaytransparente');
	$('.turno').html('TU TURNO');
	
	$('.mensaje').css('visibility','visible');
}
function noesmiTurno(){
	$('.btnsletras').addClass('overlaytransparente');
	$('.turno').html('ESPERA TU PRÓXIMO TURNO...');
	$('.mensaje').css('visibility','hidden');
} 
function listenComienza(){
	
	//login de jugadores
	jugador['accion'] = 'loginjugador';
	jugador['nombre'] = tunombre;
	jugador['uuid'] = UUID;
	jugador['oportunidades'] = 3;
	
	stream.publish({
		channel: 'coca',
		message: jugador
	});
	
	determinarTurno();
	
	
	stream.here_now({
		channel: 'coca',
		state: true,
		callback: function(msg) {
			console.log(msg);
			
			console.log('occupancy ' + msg.occupancy);
			console.log('uuids 0 ' + msg.uuids[0].uuid);
			console.log('uuids 1 ' + msg.uuids[1].uuid);
			
			if(msg.occupancy == 2){
				if(msg.uuids[0].uuid == 'C1' || msg.uuids[0].uuid == 'C2'){
					if(msg.uuids[1].uuid == 'C1' || msg.uuids[1].uuid == 'C2'){
						
						esperandoPartida();
						
					}
				}
			}
			
		}
	});
}

function esperandoPartida(){
	console.log('esperando partida');
	if(oponente['nombre'] == ''){
		setTimeout(function() { esperandoPartida(); }, 1000);
		}else{
		empezarPartida();
	}
}

function empezarPartida(){
	
	console.log('empezar partida');
	
	aciertosGlobales = 0;
	
	sigPag();
	
	if(juego['turno'] == UUID){
		miTurno();
	}else{
		noesmiTurno();
	}
	
}

function determinarTurno(){
	if(juego['turno'] == ''){
		
		var rand = Math.floor(Math.random() * 2) + 1;
		console.log(rand);
		juego['accion'] = 'updateTurno';
		juego['turno'] = 'C'+rand;
		
		stream.publish({
			channel: 'coca',
			message: juego
		});
		
	}
}

function makeCall(){
	if (!window.phone) alert("error en logueo!");
	else phone.dial(UUID2);
	return false;
}

function errWrap(fxn, form){
	try {
		return fxn(form);
		} catch(err) {
		alert("WebRTC is currently only supported by Chrome, Opera, and Firefox");
		return false;
	}
}