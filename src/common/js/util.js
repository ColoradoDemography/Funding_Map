

module.exports.formatMoney = function(cc: any, dd: any, tt: any) {
    'use strict';

    var n = this,
        c = isNaN(cc = Math.abs(cc)) ? 2 : cc,
        d = dd == undefined ? "." : dd,
        t = tt == undefined ? "," : tt,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};


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

    console.log('unexpected fall through on monthNumStr');
    return 99;
};