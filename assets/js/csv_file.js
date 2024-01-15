let initialTable = document.querySelector("#csv-data-table");
let tableHeader = document.querySelector("#table-header");
let originaltBody = document.querySelector(".original-table");
let searchtBody = document.querySelector(".search-table");
let searchInput = document.querySelector(".search-bar");
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
  // tableRow.insertAdjacentHTML("beforeend", html);
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
      // valueArray.forEach((item) => {
      //   if (item.toLowerCase().includes(e.target.value.toLowerCase())) {
      //     newData.push(csvArray[i]);
      //     return;
      //   }
      // });
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
  // console.log(newData);
  console.log(sortData);
});
// function renderTable(htmlElement) {
// tableRow;
// }
// console.log(JSON.parse(JSON.stringify(jsonData)));
// displaySearchTable(csvArray);
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
  // console.log(data[0][key]);
  // console.log(Number.isNaN(Number(data[0][key])));
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
  // if (!isNaN(Date.parse(data[0][key]))) {
  //   console.log("date sorted");
  // }
}

// sortTableData(csvArray);
