const baseUrl = "https://localhost:7231/api";
const form = document.getElementById("form");
const formWrapper = document.getElementById("form-wrapper");
const formLabel = document.getElementById("label");
const formDescription = document.getElementById("description");
const formAssignee = document.getElementById("assignee");
const formPriority = document.getElementById("priority");
const formVehicle = document.getElementById("vehicle");
const formMcp = document.getElementById("mcp");

const openFormBtn = document.querySelector(".create-btn");
const modalBackdrop = document.getElementById("modal-backdrop");
const taskNo = document.getElementById("task-no");

const getDefaultSelectOption = (opt) => {
	return `<option value="" disabled selected>Choose ${opt}</option>`;
};

form.addEventListener("submit", async (e) => {
	e.preventDefault();


	const taskData = {
		label: formLabel.value,
		description: formDescription.value,
		priority: formPriority.value,
		userId: formAssignee.value,
		vehicleId: formVehicle.value,
		mcpId: formMcp.value,
		createdAt: moment(new Date()).format("MM/DD/YYYY")
	};

	const res = await axios.post(`${baseUrl}/tasks`, taskData);
	const newTasksData = res.data.data;
	const curData = JSON.parse(sessionStorage.getItem("DATA"));

	curData.tasks = newTasksData;
	sessionStorage.setItem('DATA', JSON.stringify(curData));

	location.reload();
});

openFormBtn.addEventListener("click", (e) => {
	const data = JSON.parse(sessionStorage.getItem("DATA"));

	const taskId = data.tasks.length + 1;
	taskNo.innerHTML = taskId >= 10 ? taskId : `0${taskId}`;

	const userOptions = data.users.map((user) => {
		return {
			fullname: user.fullname,
			id: user.id,
		};
	});
	const mcpOptions = data.mcps.map((mcp) => {
		return {
			id: mcp.id,
			address: mcp.address,
		};
	});
	const vehicleOptions = data.vehicle.map((vehicle) => vehicle.id);

	formVehicle.innerHTML = getDefaultSelectOption("vehicle");
	formMcp.innerHTML = getDefaultSelectOption("MCP");
	formAssignee.innerHTML = getDefaultSelectOption("Assignee");

	userOptions.forEach((opt) => {
		const option = document.createElement("option");
		option.value = opt.id;
		option.text = opt.fullname;

		formAssignee.appendChild(option);
	});

	mcpOptions.map((opt) => {
		const option = document.createElement("option");
		option.value = opt.id;
		option.text = opt.address;

		formMcp.appendChild(option);
	});

	vehicleOptions.map((opt) => {
		const option = document.createElement("option");
		option.value = opt;
		option.text = opt;

		formVehicle.appendChild(option);
	});
});