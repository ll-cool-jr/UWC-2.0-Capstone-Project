const form = document.getElementById("form");
const formWrapper = document.getElementById("form-wrapper");
const formLabel = document.getElementById("label");
const formDescription = document.getElementById("description");
const formAssignee = document.getElementById("assignee");
const formPriority = document.getElementById("priority");
const formVehicle = document.getElementById("vehicle");
const formMcp = document.getElementById("mcp");

const openFormBtn = document.querySelector(".create-btn");
const baseUrl = "https://localhost:7231/api";
const modalBackdrop = document.getElementById("modal-backdrop");

const quantityContent = document.querySelectorAll(".c-content .quantity");
const taskProgress = document.querySelector(".task-progress .front");
const pieChart = document.getElementById("wastedProportion");
const barChart = document.getElementById("wastedLast5Days");

const graphColors = ["#f43b41", "#31e36c", "#6b8beb", "#ef9834", "#9a580c"];

let data = {};

const getDefaultSelectOption = (opt) => {
  return `<option value="" disabled selected>Choose ${opt}</option>`;
};

const getObjectOfData = (arr, key, value) => {
  const obj = {};

  arr.forEach((item) => {
    obj[item[key]] = item[value];
  });

  return obj;
};

const displayChartData = (
  node,
  type,
  text,
  hoverOffset,
  showLegend,
  xValues,
  yValues
) => {
  new Chart(node, {
    type,
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: type !== "bar" ? graphColors : "#424955",
          data: yValues,
          hoverOffset,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: showLegend,
          align: "center",
          labels: {
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text,
          padding: {
            bottom: 20,
            top: 0,
          },
          font: {
            size: 20,
          },
          color: "#075794",
        },
      },
    },
  });
};

const getData = async () => {
  const userResponse = await axios.get(`${baseUrl}/users`);
  const mcpResponse = await axios.get(`${baseUrl}/mcp`);
  const vehicleResponse = await axios.get(`${baseUrl}/vehicle`);
  const taskResponse = await axios.get(`${baseUrl}/tasks`);
  const wasteDataResponse = await axios.get(`${baseUrl}/wasteData`);

  data.users = userResponse.data.data;
  data.mcps = mcpResponse.data.data;
  data.vehicle = vehicleResponse.data.data;
  data.tasks = taskResponse.data.data;
  data.wasteData = wasteDataResponse.data.data;

  sessionStorage.setItem("DATA", JSON.stringify(data));
};

const displayData = () => {
  Object.entries(data).forEach(([key, value], idx) => {
    if (quantityContent[idx]) {
      quantityContent[idx].innerHTML = `${value.length}${
        key === "tasks" ? "%" : ""
      }`;
    }
  });

  const sortedWasteData = data.mcps
    .map((mcp) => {
      return {
        address: mcp.address,
        currcapacity: mcp.currcapacity,
      };
    })
    .sort((a, b) => -a.currcapacity + b.currcapacity);

  const firstFourData = sortedWasteData.slice(0, 4);
  const otherWasteData = sortedWasteData.slice(4);
  const otherWasteValue = otherWasteData.reduce(
    (accumulator, currentValue) => accumulator + currentValue.currcapacity,
    0
  );
  const wasteProportionData = getObjectOfData(
    firstFourData,
    "address",
    "currcapacity"
  );
  wasteProportionData.Other = otherWasteValue;

  const wasteProportionXValues = Object.keys(wasteProportionData);
  const wasteProportionYValues = Object.values(wasteProportionData);

  const wasteLast5DaysData = getObjectOfData(data.wasteData, "day", "tons");

  const wasteCollectedXValues = Object.keys(wasteLast5DaysData);
  const wasteCollectedYValues = Object.values(wasteLast5DaysData);

  displayChartData(
    pieChart,
    "pie",
    "Waste Proportion In Different Areas",
    4,
    true,
    wasteProportionXValues,
    wasteProportionYValues
  );
  displayChartData(
    barChart,
    "bar",
    "Waste Collected And Handled In The Previous Week In Tons",
    0,
    false,
    wasteCollectedXValues,
    wasteCollectedYValues
  );
};

if (sessionStorage.getItem("DATA") === null) {
  getData();
} else {
  data = JSON.parse(sessionStorage.getItem("DATA"));
}

displayData();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const taskData = {
    label: formLabel.value,
    description: formDescription.value,
    assignee: formAssignee.value,
    priority: formPriority.value,
    vehicle: formVehicle.value,
    mcp: formMcp.value,
  };
  console.log(taskData);
});

openFormBtn.addEventListener("click", (e) => {
  const userOptions = data.users.map((user) => user.fullname);
  const mcpOptions = data.mcps.map((mcp) => {
    return {
      id: mcp.id,
      address: mcp.address,
    };
  });
  const vehicleOptions = data.vehicle.map((vehicle) => vehicle.id);

  userOptions.forEach((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formAssignee.innerHTML = getDefaultSelectOption("Assignee");
    formAssignee.appendChild(option);
  });

  mcpOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt.id;
    option.text = opt.id + "    -    " + opt.address;

    formMcp.innerHTML = getDefaultSelectOption("MCP");
    formMcp.appendChild(option);
  });

  vehicleOptions.map((opt) => {
    const option = document.createElement("option");
    option.value = opt;
    option.text = opt;

    formVehicle.innerHTML = getDefaultSelectOption("vehicle");
    formVehicle.appendChild(option);
  });
});
