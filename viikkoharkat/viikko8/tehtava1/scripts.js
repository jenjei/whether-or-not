tablebody.textcontent = "";

const numberDataArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10
];

for (let i = 1; i < 10; i++) {

  const row = document.createElement("tr");

  for (numberData of numberDataArray) {
    const cell = document.createElement("th");
    const cellText = document.createTextNode(numberData + 1);
    cell.appendChild(cellText);
    cell.appendChild(cell);
  }
  tablebody.appendChild(row);
}
