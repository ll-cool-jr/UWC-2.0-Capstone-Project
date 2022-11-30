const modalBackdrop = document.getElementById('modal-backdrop');
const form = document.getElementById("form");
const formWrapper = document.getElementById("form-wrapper");
const formLabel = document.getElementById("label");
const formDescription = document.getElementById("description");
const formAssignee = document.getElementById("assignee");
const formReporter = document.getElementById("reporter");
const formPriority = document.getElementById("priority");
const formVehicle = document.getElementById("vehicle");
const formMcp = document.getElementById("mcp");
const closeFormBtn = document.getElementById("close-form-btn");
const openFormBtn = document.getElementById("open-form-btn");
const baseUrl = "https://localhost:7231/api";

const getData = async () => {
  const userResponse = await axios.get(`${baseUrl}/users`);
  const mcpResponse = await axios.get(`${baseUrl}/mcp`);
  const vehicleResponse = await axios.get(`${baseUrl}/vehicle`);

  const state = {};

  state.users = userResponse.data;
  state.mcps = mcpResponse.data;
  state.vehicle = vehicleResponse.data;

  sessionStorage.setItem("DATA", JSON.stringify(state));
};

if (sessionStorage.getItem("DATA") === null) {
  getData();
}

form.addEventListener("submit", (e) => {
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

closeFormBtn.addEventListener("click", (e) => {
  formWrapper.classList.add("d-none");
  modalBackdrop.classList.add("d-none");
});

openFormBtn.addEventListener("click", (e) => {
  formWrapper.classList.remove("d-none");
  modalBackdrop.classList.remove("d-none");

  let data;
  const storedData = sessionStorage.getItem("DATA");
  if (storedData) data = JSON.parse(storedData);
  else {
    console.error("Error: could not load data");
  }

  const userOptions = data.users.data.map((user) => user.fullname);
  const mcpOptions = data.mcps.data.map((mcp) => mcp.id);
  const vehicleOptions = data.vehicle.data.map((vehicle) => vehicle.id);

  userOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formAssignee.appendChild(option);
  });

  mcpOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formMcp.appendChild(option);
  });

  vehicleOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formVehicle.appendChild(option);
  });

  const reporterOptions = [
    "Anonymous",
    JSON.parse(sessionStorage.getItem("AUTH")).fullname,
  ];

  reporterOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formReporter.appendChild(option);
  });
});
