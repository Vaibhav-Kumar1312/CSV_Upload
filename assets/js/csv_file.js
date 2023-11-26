let initialTable = document.querySelector("#csv-data-table");
let originaltBody = document.querySelector(".original-table");
let searchtBody = document.querySelector(".search-table");
let searchInput = document.querySelector(".search-bar");
let data = initialTable.dataset.csv;
let csvArray = JSON.parse(data);

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
      // console.log(valueArray);
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
  displaySearchTable(newData);
  console.log(newData);
});
// function renderTable(htmlElement) {
// tableRow;
// }
// console.log(JSON.parse(JSON.stringify(jsonData)));
// displaySearchTable(csvArray);
