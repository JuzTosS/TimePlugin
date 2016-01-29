
updateTimeTable();

function updateTimeTable() {
    $('table').find('tr').each(function(){
        $(this).find('th').eq(2).after('<th>Exit (Estimate)</th>');
    });
    $('table').find('tr').each(function(){
        $(this).find('td').eq(2).after('<td></td>');
    });

    var elementsStartDay = $('table tr > td:nth-child(2), table tr > th:nth-child(2)');
    var elementsEndDayEstimate = $('table tr > td:nth-child(4), table tr > th:nth-child(4)');

    for(var i = 0; i < elementsStartDay.length; i++)
    {
        var cellStart = elementsStartDay[i];
        var startTimeString = cellStart.innerHTML;
        var endTime = Date.today();
        endTime.setHours(parseInt(startTimeString.substr(0,3)));
        endTime.setMinutes(parseInt(startTimeString.substr(4,5)));
        endTime.add({hours:8, minutes: 30});

        var cellEnd = elementsEndDayEstimate[i];
        cellEnd.style.background = cellStart.style.background;
        if(!isNaN(endTime) && startTimeString != null && startTimeString != "") {

            cellEnd.innerHTML = endTime.toString("HH:mm");

        }
    }
}
