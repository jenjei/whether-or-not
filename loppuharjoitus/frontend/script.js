var d = new Date();
document.getElementById("date").innerHTML = d.toLocaleDateString();

var arrayOfTheWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var weekdayNumber = d.getDay();
var weekdayName = arrayOfTheWeekdays[weekdayNumber];

document.getElementById("weekday").innerHTML = weekdayName;
