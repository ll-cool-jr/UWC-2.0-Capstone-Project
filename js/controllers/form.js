const form = document.getElementById('form');
const formWrapper = document.getElementById('form-wrapper');
const formLabel = document.getElementById('label');
const formDescription = document.getElementById('description');
const formAssignee = document.getElementById('assignee');
const formReporter = document.getElementById('reporter');
const formPriority = document.getElementById('priority');
const formVehicle = document.getElementById('vehicle');
const formMcp = document.getElementById('mcp');
const closeFormBtn = document.getElementById('close-form-btn');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const taskData = {
		label: formLabel.value,
		description: formDescription.value,
		assignee: formAssignee.value,
		reporter: formReporter.value,
		priority: formPriority.value,
		vehicle: formVehicle.value,
		mcp: formMcp.value,
	};
	console.log(taskData);
});

closeFormBtn.addEventListener('click', (e) => {
	formWrapper.classList.add('d-none');
});