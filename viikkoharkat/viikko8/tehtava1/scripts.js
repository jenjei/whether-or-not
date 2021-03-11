
const tableBody = document.getElementById("tablebody");

var rows = 8;

for (var r=1; r<rows; r++) {
  console.log("inside foreach", r);

  const row = document.createElement("tr");

  const cellDataArray = [
    r + 1,
    r + 2,
    r + 3,
    r + 4,
    r + 5,
    r + 6,
    r + 7,
    r + 8,
  ];
  console.log("cellDataArray", cellDataArray);

  for (const cellData of cellDataArray) {
    const cell = document.createElement("td");
    const cellText = document.createTextNode(cellData);

    cell.appendChild(cellText);
    row.appendChild(cell);
  }

  tableBody.appendChild(row);
}


