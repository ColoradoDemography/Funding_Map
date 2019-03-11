// @flow

module.exports = function filter_prog_geo_date(d: Object, flags: Object, daterange: Object): boolean {

    'use strict';



    var program = d.program;
    var dateofaward = d.dateofaward;
    var lgtype = d.lgtype;


    //filter program
    if (program === "FML" && flags.fml_flag === 0) {
        return false;
    }
    if (program === "SEV_DIST" && flags.sevedd_flag === 0) {
        return false;
    }
    if (program === "VFP" && flags.vfp_flag === 0) {
        return false;
    }
    if (program === "CTF" && flags.ctf_flag === 0) {
        return false;
    }
    if ((program === "SAR" || program === "SAR Tier 1" || program === "SAR Tier 2" || program === "SAR Tier 3" || program === "SAR EoY") && flags.sar_flag === 0) {
        return false;
    }
    if (program === "FFB" && flags.ffb_flag === 0) {
        return false;
    }
    if (program === "EIAF" && flags.eiaf_flag === 0) {
        return false;
    }
    if (program === "GAME" && flags.game_flag === 0) {
        return false;
    }
    if (program === "REDI" && flags.redi_flag === 0) {
        return false;
    }
    if ((program === "MJ" || program === "GBMJ") && flags.mj_flag === 0) {
        return false;
    }
    if (program === "CSBG" && flags.csbg_flag === 0) {
        return false;
    }
    if (program === "CHPG" && flags.chpg_flag === 0) {
        return false;
    }
    if ((program === "CDBG" || program === "CDBGED" || program === "CDBGPF") && flags.cdbg_flag === 0) {
        return false;
    }
    if (program === "DR" && flags.dr_flag === 0) {
        return false;
    }
    if (program === "DCFA" && flags.dcfa_flag === 0) {
        return false;
    }
    if (program === "MS" && flags.ms_flag === 0) {
        return false;
    }
    if (program === "POMH" && flags.pomh_flag === 0) {
        return false;
    }
    if (program === "CCPI" && flags.ccpi_flag === 0) {
        return false;
    }
    
    //filter geo
    if ((lgtype === 2 || lgtype === 3 || lgtype === 4 || lgtype === 5) && flags.city_flag === 0) {
        return false;
    }
    if ((lgtype === 1 || lgtype === 61 || lgtype === 70) && flags.county_flag === 0) {
        return false;
    }
    if ((lgtype !== 1 && lgtype !== 2 && lgtype !== 3 && lgtype !== 4 && lgtype !== 5 && lgtype !== 61 && lgtype !== 70 && lgtype !== 100) && flags.district_flag === 0) {
        return false;
    }
    if ((lgtype === 100) && flags.other_flag === 0) {
        return false;
    }


    //filter date
    if ((dateofaward < daterange.mindate) || (dateofaward > daterange.maxdate)) {
        return false;
    }

    return true;
};