module.exports = function getcolor(program) {
    'use strict';
  
    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
    if (program === "FML" || program === "CTF" || program === "SEV_DIST") {
        return "green";
    }
    if (program === "CSBG" || program === "CDBG") {
        return "blue";
    }
    if (program === "EIAF" || program === "GAME" || program === "REDI") {
        return "red";
    }
    if (program === "VFP" || program === "SAR" || program === "FFB") {
        return "purple";
    }
    return "grey";

}