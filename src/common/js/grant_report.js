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
        fml: 0,
        sev_dist: 0,
        vfp: 0,
        ctf: 0,
        sar: 0,
        ffb: 0,
        eiaf: 0,
        mj: 0,
        game: 0,
        redi: 0,
        csbg: 0,
        cdbg: 0,
        dr: 0
    };

    //iterate over results array to get totals for each program
    tbl_results.forEach(d => {
        let program = d.program;
        let dollars = d.award;
        if (program === "FML") {
            program_totals.fml += dollars;
        }
        if (program === "SEV_DIST") {
            program_totals.sev_dist += dollars;
        }
        if (program === "VFP") {
            program_totals.vfp += dollars;
        }
        if (program === "CTF") {
            program_totals.ctf += dollars;
        }
        if (program === "SAR" || program === "SAR Tier 1" || program === "SAR Tier 3" || program === "SAR EoY") {
            program_totals.sar += dollars;
        }
        if (program === "FFB") {
            program_totals.ffb += dollars;
        }
        if (program === "EIAF") {
            program_totals.eiaf += dollars;
        }
        if (program === "MJ") {
            program_totals.mj += dollars;
        }
        if (program === "GAME") {
            program_totals.game += dollars;
        }
        if (program === "REDI") {
            program_totals.redi += dollars;
        }
        if (program === "CSBG") {
            program_totals.csbg += dollars;
        }
        if (program === "CDBG") {
            program_totals.cdbg += dollars;
        }
        if (program === "DR") {
            program_totals.dr += dollars;
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
        content: "<h2 style='margin-bottom: -10px; margin-left: -5px;'>Grant Report for: " + d.govname + "</h2><br /><i>From: " + (daterange.mindate).toString().slice(0, 15) + " to " + (daterange.maxdate).toString().slice(0, 15) + "</i><br /><br /><table id='resultstable'><tr><th align='left'>Description</th><th>Program</th><th>Date</th><th align='right'>Total Award</th></tr>" + content_tbl + "</table><br /><h4>Total:  " + accounting.formatMoney(award_ttl) + "</h4><br /><span style='color: grey;'>" +
            ((program_totals.fml > 0) ? ("<b>FML</b>: <i> " + accounting.formatMoney(program_totals.fml) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.sev_dist > 0) ? ("<b>SEV_DIST</b>: <i> " + accounting.formatMoney(program_totals.sev_dist) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.vfp > 0) ? ("<b>VFP</b>: <i> " + accounting.formatMoney(program_totals.vfp) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ctf > 0) ? ("<b>CTF</b>: <i> " + accounting.formatMoney(program_totals.ctf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.sar > 0) ? ("<b>SAR</b>: <i> " + accounting.formatMoney(program_totals.sar) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.ffb > 0) ? ("<b>FFB</b>: <i> " + accounting.formatMoney(program_totals.ffb) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.eiaf > 0) ? ("<b>EIAF</b>: <i> " + accounting.formatMoney(program_totals.eiaf) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.game > 0) ? ("<b>GAME</b>: <i> " + accounting.formatMoney(program_totals.game) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.redi > 0) ? ("<b>REDI</b>: <i> " + accounting.formatMoney(program_totals.redi) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.mj > 0) ? ("<b>MJ</b>: <i> " + accounting.formatMoney(program_totals.mj) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.csbg > 0) ? ("<b>CSBG</b>: <i> " + accounting.formatMoney(program_totals.csbg) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.cdbg > 0) ? ("<b>CDBG</b>: <i> " + accounting.formatMoney(program_totals.cdbg) + "</i>&nbsp;&nbsp;&nbsp;&nbsp;") : "") +
            ((program_totals.dr > 0) ? ("<b>DR</b>: <i> " + accounting.formatMoney(program_totals.dr) + "</i>") : "") +
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
        saveAs(blob, "grant_report_" + outputname + ".csv");

    }


}