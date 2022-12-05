const usernameSidenav = document.getElementById("sidenav-username");
const fullname = JSON.parse(sessionStorage.getItem('AUTH')).fullname;

usernameSidenav.innerHTML = `Account: ${fullname}`;