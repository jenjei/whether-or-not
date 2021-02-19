const dropdownForm = document.getElementById("dropdownform");
const dropdownButton = document.getElementById("dropdownbutton");

const shorterText = document.getElementById("text");

dropdownButton.addEventListener("click", () => {
    console.log("click");
    const selectedValue = dropdownForm.numberdropdown.value;

    const selectedValueAsNumber = Number(selectedValue);

    shorterText.textContent = document.getElementById("textarea").value.slice(0,-selectedValueAsNumber);
});