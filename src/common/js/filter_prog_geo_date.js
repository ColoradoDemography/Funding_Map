module.exports = function filter_prog_geo_date(d, flags, daterange) {
 'use strict';
  
  
    //filter program
    if (d.program === "FML" && flags.fmldd_flag === 0) {
        return false;
    }
    if (d.program === "SEV_DIST" && flags.sevedd_flag === 0) {
        return false;
    }
    if (d.program === "VFP" && flags.vfp_flag === 0) {
        return false;
    }
    if (d.program === "CTF" && flags.ctf_flag === 0) {
        return false;
    }

    if (d.program === "SAR" && flags.sar_flag === 0) {
        return false;
    }
    if (d.program === "FFB" && flags.ffb_flag === 0) {
        return false;
    }
    if (d.program === "EIAF" && flags.eiaf_flag === 0) {
        return false;
    }
    if (d.program === "GAME" && flags.game_flag === 0) {
        return false;
    }

    if (d.program === "REDI" && flags.redi_flag === 0) {
        return false;
    }
    if (d.program === "CSBG" && flags.csbg_flag === 0) {
        return false;
    }
    if (d.program === "CDBG" && flags.cdbg_flag === 0) {
        return false;
    }
    if (d.program === "FMLDDSB106" && flags.fmlddsb106_flag === 0) {
        return false;
    }

    //filter geo
    if ((d.lgtype === "2" || d.lgtype === "3" || d.lgtype === "4" || d.lgtype === "5") && flags.city_flag === 0) {
        return false;
    }
    if ((d.lgtype === "1" || d.lgtype === "61" || d.lgtype === "70") && flags.county_flag === 0) {
        return false;
    }
    if ((d.lgtype !== "1" && d.lgtype !== "2" && d.lgtype !== "3" && d.lgtype !== "4" && d.lgtype !== "5" && d.lgtype !== "61" && d.lgtype !== "70" && d.lgtype !== "100") && flags.district_flag === 0) {
        return false;
    }
    if ((d.lgtype === "100") && flags.other_flag === 0) {
        return false;
    }

    //filter date
    if ((new Date(((d.dateofaward).split("-"))[0] + " " + ((d.dateofaward).split("-"))[1] + " 20" + ((d.dateofaward).split("-"))[2])) < daterange.mindate || (new Date(((d.dateofaward).split("-"))[0] + " " + ((d.dateofaward).split("-"))[1] + " 20" + ((d.dateofaward).split("-"))[2])) > daterange.maxdate) {
        return false;
    }

    return true;
};