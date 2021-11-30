'use strict';
const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', async (evt) => {
	evt.preventDefault();
	const data = serializeJson(signupForm);
	const fetchOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};
	const response = await fetch(url + '/auth/register', fetchOptions);
	const json = await response.json();
	if (!json.token) {
		alert(json.message);
	} else {
		// save token
		sessionStorage.setItem('token', json.token);
		sessionStorage.setItem('user', JSON.stringify(json.user));
		location.href = './front/index.html';
	}
});