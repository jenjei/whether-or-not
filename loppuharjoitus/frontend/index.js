/* Homepage */

// Print date
var d = new Date();
document.getElementById("date").innerHTML = d.toLocaleDateString();

// Print weekday
var arrayOfTheWeekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var weekdayNumber = d.getDay();
var weekdayName = arrayOfTheWeekdays[weekdayNumber];

document.getElementById("weekday").innerHTML = weekdayName;

// Print temperature

const temperatureText = document.getElementById("temperature");

const myAsyncFunction = async () => {
  const response = await fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/1");
  console.log("Response:", response);
  const data = await response.json();
  console.log("Data:", data);

  data.forEach((rowData, index) => {
    console.log("inside foreach", index);

    const cellDataArray = [
      rowData.temperature, // value
    ];
    console.log("cellDataArray", cellDataArray);
    document.getElementById("temperature").innerHTML = cellDataArray + "C°";
  });
};
myAsyncFunction();