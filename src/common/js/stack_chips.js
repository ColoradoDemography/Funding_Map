module.exports = function(data) {
    'use strict';

    var basedate = new Date("2000,1,1");
    var stackchips = [];

    var cities = data.map(function(d) {
        var tv = d.lgid;
        if (stackchips.hasOwnProperty(tv)) {
            stackchips[tv]++;
        } else {
            stackchips[tv] = 0;
        }
        var rlat = (parseFloat(d.latitude) + (0.002 * stackchips[tv]));
        var rlng = d.longitude;
        d.latLng = [rlat, rlng];
        d.id = valueize(d, basedate) + (0.000001 * stackchips[tv]);

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

    var start = parseFloat(d.lgid);

    if (d.program === "FML") {
        start = start + 0.18;
    }
    if (d.program === "CTF") {
        start = start + 0.19;
    }
    if (d.program === "SEV_DIST") {
        start = start + 0.17;
    }
    if (d.program === "CSBG") {
        start = start + 0.13;
    }
    if (d.program === "CDBG") {
        start = start + 0.12;
    }
    if (d.program === "EIAF") {
        start = start + 0.09;
    }
    if (d.program === "GAME") {
        start = start + 0.10;
    }
    if (d.program === "REDI") {
        start = start + 0.11;
    }
    if (d.program === "VFP") {
        start = start + 0.15;
    }
    if (d.program === "SAR") {
        start = start + 0.14;
    }
    if (d.program === "FFB") {
        start = start + 0.16;
    }

    function daydiff(second) {
        return Math.round((second - basedate) / (1000 * 60 * 60 * 24));
    }

    start = start + ((daydiff(new Date(d.dateofaward))) / 10000000);

    return start;
}