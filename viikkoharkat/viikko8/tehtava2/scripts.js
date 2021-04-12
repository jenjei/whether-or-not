

const dropdownForm = document.getElementById("dropdownform");
const dropdownButton = document.getElementById("dropdownbutton");
const baseUrl = 'https://corona-api.com/countries/';
let url = "";
const textTotal = document.getElementById("text");
const totalConfirmedSpan = document.getElementById("totalconfirmed");
const totalRecoveredSpan = document.getElementById("totalrecovered");
const totalDeathSpan = document.getElementById("totaldeaths");


dropdownButton.addEventListener("click", () => {
    console.log("click");
    const selectedValue = dropdownForm.countrydropdown.value;
    let viewedValue;

    if (selectedValue ==="fi") {
      viewedValue = "Suomi";
    } else if (selectedValue === "se") {
      viewedValue = "Ruotsi";
    } else if (selectedValue === "no") {
      viewedValue = "Norja";
    } else if (selectedValue === "dk") {
      viewedValue = "Tanska";
    } else if (selectedValue === "is") {
      viewedValue = "Islanti";
    }

    console.log("Selected value", selectedValue);

    url = "https://corona-api.com/countries/" + selectedValue;
    textTotal.textContent = "Nykyinen näytetty data: " + viewedValue;
    myAsyncFunction();
});

const tableBody = document.getElementById("tablebody");


const myAsyncFunction = async () => {
  console.log("Entering async function");

  const response = await fetch(url);
  console.log("Response:", response);

  const datat = await response.json();

  console.log("Data:", datat);

  // Generate html rows for table

  tableBody.textContent = "";

  datat.data.timeline.forEach((rowData, index) => { // LOOP

    console.log("inside foreach", index);

    // If index is less than 30, print data
    if (index < 30) {
      const row = document.createElement("tr");

      const cellDataArray = [
        index + 1,
        rowData.date,
        rowData.new_confirmed,
        rowData.new_recovered,
        rowData.new_deaths,
      ];
  
      for (const cellData of cellDataArray) { // LOOP IN THE LOOP!!
        const cell = document.createElement("td");
        const cellText = document.createTextNode(cellData);

        cell.appendChild(cellText);

        row.appendChild(cell);
      }

      tableBody.appendChild(row);
    }
    totalConfirmedSpan.textContent = datat.data.latest_data.confirmed;
    totalRecoveredSpan.textContent = datat.data.latest_data.recovered;
    totalDeathSpan.textContent = datat.data.latest_data.deaths;
  });
};

