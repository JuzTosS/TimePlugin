updateTimeTable();

function updateTimeTable() {
    $('table').find('tr').each(function () {
        $(this).find('th').eq(2).after('<th>Exit (Estimate)</th>');
    });
    $('table').find('tr').each(function () {
        $(this).find('td').eq(2).after('<td></td>');
    });

    var elementsStartDay = $('table tr > td:nth-child(2), table tr > th:nth-child(2)');
    var elementsEndDayEstimate = $('table tr > td:nth-child(4), table tr > th:nth-child(4)');

    for (var i = 0; i < elementsStartDay.length; i++) {
        var cellStart = elementsStartDay[i];
        var startTimeString = cellStart.innerHTML;
        var endTime = Date.today();
        endTime.setHours(parseInt(startTimeString.substr(0, 3)));
        endTime.setMinutes(parseInt(startTimeString.substr(4, 5)));
        endTime.add({hours: 8, minutes: 30});

        var cellEnd = elementsEndDayEstimate[i];
        cellEnd.style.background = cellStart.style.background;
        if (!isNaN(endTime) && startTimeString != null && startTimeString != "") {

            cellEnd.innerHTML = endTime.toString("HH:mm");

        }
    }


    var elementsHoursWorked = $('table tr > td:nth-child(5), table tr > th:nth-child(5)');
    var totalHours = 0;
    var totalMinutes = 0;
    var totalWeekHours = 0;
    var totalWeekMinutes = 0;
    var daysInAWeek = 0;
    var totalDays = 0;

    function getInt(str) {
        var value = parseInt(str);
        if (isNaN(value))
            return 0;
        else
            return value;
    }

    function getFormattedTime(totalHours, totalMinutes, days) {
        if(days <=0)
            return "0:00";

        var totalFull = (totalHours + totalMinutes / 60) / days;
        var totalFullHours = Math.floor(totalFull);
        var totalMinutesRestDec = totalFull - totalFullHours;
        var totalMinutesRest = Math.floor(totalMinutesRestDec * 60);
        return totalFullHours.toString() + ":" + totalMinutesRest.toString();
    }

    for (var i = 0; i < elementsHoursWorked.length; i++) {
        var cellHoursWorked = elementsHoursWorked[i];
        var value = cellHoursWorked.innerHTML;
        if (value != null && value.length > 0) {
            if (value.includes('Total time for week')) {

                cellHoursWorked.innerHTML = cellHoursWorked.innerHTML +
                    ", average: " + getFormattedTime(totalWeekHours, totalWeekMinutes, daysInAWeek);

                totalWeekHours = 0;
                totalWeekMinutes = 0;
                daysInAWeek = 0;
            }
            else if (value.includes('Total time for month')) {
                cellHoursWorked.innerHTML = cellHoursWorked.innerHTML +
                    ", average: " + getFormattedTime(totalHours, totalMinutes, totalDays);
            }
            else//A day
            {
                var hours = getInt(value.substr(0, 3));
                var minutes = getInt(value.substr(5, 6));

                if(hours > 0 || minutes > 0) {

                    totalHours += hours;
                    totalMinutes += minutes;

                    totalWeekHours += hours;
                    totalWeekMinutes += minutes;

                    totalDays++;
                    daysInAWeek++;

                }
            }
        }

    }
}

