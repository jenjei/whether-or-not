

const dropdownForm = document.getElementById("dropdownform");
const dropdownButton = document.getElementById("dropdownbutton");
let selectedValue = "";
const baseUrl = 'https://corona-api.com/countries/';
const url = baseUrl + selectedValue;
const textTotal = document.getElementById("text");
const tableBody = document.getElementById("tablebody");

dropdownButton.addEventListener("click", () => {
    console.log("click");
    selectedValue = dropdownForm.countrydropdown.value;
    console.log("Selected value", selectedValue);

    textTotal.textContent = "Nykyinen näytetty data: " + selectedValue;
    fetchData();
});

async function fetchData() {
  console.log("Entering async function");
  
  console.log('Fetching data from URL: ' + url);

  var response = await fetch(url);
  console.log("Response:", response);

  const data = await response.json();
  console.log("Data:", data);

  // Generate html rows for table

  tableBody.textContent = "";
};
