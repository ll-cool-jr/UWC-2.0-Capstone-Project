import { formatNumber } from "./helpers.js";

const baseUrl = "https://localhost:7231/api";
const form = document.getElementById("form");
const formLabel = document.getElementById("label");
const formDescription = document.getElementById("description");
const formAssignee = document.getElementById("assignee");
const formPriority = document.getElementById("priority");
const formVehicle = document.getElementById("vehicle");
const formMcp = document.getElementById("mcp");

const openFormBtn = document.querySelector(".create-btn");
const taskNo = document.getElementById("task-no");

const getDefaultSelectOption = (opt) => {
  return `<option value="" disabled selected>Chọn ${opt}</option>`;
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
    createdAt: moment(new Date()).format("MM/DD/YYYY hh:mm"),
  };

  const res = await axios.post(`${baseUrl}/tasks`, taskData);
  const newTasksData = res.data.data;
  const curData = JSON.parse(sessionStorage.getItem("DATA"));

  curData.tasks = newTasksData;
  sessionStorage.setItem("DATA", JSON.stringify(curData));

  location.reload();
});

openFormBtn.addEventListener("click", (e) => {
  const data = JSON.parse(sessionStorage.getItem("DATA"));

  const taskId = data.tasks.length + 1;
  taskNo.innerHTML = formatNumber(taskId);

  const userOptions = data.users.map((user) => {
    return {
      fullname: user.fullname,
      id: user.id,
    };
  });
  const mcpOptions = data.mcps.map((mcp) => {
    return {
      id: mcp.id,
      location: mcp.location,
    };
  });
  const vehicleOptions = data.vehicle.map((vehicle) => vehicle.id);

  formVehicle.innerHTML = getDefaultSelectOption("phương tiện");
  formMcp.innerHTML = getDefaultSelectOption("MCP");
  formAssignee.innerHTML = getDefaultSelectOption("nhân viên");

  userOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt.id;
    option.text = opt.fullname;

    formAssignee.appendChild(option);
  });

  vehicleOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formVehicle.appendChild(option);
  });

  mcpOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt.id;
    option.text = opt.location;

    formMcp.appendChild(option);
  });
});

// Map options
let defaultCoords = {
  lat: 10.7721603889492,
  lng: 106.70428276829283,
};
const mapOptions = {
  center: defaultCoords,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

const map = new google.maps.Map(
  document.getElementById("googleMap"),
  mapOptions
);
const route = new google.maps.DirectionsService();
const routeRender = new google.maps.DirectionsRenderer();
const geocoder = new google.maps.Geocoder();
routeRender.setMap(map);

const calcRoute = (origin, destination) => {
  let request = {
    origin,
    destination,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  route.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      console.log(result.routes[0]);

      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class ='alert-info'>" +
        "Khoảng cách: " +
        result.routes[0].legs[0].distance.text +
        ".<br />Thời gian dự tính: " +
        result.routes[0].legs[0].duration.text +
        ".</div>";

      routeRender.setDirections(result);
    }
  });
};

formMcp.addEventListener("change", (e) => {
  const mcps = JSON.parse(sessionStorage.getItem("DATA")).mcps;
  const targetMcp = mcps[e.target.value - 1];

  const success = (pos) => {
    const crd = pos.coords;
    const { latitude: lat, longitude: lng } = crd;
    defaultCoords = { lat, lng };

    geocoder.geocode(
      { address: targetMcp.address },
      function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const latitude = results[0].geometry.location.lat();
          const longitude = results[0].geometry.location.lng();

          calcRoute(defaultCoords, { lat: latitude, lng: longitude });
        }
      }
    );
  };

  const error = () => console.error(defaultCoords);

  navigator.geolocation.getCurrentPosition(success, error);
});
