/*
 *  Birthday countdown
 */

var monthSelector = document.querySelector('#select-month');
var daySelector = document.querySelector('#select-day');

var months = {
    "Select Month": 0,
    "January": 31,
    "February": 29,
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
}

function setUpBirthdayCounter() {
    var populateAtt = document.createAttribute('onchange');
    populateAtt.value = 'populateDaySelector();';
    monthSelector.setAttributeNode(populateAtt);

    populateMonthSelector();

    var calculateAtt = document.createAttribute('onchange');
    calculateAtt.value = 'displayDaysTillBirthday();';
    daySelector.setAttributeNode(calculateAtt);
}

function displayAnswer(text) {
    document.querySelector('#answer').textContent = text;
}

function populateMonthSelector() {
    displayAnswer('');

    for(var month in months) {
        var opt = document.createElement('option');
        opt.textContent = month;
        opt.value = months[month];
        monthSelector.appendChild(opt);       
    }
}

function populateDaySelector() {
    displayAnswer('');

    while (daySelector.firstChild) {
        daySelector.removeChild(daySelector.firstChild);
    }

    addOptionToDaySelector("Select Day", 0);
    var dayCount = monthSelector.options[monthSelector.selectedIndex].value;
    for(day = 1; day <= dayCount; day++)
    {
        addOptionToDaySelector(day, day);        
    }
}

function addOptionToDaySelector(text, val) {
    var opt = document.createElement('option');
    opt.textContent = text;
    opt.value = val;
    daySelector.appendChild(opt);
}

function displayDaysTillBirthday() {
    if (monthSelector.selectedIndex < 1 || daySelector.selectedIndex < 1)
    {
        return;
    }

    var birthMonth = monthSelector.selectedIndex - 1;
    var birthDate = daySelector.options[daySelector.selectedIndex].value;
    var daysLeft = Math.round(calculateDaysTillBirthday(birthMonth, birthDate)*10)/10;

    var answer = ' days left.';
    if (daysLeft == 0.0)
    {
        answer = '*** Happy Birthday! ***';
    }
    else if (daysLeft < 1)
    {
        answer = 'Eep! Less than one day left!';
    }
    else
    {
        answer = 'Hold tight! Still ' + daysLeft + answer;
    }

    displayAnswer(answer);
}

function calculateDaysTillBirthday(birthMonth, birthDate) {
    var today = new Date();
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth();
    var currentDate = today.getDate();

    if (birthMonth == currentMonth && birthDate == currentDate)
    {
        return 0.0;
    }

    var yearToUse = currentYear;
    if (birthMonth < currentMonth || (birthMonth == currentMonth && birthDate < currentDate))
    {
        yearToUse += 1;
    }
    var nextBirthday = new Date(yearToUse, birthMonth, birthDate, 0, 0, 0);
    var daysLeft = calculateDateDiff(today, nextBirthday);
    
    return daysLeft;
}

function calculateDateDiff( date1, date2 ) {
    // Source: https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
    var one_day=1000*60*60*24;
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    var difference_ms = date2_ms - date1_ms;
    return difference_ms/one_day; 
}

window.onload= setUpBirthdayCounter();
