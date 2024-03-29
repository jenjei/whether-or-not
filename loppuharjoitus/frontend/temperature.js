const tableBody = document.getElementById("tablebody");
const canvasElement = document.getElementById("temperatureChart");
var canvas = document.getElementById("myCanvas");
let url = "";
const timedropdown = document.getElementById("timedropdown");
const dropdownbutton = document.getElementById("choosebutton");

// Generating chart

const myChart = new Chart(canvasElement, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Temperature",
        data: [0, 0],
        backgroundColor: "orange",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  },
  options: {
    legend: {
      labels: {
        fontColor: "black",
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "black",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "black",
          },
          type: "time",
          time: {
            tooltipFormat: "d.L.Y HH:MM:SS",
          },
        },
      ],
    },
  },
});

let datapoints = [];

const myAsyncFunction = async () => {
  console.log("Entering async function");

  // fetch data from api:

  const choosedTime = timedropdown.value;
  url = "http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/" + choosedTime;
  const response = await fetch(url);
  console.log("Response:", response);
  const data = await response.json();
  console.log("Data:", data);

  // Generate html rows for table:

  tableBody.textContent = "";

  data.forEach((rowData, index) => {
    console.log("inside foreach", index);

    const row = document.createElement("tr");

    const cellDataArray = [
      index + 1, // #
      new Date(rowData.date_time).toLocaleDateString(), // date
      new Date(rowData.date_time).toLocaleTimeString(), // time
      rowData.temperature, // value
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
  // updating chart:
  myChart.data.labels = data.map((values) => values.date_time);
  myChart.data.datasets[0].data = data.map((values) => values.temperature);
  myChart.data.datasets[0].label = "Temperature, C°";
  myChart.update();
};
myAsyncFunction();

// When dropdown-button is clicked:
dropdownbutton.addEventListener("click", () => {
  console.log("click");
  myAsyncFunction();
});