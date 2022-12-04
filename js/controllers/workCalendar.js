import { datesInMonths, days } from "../constants/calendar.js";

const workCalendarHeader = document.querySelector("#work-calendar thead tr");
const workCalendarBody = document.querySelector("#work-calendar tbody");


const renderWorkCalendar = () => {
  const initialTableData = Array(35).fill(0);
  const currMonth = new Date().getMonth();
  const dates = datesInMonths[currMonth];
  const startDay = new Date(2022, currMonth, 1).getDay();
  const tableHeads = days.slice(startDay).concat(days.slice(0, startDay));

  const tableDataCells = initialTableData.map((_, idx) => {
    if (idx >= dates) {
      return idx - dates + 1;
    } else return idx + 1;
  });

  const tableDataRows = [];
  let temp = [];
  tableDataCells.forEach((data, idx) => {
    if (idx === tableDataCells.length - 1) {
      temp.push(data);
      tableDataRows.push(temp);
    } else {
      if (idx % 7 === 0 && idx > 0) {
        tableDataRows.push(temp);
        temp = [data];
      } else temp.push(data);
    }
  });

  workCalendarHeader.innerHTML = "";
  tableHeads
    .map((head) => {
      const th = document.createElement("th");
      const span = document.createElement("span");
      th.classList.add("calendar-header");
      span.innerHTML = head;
      th.appendChild(span);
      return th;
    })
    .forEach((item) => workCalendarHeader.appendChild(item));

  workCalendarBody.innerHTML = "";
  tableDataRows
    .map((row, idxRow) => {
      const tr = document.createElement("tr");
      tr.classList.add("calendar-body__row", "text-center");
      row.forEach((cell, idxCell) => {
        const td = document.createElement("td");
        const tdWrapper = document.createElement("div");
        const tdTitle = document.createElement("div");
        const tdContent = document.createElement("div");

        td.classList.add("row-cell");
        tdWrapper.classList.add("row-wrapper");
        tdTitle.classList.add("row-title");
        tdContent.classList.add("row-content");

        if (idxRow === 4 && idxCell > 2) {
          td.classList.add("row-cell__extend");
        }

        tdTitle.innerHTML = cell;
        tdWrapper.appendChild(tdTitle);
        tdWrapper.appendChild(tdContent);
        td.appendChild(tdWrapper);
        tr.appendChild(td);
      });

      return tr;
    })
    .forEach((item) => workCalendarBody.appendChild(item));
};

renderWorkCalendar();





