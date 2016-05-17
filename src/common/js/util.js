
module.exports.formatMoney = function(cc, dd, tt) {
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


module.exports.sortNumeric = function(a, b) {
    'use strict';
  
    if (a.id < b.id) {
        return 1;
    } else {
        return -1;
    }
};