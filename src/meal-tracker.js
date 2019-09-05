// PURPOSE: partitions the list of dates and meals into clearly defined weeks

// mealtable is the table that displays the meals...including the title
var mealtable = document.getElementsByClassName("bodytext")[0];
var tablebody = mealtable.getElementsByTagName("tbody")[0];

// each row of the table
// every row contains <date + time> <Swipe-Count> <Useless Special Character> <Location>
var rowsHTMLCollection = tablebody.getElementsByTagName("tr");

var rows = Array.prototype.slice.call(rowsHTMLCollection);

var this_week_count = 0;
var week_already_counted = false;

// actual useful data starts on the second row, counting from row 0
for(var i = 2; i < rows.length - 1; i++) {
    var dateString = rows[i].getElementsByTagName("td")[0].innerText.split(" ")[0];
    var date = new Date(dateString);

    var dateStringPrevious = rows[i + 1].getElementsByTagName("td")[0].innerText.split(" ")[0];
    var datePrevious = new Date(dateStringPrevious);

    var difference_in_time = date.getTime()  - datePrevious.getTime();
    var difference_in_days = difference_in_time / (1000 * 3600 * 24);

    // highlights only entries made this week
    if(!week_already_counted) {
        this_week_count++;
        highlight(rows[i]);
    }

    // if in the same week
    if(difference_in_days < 7) {
        // Sunday indexed to 0, basically when the new week starts
        // if new week starts, difference between the two dates will be negative
        if(date.getDay() - datePrevious.getDay() < 0) {
            week_already_counted = true;
            
            // underline will denote all weeks while highlights will only work for current week
            underline(rows[i]);
        }
    }
    // if the next date swiped occurs past a week ago
    else {
        underline(rows[i]);
        week_already_counted = true;
    }
}

// alerts user about how many meal swipes used
alert(`You have used ${this_week_count} meal swipes this week`);



/**
 * Highlights the selected row
 * @param {HTMLCollection} row table row, containing <td>'s
 */
function highlight(row) {
    var tds = row.getElementsByTagName("td");

    for(var i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = "#FFFF00";
    }
}

/**
 * underlines the selected row
 * @param {HTMLCollection} row table row, containing <td>'s
 */
function underline(row) {
    var tds = row.getElementsByTagName("td");
    
    for(var i = 0; i < tds.length; i++) {
        tds[i].style.borderBottom = "3px groove black";
    }
}