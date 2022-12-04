const users = JSON.parse(sessionStorage.getItem('DATA')).users;

janitorsCountFunc(users);
collectorsCountFunc(users);

function janitorsCountFunc(data) {
	var janitorsCount = document.getElementById('janitorsCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].role === "Janitor") {
			count++;
		}
	}

	janitorsCount.innerHTML = `${count}`;
}

function collectorsCountFunc(data) {
	var collectorsCount = document.getElementById('collectorsCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].role === "Collector") {
			count++;
		}
	}

	collectorsCount.innerHTML = `${count}`;
}
