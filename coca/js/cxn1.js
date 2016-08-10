var video_out = document.getElementById("vid-box");
var stream;
login();

function login() {
	var phone = window.phone = PHONE({
		number        : "C1", // listen on username line else Anonymous
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
		ssl : (('https:' == document.location.protocol) ? true : false)
    });
	
	
	stream.subscribe({
		channel: 'coca',
		message: function(m){
			console.log(m);
			
			console.log(m.ready);
			
			}
	});
	
	return false;
}

function enviarMensaje(){
	stream.publish({
		channel: 'coca',
		message: {"ready":"c1"}
	}); 
}

function makeCall(){
	if (!window.phone) alert("error en logueo!");
	else phone.dial("C2");
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