// 'ident' and 'secret' should ideally be passed server-side for security purposes.
// If secureTokenRetrieval is true then you should remove these two values.

// Insecure method
var xirsysConnect = {
	secureTokenRetrieval : false,
	data : {
		domain : 'pautacreativa.github.io',
		application : 'coca5',
		room : 'ss10',
		ident : 'lasoupedjour',
		secret : '00ff400c-6566-11e6-bed5-42bcc4f7e9e3',
		secure : 1
	}
};

// Secure method
/*var xirsysConnect = {
	secureTokenRetrieval : true,
	server : '../getToken.php',
	data : {
		domain : '< www.yourdomain.com >',
		application : 'default',
		room : 'default',
		secure : 1
	}
};*/

