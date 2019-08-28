// @flow

module.exports = function getcolor(program: string): string {
    'use strict';

    //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
    if (program === "Broadband" || program === "Capacity" || program === "Energy") {
        return "green";
    }
    if (program === "Sewer" || program === "Water" || program === "Drainage") {
        return "blue";
    }
    if (program === "Health and Human Services" || program === "Housing" || program === "Planning/Community Development") {
        return "red";
    }
    if (program === "Parks and Recreation" || program === "Public Facilities" || program === "Public Safety" || program === "Road/Street") {
        return "purple";
    }
    if (program === "Economic Development") {
        return "black";
    }
    return "black";

}