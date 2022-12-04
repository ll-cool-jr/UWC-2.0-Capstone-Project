const Vehicles = JSON.parse(sessionStorage.getItem('DATA')).vehicle;

TruckAvailableCount(Vehicles);
TruckProgressingCount(Vehicles);
TrollerAvailableCount(Vehicles);
TrollerProgressingCount(Vehicles);


function TruckAvailableCount(data) {
	var TruckAvailableCount = document.getElementById('TruckAvailableCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status === "Available" && data[i].type === "truck") {
			count++;
		}
	}

	TruckAvailableCount.innerHTML = `${count}`;
}

function TruckProgressingCount(data) {
	var TruckProgressingCount = document.getElementById('TruckProgressingCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status === "Progress" && data[i].type === "truck") {
			count++;
		}
	}

	TruckProgressingCount.innerHTML = `${count}`;
}

function TrollerAvailableCount(data) {
	var TrollerAvailableCount = document.getElementById('TrollerAvailableCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status === "Available" && data[i].type === "troller") {
			count++;
		}
	}

	TrollerAvailableCount.innerHTML = `${count}`;
}

function TrollerProgressingCount(data) {
	var TrollerProgressingCount = document.getElementById('TrollerProgressingCount');

	var count = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].status === "Progress" && data[i].type === "troller") {
			count++;
		}
	}

	TrollerProgressingCount.innerHTML = `${count}`;
}