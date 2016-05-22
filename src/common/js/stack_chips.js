module.exports = function(data) {

    'use strict';


    var basedate = new Date(2000, 0, 0);
    var stackchips = [];

    var cities = data.map(function(d) {
        var lgid = d.lgid;
        if (stackchips.hasOwnProperty(lgid)) {
            stackchips[lgid]++;
        } else {
            stackchips[lgid] = 0;
        }
        var rlat = (d.latitude + (0.002 * stackchips[lgid]));
        var rlng = d.longitude;
        d.latLng = [rlat, rlng];
        d.id = valueize(d, basedate) + (0.000001 * stackchips[lgid]);

        return d;
    });

    return cities;

};

/**
 * This function sorts chips.
 * @param {Object} d any chip
 * @returns {number} a numerical value indicating the sorting value of the chip.
 */
function valueize(d, basedate) {
    'use strict';

    //sort by lgid, program, by date
    //integer value for lgid plus hundredths for program plus thousands for date
    //sorted by lgid so no overlaps between chip stacks
    //TODO edge case remove alphachars from csbg
    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG", "DR"];

    var start = d.lgid;
    var program = d.program;

    if (program === "FML") {
        start = start + 0.18;
    }
    if (program === "CTF") {
        start = start + 0.19;
    }
    if (program === "SEV_DIST") {
        start = start + 0.17;
    }
    if (program === "CSBG") {
        start = start + 0.13;
    }
    if (program === "CDBG") {
        start = start + 0.12;
    }
    if (program === "EIAF") {
        start = start + 0.09;
    }
    if (program === "GAME") {
        start = start + 0.10;
    }
    if (program === "REDI") {
        start = start + 0.11;
    }
    if (program === "VFP") {
        start = start + 0.15;
    }
    if (program === "SAR") {
        start = start + 0.14;
    }
    if (program === "FFB") {
        start = start + 0.16;
    }

    function daydiff(second) {
        return Math.round((second - basedate) / (1000 * 60 * 60 * 24));
    }

    start = start + ((daydiff(d.dateofaward)) / 10000000);

    return start;
}