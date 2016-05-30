// @flow

var lgidset: Array < Object > = [];

module.exports = function(d: Object): Object {

    'use strict';

    //sort by lgid, program, by date
    //integer value for lgid plus hundredths for program plus thousands for date
    //sorted by lgid so no overlaps between chip stacks
    //TODO edge case remove alphachars from csbg
    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG", "DR"];



    var basedate: Date = new Date(2000, 0, 1);

    if (lgidset.indexOf(d.lgid) === -1) {
        lgidset.push(d.lgid);
    }
    var lgid_index: number = lgidset.indexOf(d.lgid);


    //each index in multiples of 10,000,000
    var start: number = 100000000 * lgid_index;

    var program: Object = d.program;

    if (program === "DR") {
        start = start + 100000;
    }
    if (program === "FML") {
        start = start + 1200000;
    }
    if (program === "CTF") {
        start = start + 1100000;
    }
    if (program === "SEV_DIST") {
        start = start + 1000000;
    }
    if (program === "CSBG") {
        start = start + 600000;
    }
    if (program === "CDBG") {
        start = start + 500000;
    }
    if (program === "EIAF") {
        start = start + 200000;
    }
    if (program === "GAME") {
        start = start + 300000;
    }
    if (program === "REDI") {
        start = start + 400000;
    }
    if (program === "VFP") {
        start = start + 800000;
    }
    if (program === "SAR") {
        start = start + 700000;
    }
    if (program === "FFB") {
        start = start + 900000;
    }

    //return difference from year Jan 1, 2000 in number of days
    function daydiff(second: Date): number {
        var diff = ((second - basedate) / (1000 * 60 * 60 * 24));
        return diff;

    }

    //entropy - so that 2 awards on the same date are not in the same place??
    const entropy: number = Math.random();

    start = start + daydiff(d.dateofaward) + entropy;
    d.id = start;


    return d;
}