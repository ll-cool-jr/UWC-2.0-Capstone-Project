const users = JSON.parse(sessionStorage.getItem('DATA')).users;
import { formatNumber } from "./helpers.js";

const bgColors = ["#9095a0", "#008192", "#8353e2", "#00bdd6", "#9a580c", "#f5555a", "#1dd75b", "#1091f4", "#db3d3d"];

const getRandomColor = () => {
	const randomIdx = Math.floor(Math.random() * bgColors.length);
	return bgColors[randomIdx];
};

var state = {
	'querySet': users,

	'page': 1,
	'rows': 5,
	'window': 7,
};

buildTable();

function pagination(querySet, page, rows) {

	var trimStart = (page - 1) * rows;
	var trimEnd = trimStart + rows;

	var trimmedData = querySet.slice(trimStart, trimEnd);

	var pages = Math.round(querySet.length / rows);

	return {
		'querySet': trimmedData,
		'pages': pages,
	};
}

function pageButtons(pages) {
	var wrapper = document.getElementById('pagination-wrapper');

	wrapper.innerHTML = ``;

	var maxLeft = (state.page - Math.floor(state.window / 2));
	var maxRight = (state.page + Math.floor(state.window / 2));

	if (maxLeft < 1) {
		maxLeft = 1;
		maxRight = state.window;
	}

	if (maxRight > pages) {
		maxLeft = pages - (state.window - 1);

		if (maxLeft < 1) {
			maxLeft = 1;
		}
		maxRight = pages;
	}



	for (var page = maxLeft; page <= maxRight; page++) {
		if (state.page != page) {
			wrapper.innerHTML += `<button value=${page} class="page btn rounded-circle btn-info uncur_pag_style">${page}</button>`;
		}
		else {
			wrapper.innerHTML += `<button value=${page} class="page btn rounded-circle btn-info cur_pag_style">${page}</button>`;
		}

	}

	if (state.page != 1) {
		wrapper.innerHTML = `<button value=${1} class="page btn rounded-circle btn-info uncur_pag_style">&#171;</button>` + wrapper.innerHTML;
	}

	if (state.page != pages) {
		wrapper.innerHTML += `<button value=${pages} class="page btn rounded-circle btn-info uncur_pag_style">&#187;</button>`;
	}

	$('.page').on('click', function () {
		$('#table-personnel').empty();

		state.page = Number($(this).val());

		buildTable();
	});

}


function buildTable() {
	var table = $('#table-personnel');

	var data = pagination(state.querySet, state.page, state.rows);
	var myList = data.querySet;

	for (var i = 0; i < myList.length; i++) {
		const tr = document.createElement('tr');
		tr.setAttribute("data-bs-toggle", "modal");
		tr.setAttribute("data-bs-target", "#work-calendar");
		tr.setAttribute("data-user", myList[i].fullname);
		tr.classList.add('personnel-row');
		tr.innerHTML = ``;

		var row1 = `<td class="pt-4"><img src="${myList[i].avatar}" alt="" class="row-avatar"> ${myList[i].id}</td>`;
		var row2 = `
          <td class="pt-4">${myList[i].role}</td>
          <td class="pt-4">${myList[i].fullname}</td>
          <td class="pt-4">${myList[i].email}</td>
          <td class="pt-4">${myList[i].phonenumber}</td>
          <td> 
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#editModal"><i class="fa-solid fa-edit"></i></button>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="fa-solid fa-trash"></i></button>
          </td>`;
		var row = row1 + row2;
		tr.innerHTML = row;

		tr.addEventListener('click', (e) => {
			const user = tr.getAttribute("data-user");
			const toDoTasks = users.find(elem => elem.fullname === user).toDoTasks;
			const allTableContentData = document.querySelectorAll('.row-content');

			allTableContentData.forEach((item) => {
				item.innerHTML = '';
			});

			if (toDoTasks.length > 0) {
				toDoTasks.forEach((item) => {

					const dueDate = new Date(item.createdAt);
					const date = dueDate.getDate();
					const hours = dueDate.getHours();
					const minutes = dueDate.getMinutes();
					const task = document.createElement('div');
					task.classList.add("row-content__task");
					task.style.backgroundColor = getRandomColor();
					task.innerHTML = `${item.label} - ${formatNumber(hours)}:${formatNumber(minutes)}`;

					allTableContentData[date - 1].appendChild(task);
				});
			}
		});
		table.append(tr);
	}

	pageButtons(data.pages);
}
