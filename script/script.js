/* NOTE: This file depends on dateInfo.js and uses variables from that!
*/

//Global Variables
let startDate; //first day of the user's desired schedule (inclusive)
let endDate; //last day of the user's desired schedule (inclusive)
let dayInfo; //object which holds all of the information for all of the days in the school year



//Functions

function getDates() {
	//get and interpret the string gotten from the inputs as correct dates (subtract one from the month because Date expects the month to be zero-indexed and the input is not gotten that way)
	startDate = new Date(parseISOString(document.getElementById('startDate').value));
	endDate = new Date(parseISOString(document.getElementById('endDate').value));

	console.log(`Start Date: ${startDate}; End Date: ${endDate}`);
}

function generateSchedule() {
	getDates();

	let scheduleDiv = document.getElementById('schedule');
	scheduleDiv.innerHTML = "";


	let table = document.createElement('table');
	for (let currentDate = startDate; currentDate <= endDate; currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)) {
		let tr = document.createElement('tr');
		let dateString = document.createElement('td');
		dateString.innerHTML = getTruncatedISOString(currentDate);
		let dayString = document.createElement('td');
		dayString.innerHTML = dayToString[currentDate.getDay()];
		let scheduleDayString = document.createElement('td');
		scheduleDayString.innerHTML = isSchoolDay(currentDate) ? dayInfo[getTruncatedISOString(currentDate)] : ' ';

		tr.appendChild(dateString);
		tr.appendChild(dayString);
		tr.appendChild(scheduleDayString);
		scheduleDiv.appendChild(tr);
	}
}

function buildDayInfo(start, stop) {
	let scheduleDay = 1;
	dayInfo = {};
	for (let currentDate = start; currentDate <= stop; currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)) {
		let dateString = getTruncatedISOString(currentDate);
		if (isSchoolDay(currentDate)) {
			dayInfo[dateString] = scheduleDay;
			scheduleDay = scheduleDay % 6 + 1;
		} 
	}
	return dayInfo;
}

function hideAllButMe(id) {
	return function() {
		let topLevelDivs = Array.from(document.querySelectorAll('body > div'));
		console.log(`topLevelDivs: ${topLevelDivs}`);
		for (let div of topLevelDivs) {
			console.log(`div: ${div}`);
			div.style.display = 'none';
		}
		document.getElementById(id).style.display = 'block';
	}
}


window.onload = () => {
	// build the dayInfo object
	dayInfo = buildDayInfo(yearStartDate, yearEndDate);

	//make it so that the various buttons change the visibility of the correct div
	document.getElementById('fullYearSchedule').addEventListener('click', hideAllButMe('fys')); 
	document.getElementById('classSchedules').addEventListener('click', hideAllButMe('cs')); 
	document.getElementById('daySchedule').addEventListener('click', hideAllButMe('ds')); 
	document.getElementById('generateGoogleMeets').addEventListener('click', hideAllButMe('ggm')); 

	document.getElementById('datesButton').addEventListener('click', generateSchedule);
}
