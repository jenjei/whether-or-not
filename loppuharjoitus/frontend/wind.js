const tableBody = document.getElementById("tablebody");

const myAsyncFunction = async () => {
  console.log("Entering async function");

  const response = await fetch(
    "http://webapi19sa-1.course.tamk.cloud/v1/weather/Windspeed"
  );
  console.log("Response:", response);

  const data = await response.json();
  console.log("Data:", data);

  // Generate html rows for table

  tableBody.textContent = "";

  data.forEach((rowData, index) => {
    console.log("inside foreach", index);

    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1, //#
      new Date(rowData.date_time).toLocaleDateString(), // date
      new Date(rowData.date_time).toLocaleTimeString(), // time
      rowData.Windspeed, // value
    ];
    console.log("cellDataArray", cellDataArray);

    for (const cellData of cellDataArray) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(cellData);

      cell.appendChild(cellText);

      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  });
};
myAsyncFunction();
