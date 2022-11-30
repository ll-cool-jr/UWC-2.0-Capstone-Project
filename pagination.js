var MCPs = [
  {
    id: "7e8",
    status: "Unfilled",
    address: "193 Del Sol Avenue",
    currentCapacity: 65,
    MaxCapacity: 147,
  },
  {
    id: "174",
    status: "Unfilled",
    address: "49617 Reinke Court",
    currentCapacity: 8,
    MaxCapacity: 178,
  },
  {
    id: "0aa",
    status: "Unfilled",
    address: "206 Lake View Alley",
    currentCapacity: 70,
    MaxCapacity: 152,
  },
  {
    id: "11d",
    status: "Unfilled",
    address: "078 Heath Crossing",
    currentCapacity: 7,
    MaxCapacity: 494,
  },
  {
    id: "797",
    status: "Overloaded",
    address: "7 Susan Crossing",
    currentCapacity: 93,
    MaxCapacity: 434,
  },
  {
    id: "242",
    status: "Overloaded",
    address: "5281 Crescent Oaks Court",
    currentCapacity: 35,
    MaxCapacity: 463,
  },
  {
    id: "adf",
    status: "Overloaded",
    address: "883 Arapahoe Avenue",
    currentCapacity: 48,
    MaxCapacity: 388,
  },
  {
    id: "269",
    status: "Overloaded",
    address: "7485 Gina Road",
    currentCapacity: 85,
    MaxCapacity: 370,
  },
  {
    id: "09b",
    status: "Unfilled",
    address: "55 Hazelcrest Lane",
    currentCapacity: 32,
    MaxCapacity: 283,
  },
  {
    id: "a99e",
    status: "Unfilled",
    address: "3076 Independence Circle",
    currentCapacity: 12,
    MaxCapacity: 428,
  },
  {
    id: "09b",
    status: "Unfilled",
    address: "55 Hazelcrest Lane",
    currentCapacity: 32,
    MaxCapacity: 283,
  },
  {
    id: "a99e",
    status: "Unfilled",
    address: "3076 Independence Circle",
    currentCapacity: 12,
    MaxCapacity: 428,
  },
  {
    id: "0dbe",
    status: "Unfilled",
    address: "2339 Forest Run Avenue",
    currentCapacity: 33,
    MaxCapacity: 368,
  },
  {
    id: "932",
    status: "Overloaded",
    address: "6 Crescent Oaks Street",
    currentCapacity: 34,
    MaxCapacity: 363,
  },
  {
    id: "e69f",
    status: "Unfilled",
    address: "3 Delaware Park",
    currentCapacity: 2,
    MaxCapacity: 176,
  },
  {
    id: "2f4f",
    status: "Overloaded",
    address: "1132 Mendota Center",
    currentCapacity: 11,
    MaxCapacity: 355,
  },
  {
    id: "eb0ae",
    status: "Unfilled",
    address: "9935 Donald Street",
    currentCapacity: 48,
    MaxCapacity: 369,
  },
]


/*
1 - Loop Through Array & Access each value
2 - Create Table Rows & append to table
*/
// import MCPs from "../constants/MCPs.js";

var state = {
'querySet': MCPs,

'page': 1,
'rows': 7,
'window': 7,
}

buildTable()

function pagination(querySet, page, rows) {

var trimStart = (page - 1) * rows
var trimEnd = trimStart + rows

var trimmedData = querySet.slice(trimStart, trimEnd)

var pages = Math.round(querySet.length / rows);

return {
  'querySet': trimmedData,
  'pages': pages,
}
}

function pageButtons(pages) {
var wrapper = document.getElementById('pagination-wrapper')

wrapper.innerHTML = ``
console.log('Pages:', pages)

var maxLeft = (state.page - Math.floor(state.window / 2))
var maxRight = (state.page + Math.floor(state.window / 2))

if (maxLeft < 1) {
  maxLeft = 1
  maxRight = state.window
}

if (maxRight > pages) {
  maxLeft = pages - (state.window - 1)
  
  if (maxLeft < 1){
    maxLeft = 1
  }
  maxRight = pages
}



for (var page = maxLeft; page <= maxRight; page++) {
wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
}

if (state.page != 1) {
  wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
}

if (state.page != pages) {
  wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
}

$('.page').on('click', function() {
  $('#table-body').empty()

  state.page = Number($(this).val())

  buildTable()
})

}


function buildTable() {
var table = $('#table-body')

var data = pagination(state.querySet, state.page, state.rows)
var myList = data.querySet

for (var i = 1; i < myList.length; i++) {
  //Keep in mind we are using "Template Litterals to create rows"
  var row = `<tr>
              <td class="pt-4">${myList[i].id}</td>
              <td class="pt-4">${myList[i].status}</td>
              <td class="pt-4">${myList[i].address}</td>
              <td class="pt-4">${myList[i].currentCapacity}</td>
              <td class="pt-4">${myList[i].MaxCapacity}</td>
            </tr>
            `
  table.append(row)
}

pageButtons(data.pages)
}
