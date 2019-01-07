// @flow

module.exports = function getcolor(program: string): string {
    'use strict';

    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
    if (program === "FML" || program === "CTF" || program === "SEV_DIST") {
        return "green";
    }
    if (program === "CSBG" || program === "CDBG") {
        return "blue";
    }
    if (program === "EIAF" || program === "GAME" || program === "REDI" || program === "MJ") {
        return "red";
    }
    if (program === "VFP" || program === "SAR" || program === "FFB" || program === "SAR Tier 1" || program === "SAR Tier 3" || program === "SAR EoY") {
        return "purple";
    }
    if (program === "DR") {
        return "grey";
    }
    return "black";

}