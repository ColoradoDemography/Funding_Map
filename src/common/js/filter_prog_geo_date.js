// @flow

module.exports = function filter_prog_geo_date(d: Object, flags: Object, daterange: Object): boolean {

    'use strict';



    var program = d.program;
    var dateofaward = d.dateofaward;
    var lgtype = d.lgtype;


    //filter program
    if (program === "Broadband" && flags.bb_flag === 0) {
        return false;
    }
    if (program === "Capacity" && flags.cap_flag === 0) {
        return false;
    }
    if (program === "Drainage" && flags.dr_flag === 0) {
        return false;
    }
    if (program === "Economic Development" && flags.ed_flag === 0) {
        return false;
    }
    if (program === "Energy" && flags.en_flag === 0) {
        return false;
    }
    if (program === "Health and Human Services" && flags.hhs_flag === 0) {
        return false;
    }
    if (program === "Housing" && flags.hous_flag === 0) {
        return false;
    }
    if (program === "Parks and Recreation" && flags.pr_flag === 0) {
        return false;
    }
    if (program === "Planning/Community Development" && flags.pcd_flag === 0) {
        return false;
    }
    if (program === "Public Facilities" && flags.pf_flag === 0) {
        return false;
    }
    if (program === "Public Safety" && flags.ps_flag === 0) {
        return false;
    }
    if (program === "Road/Street" && flags.road_flag === 0) {
        return false;
    }
    if (program === "Sewer" && flags.sew_flag === 0) {
        return false;
    }
    if (program === "water" && flags.wat_flag === 0) {
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