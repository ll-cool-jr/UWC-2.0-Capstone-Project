import users from "../constants/users.js";

JanitorsAvailableCount(users);
JanitorsProgressingCount(users);
CollectorsAvailableCount(users);
CollectorsProgressingCount(users);


function JanitorsAvailableCount(data) {
	var JanitorsAvailableCount = document.getElementById('JanitorsAvailableCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status == "Available" && data[i].type == "Janitor") {
			count++;
		}
	}

	JanitorsAvailableCount.innerHTML = `${count}`;
}

function JanitorsProgressingCount(data) {
	var JanitorsProgressingCount = document.getElementById('JanitorsProgressingCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status == "Progress" && data[i].type == "Janitor") {
			count++;
		}
	}

	JanitorsProgressingCount.innerHTML = `${count}`;
}

function CollectorsAvailableCount(data) {
	var CollectorsAvailableCount = document.getElementById('CollectorsAvailableCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status == "Available" && data[i].type == "Collector") {
			count++;
		}
	}

	CollectorsAvailableCount.innerHTML = `${count}`;
}

function CollectorsProgressingCount(data) {
	var CollectorsProgressingCount = document.getElementById('CollectorsProgressingCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status == "Progress" && data[i].type == "Collector") {
			count++;
		}
	}

	CollectorsProgressingCount.innerHTML = `${count}`;
}