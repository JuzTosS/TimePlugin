
updateTimeTable();

function updateTimeTable() {
    var elementsStartDay = $('table tr > td:nth-child(2), table tr > th:nth-child(2)');
    var elementsEndDay = $('table tr > td:nth-child(3), table tr > th:nth-child(3)');

    for(var i = 0; i < elementsStartDay.length; i++)
    {
        var cellStart = elementsStartDay[i];
        var startTimeString = cellStart.innerHTML;
        var endTime = Date.today();
        endTime.setHours(parseInt(startTimeString.substr(0,3)));
        endTime.setMinutes(parseInt(startTimeString.substr(4,5)));
        endTime.add({hours:8, minutes: 30});

        if(!isNaN(endTime) && startTimeString != null && startTimeString != "") {
            var cellEnd = elementsEndDay[i];
            cellEnd.innerHTML += "(" + endTime.toString("HH:mm") + ")";
        }
    }
}
