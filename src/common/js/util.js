module.exports.sortNumeric = function(a: Object, b: Object): number {
    'use strict';

    if (a.id < b.id) {
        return 1;
    } else {
        return -1;
    }
};




module.exports.monthNumStr = function(monthText: string): number {
    'use strict';

    if (monthText === "JAN") {
        return 0;
    }
    if (monthText === "FEB") {
        return 1;
    }
    if (monthText === "MAR") {
        return 2;
    }
    if (monthText === "APR") {
        return 3;
    }
    if (monthText === "MAY") {
        return 4;
    }
    if (monthText === "JUN") {
        return 5;
    }
    if (monthText === "JUL") {
        return 6;
    }
    if (monthText === "AUG") {
        return 7;
    }
    if (monthText === "SEP") {
        return 8;
    }
    if (monthText === "OCT") {
        return 9;
    }
    if (monthText === "NOV") {
        return 10;
    }
    if (monthText === "DEC") {
        return 11;
    }
    console.log(monthText);
    console.log('unexpected fall through on monthNumStr');
    return 99;
};