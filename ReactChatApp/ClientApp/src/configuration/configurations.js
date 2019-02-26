const configuration = {
	authority: 'http://localhost:5002/',
	client_id: 'reactchat',
	redirect_uri: 'http://localhost:3000/',
	response_type: 'id_token',
	scope: 'openid profile',
	post_logout_redirect_uri: 'http://localhost:3000/',
};

export default configuration;
