var video_out = document.getElementById("vid-box");
var stream;
login();
var contReady = 0;


function login() {
	var phone = window.phone = PHONE({
		number        : "C2", // listen on username line else Anonymous
		publish_key   : 'pub-c-4c902a56-d0d3-4f28-8424-8d0400870e89', // Your Pub Key
		subscribe_key : 'sub-c-172d1fbc-5b79-11e6-8ee6-0619f8945a4f', // Your Sub Key
		
	});	
	phone.ready(function(){makeCall();});
	phone.receive(function(session){
		session.connected(function(session) { video_out.appendChild(session.video);console.log("esperando video!")});
		session.ended(function(session) { video_out.innerHTML=''; });
	});
	
	stream = PUBNUB.init({
        publish_key: 'pub-c-4c902a56-d0d3-4f28-8424-8d0400870e89',
        subscribe_key: 'sub-c-172d1fbc-5b79-11e6-8ee6-0619f8945a4f',
		ssl : (('https:' == document.location.protocol) ? true : false),
		uuid : 'C2'
	});
	
	
	stream.subscribe({
		channel: 'coca',
		message: function(m){
			console.log(m);
			
			if(m.accion == 'ready'){
				contReady ++;
			}
			
			
			
		},
		presence: function(m) {
			console.log(m);
		}
	});
	
	return false;
}

function listenComienza(){
	/*stream.publish({
		channel: 'coca',
		message: {"accion":"ready"}
	}); */
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
						empezarPartida();
				}
			}
		}
		
	  }
	});
}

function empezarPartida(){
	
	console.log('empezar partida');
	sigPag();
	
}

function makeCall(){
	if (!window.phone) alert("error en logueo!");
	else phone.dial("C1");
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