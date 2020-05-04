//Global Variables
let startDate; //first day of the user's desired schedule (inclusive)
let endDate; //last day of the user's desired schedule (inclusive)



//Functions
function getDates() {
	startDate = document.getElementById("startDate").value;
	endDate = document.getElementById("endDate").value;

	console.log(`Start Date: ${startDate}; End Date: ${endDate}`);
}


window.onload = () => {
	document.getElementById('datesButton').addEventListener('click', getDates);
}
