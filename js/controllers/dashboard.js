import { days } from "../constants/calendar.js";

const baseUrl = "https://localhost:7231/api";
const quantityContent = document.querySelectorAll(".c-content .quantity");
const taskProgress = document.querySelector(".task-progress .front");
const pieChart = document.getElementById("wastedProportion");
const barChart = document.getElementById("wastedLast5Days");
const loadingSpinner = document.getElementById("loading-spinner");

const graphColors = ["#f43b41", "#31e36c", "#6b8beb", "#ef9834", "#9a580c"];

let data = {};

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
  loadingSpinner.setAttribute("aria-hidden", "false");
  const userResponse = await axios.get(`${baseUrl}/users/employee`);
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
  location.reload();
  loadingSpinner.setAttribute("aria-hidden", "true");
};

const displayData = () => {
  Object.entries(data).forEach(([key, value], idx) => {
    if (quantityContent[idx]) {
      if (key === "tasks") {
        const donePercentage =
          (value.filter((task) => task.isdone).length / value.length) * 100;
        taskProgress.style.width = `${donePercentage}%`;
        quantityContent[idx].innerHTML = `${Math.round(donePercentage)}%`;
      } else quantityContent[idx].innerHTML = value.length;
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

  const wasteLastWeekData = getObjectOfData(data.wasteData, "day", "tons");

  const wasteCollectedXValues = Object.keys(wasteLastWeekData);
  const wasteCollectedYValues = Object.values(wasteLastWeekData);

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
    days,
    wasteCollectedYValues
  );
};

if (!sessionStorage.getItem("DATA")) {
  getData();
} else {
  data = JSON.parse(sessionStorage.getItem("DATA"));
}

displayData();
