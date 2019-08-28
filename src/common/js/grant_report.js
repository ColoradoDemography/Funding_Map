// @flow

var accounting = require("accounting");
var saveAs = require("../../lib/js/FileSaver.min.js").saveAs;

module.exports = function(d: Object, map: Object, cities: Array < Object > , daterange: Object) {


    var tbl_results: Array < Object > = [];
    var len = cities.length;
    for (let i = 0; i < len; i++) {
        if (cities[i].lgid === d.lgid) {
            tbl_results.push(cities[i]);
        }
    }

    var program_totals: Object = {
        bb: 0,
        cap: 0,
        dr: 0,
        ed: 0,
        en: 0,
        hhs: 0,
        hous: 0,
        pr: 0,
        pcd: 0,
        pf: 0,
        ps: 0,
        road: 0,
        sew: 0,
        wat: 0
    };

    //iterate over results array to get totals for each program
    tbl_results.forEach(d => {
        let program = d.program;
        let dollars = d.award;
        if (program === "Broadband") {
            program_totals.bb += dollars;
        }
        if (program === "Capacity") {
            program_totals.cap += dollars;
        }
        if (program === "Drainage") {
            program_totals.dr += dollars;
        }
        if (program === "Economic Development") {
            program_totals.ed += dollars;
        }
        if (program === "Energy") {
            program_totals.en += dollars;
        }
        if (program === "Health and Human Services") {
            program_totals.hhs += dollars;
        }
        if (program === "Housing") {
            program_totals.hous += dollars;
        }
        if (program === "Parks and Recreation") {
            program_totals.pr += dollars;
        }
        if (program === "Planning/Community Development") {
            program_totals.pcd += dollars;
        }
        if (program === "Public Facilities") {
            program_totals.pf += dollars;
        }
        if (program === "Public Safety") {
            program_totals.ps += dollars;
        }
        if (program === "Road/Street") {
            program_totals.road += dollars;
        }
        if (program === "Sewer") {
            program_totals.sew += dollars;
        }
        if (program === "Water") {
            program_totals.wat += dollars;
        }
    });

    function compare(a: Object, b: Object) {
        if (a.dateofaward < b.dateofaward) {
            return -1;
        } else if (a.dateofaward > b.dateofaward) {
            return 1;
        } else {
            return 0;
        }
    }

    tbl_results.sort(compare);


    var content_tbl: string = "";
    var award_ttl: number = 0;

    var j: number = tbl_results.length;

    for (var i = 0; i < j; i++) {
        award_ttl = award_ttl + tbl_results[i].award;
        content_tbl = content_tbl + "<tr><td>" + (tbl_results[i].projname).slice(0, 60) + "</td><td>" + tbl_results[i].program + "</td><td>" + (tbl_results[i].dateofaward).toString().slice(4, 15) + "</td><td align='right'>" + accounting.formatMoney(tbl_results[i].award) + "</td></tr>";
    }


    map.openModal({
        content: "<h2 style='margin-bottom: -10px; margin-left: -5px;'>Grant Report for: " + d.govname + "</h2><br /><i>From: " + (daterange.mindate).toString().slice(0, 15) + " to " + (daterange.maxdate).toString().slice(0, 15) + "</i><br /><br /><div style='overflow:auto;'><table id='resultstable'><tr><th align='left'>Description</th><th>Program</th><th>Date</th><th align='right'>Total Award</th></tr>" + content_tbl + "</table></div><br /><h4>Total:  " + accounting.formatMoney(award_ttl) + "</h4><br /><span style='color: grey;'>" +
            ((program_totals.bb > 0) ? ("<b>Broadband</b>: <i> " + accounting.formatMoney(program_totals.bb) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.cap > 0) ? ("<b>Capacity</b>: <i> " + accounting.formatMoney(program_totals.cap) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.dr > 0) ? ("<b>Drainage</b>: <i> " + accounting.formatMoney(program_totals.dr) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ed > 0) ? ("<b>Economic Development</b>: <i> " + accounting.formatMoney(program_totals.ed) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.en > 0) ? ("<b>Energy</b>: <i> " + accounting.formatMoney(program_totals.en) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.hhs > 0) ? ("<b>Health and Human Services</b>: <i> " + accounting.formatMoney(program_totals.hhs) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.hous > 0) ? ("<b>Housing</b>: <i> " + accounting.formatMoney(program_totals.hous) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.pr > 0) ? ("<b>Parks and Recreation</b>: <i> " + accounting.formatMoney(program_totals.pr) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.pcd > 0) ? ("<b>Planning/Community Development</b>: <i> " + accounting.formatMoney(program_totals.pcd) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.pf > 0) ? ("<b>Public Facilities</b>: <i> " + accounting.formatMoney(program_totals.pf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ps > 0) ? ("<b>Public Safety</b>: <i> " + accounting.formatMoney(program_totals.ps) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.road > 0) ? ("<b>Road/Street</b>: <i> " + accounting.formatMoney(program_totals.road) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.sew > 0) ? ("<b>Sewer</b>: <i> " + accounting.formatMoney(program_totals.sew) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.wat > 0) ? ("<b>Water</b>: <i> " + accounting.formatMoney(program_totals.wat) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            "</span><br /><button style='margin-top: 20px;' id='dlcsv'>Download</button>"
    });


    var dlcsv = document.getElementById('dlcsv');

    dlcsv.onclick = function() {

        var csvstring: string = "";
        var i: number = 0;

        var oTable: any = document.getElementById('resultstable');
        var rowLength = oTable.rows.length;
        for (i = 0; i < rowLength; i++) {
            var oCells = oTable.rows.item(i).cells;
            var cellLength = oCells.length;
            for (var j = 0; j < cellLength; j++) {
                /* get your cell info here */
                if (j === 0 && i > 0) {
                    csvstring = csvstring + "\n";
                }
                csvstring = csvstring + '"' + oCells.item(j).innerHTML + '"';
                if (j < cellLength) {
                    csvstring = csvstring + ",";
                }
            }
        }

        var outputname: string = (d.govname).replace(/[^\w]/gi, '');

        var blob: Blob = new Blob([csvstring], {
            type: "text/csv;charset=utf-8"
        });
        saveAs(blob, "funding_report_" + outputname + ".csv");

    }


}