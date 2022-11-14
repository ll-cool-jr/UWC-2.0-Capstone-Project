import { users } from './constants.js';

const formLogin = document.getElementById('form-login');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');


formLogin.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = emailLogin.value;
	const password = passwordLogin.value;

	const isAuth = users.some(user => {
		return user.email === email && user.password === password;
	});

	if (isAuth) {
		console.log(true);
		window.location.href = '/home.html';
	}
});