import users from "../constants/users.js";

const formLogin = document.getElementById('form-login');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');


// ------------------ LOGIN ------------------ //

formLogin?.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = emailLogin.value;
	const password = passwordLogin.value;

	const isAuth = users.find(user => {
		return user.email === email && user.password === password;
	});


	if (isAuth) {
		window.location.href = 'views/dashboard.html';
	}
});