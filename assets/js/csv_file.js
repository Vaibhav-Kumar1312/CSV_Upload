let initialTable = document.querySelector("#csv-data-table");
let tableHeader = document.querySelector("#table-header");
let originaltBody = document.querySelector(".original-table");
let searchtBody = document.querySelector(".search-table");
let searchInput = document.querySelector(".search-bar");
const pageForm = document.querySelector("#pagination-form");
const skipPageBtn = document.querySelector("#page-button");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const pageChangeBtn = document.querySelectorAll(".page-change-btn");
const selectDD = document.querySelector("#page-number");
let data = initialTable.dataset.csv;
let csvArray = JSON.parse(data);
let sortData = [];

function displaySearchTable(objectArray) {
  if (objectArray.length <= 0) {
    searchtBody.innerHTML = "<h1>No Result Found</h1>";
    return;
  }
  originaltBody.classList.add("hidden");
  searchtBody.innerHTML = "";
  for (const obj of objectArray) {
    let html = "";
    Object.values(obj).forEach((value) => {
      html += `<td>${value}</td>`;
    });
    const newRow = document.createElement("tr");
    newRow.innerHTML = html;
    searchtBody.appendChild(newRow);
  }
}

searchInput.addEventListener("keyup", function (e) {
  if (e.target.value === "") {
    initialTable.classList.remove("hidden");
    return;
  }
  let newData = [];
  if (e.target.value !== "") {
    for (let i = 0; i < csvArray.length; i++) {
      let valueArray = Object.values(csvArray[i]);
      console.log(valueArray);

      for (const item of valueArray) {
        if (item.toLowerCase().includes(e.target.value.toLowerCase())) {
          newData.push(csvArray[i]);
          break;
        }
      }
    }
  }
  sortData = [...newData];
  displaySearchTable(newData);

  console.log(sortData);
});

function renderSortedTable(arr) {
  originaltBody.innerHTML = "";
  arr.forEach(() => {});
}

tableHeader.addEventListener("click", function (e) {
  console.log(e.target.innerHTML);
  if (sortData.length) {
    sortTableData(e.target.innerHTML, sortData);
    return;
  }
  sortTableData(e.target.innerHTML, csvArray);
});
function sortTableData(key, tableData) {
  const data = [...tableData];
  if (!Number.isNaN(Number(data[0][key]))) {
    console.log("number sort");
    data.sort((a, b) => a[key] - b[key]);
  }
  if (Number.isNaN(Number(data[0][key]))) {
    console.log("string sort");
    data.sort((a, b) => {
      let fa = a[key].toLowerCase();
      let fb = b[key].toLowerCase();
      if (fa > fb) {
        return 1;
      }
      if (fa < fb) {
        return -1;
      }
    });
  }
  displaySearchTable(data);
}

skipPageBtn.addEventListener("click", function (event) {
  const queryString = `?page=${selectDD.value}&limit=100`;
  window.location.search = queryString;
});

btnLeft.addEventListener("click", function (e) {
  e.preventDefault();
  if (Number(selectDD.value) - 1 > 0) {
    const queryString = `?page=${Number(selectDD.value) - 1}&limit=100`;
    window.location.search = queryString;
    return;
  }
});

btnRight.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(btnRight.dataset.lastpage);
  if (Number(selectDD.value) + 1 < btnRight.dataset.lastpage) {
    const queryString = `?page=${Number(selectDD.value) + 1}&limit=100`;
    window.location.search = queryString;
    return;
  }
});
