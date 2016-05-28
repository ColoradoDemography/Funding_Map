var formatMoney = require("./util").formatMoney;
var saveAs = require("../../lib/js/FileSaver.min.js").saveAs;

module.exports = function(d, map, cities, daterange){
  
  
                var tbl_results = [];
                var len = cities.length;
                for (let i = 0; i < len; i++) {
                    if (cities[i].lgid === d.lgid) {
                        tbl_results.push(cities[i]);
                    }
                }

                function compare(a, b) {
                    if (a.dateofaward < b.dateofaward) {
                        return -1;
                    } else if (a.dateofaward > b.dateofaward) {
                        return 1;
                    } else {
                        return 0;
                    }
                }

                tbl_results.sort(compare);


                var content_tbl = "";
                var award_ttl = 0;

                var j = tbl_results.length;

                for (var i = 0; i < j; i++) {
                    award_ttl = award_ttl + tbl_results[i].award;
                    content_tbl = content_tbl + "<tr><td>" + (tbl_results[i].projname).slice(0, 60) + "</td><td>" + tbl_results[i].program + "</td><td>" + (tbl_results[i].dateofaward).toString().slice(4, 15) + "</td><td align='right'>$" + formatMoney.call(tbl_results[i].award) + "</td></tr>";
                }




                map.openModal({
                    content: "<h2 style='margin-bottom: -10px; margin-left: -5px;'>Grant Report for: " + d.govname + "</h2><br /><i>From: " + (daterange.mindate).toString().slice(0, 15) + " to " + (daterange.maxdate).toString().slice(0, 15) + "</i><br /><br /><table id='resultstable'><tr><th align='left'>Description</th><th>Program</th><th>Date</th><th align='right'>Total Award</th></tr>" + content_tbl + "</table><br /><h4>Total: $ " + formatMoney.call(award_ttl) + "</h4><button id='dlcsv'>Download</button>"
                });


                var dlcsv = document.getElementById('dlcsv');

                dlcsv.onclick = function() {

                    var csvstring = "";
                    var i = 0;

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

                  var outputname = (d.govname).replace(/[^\w]/gi, '');

                    var blob = new Blob([csvstring], {
                        type: "text/csv;charset=utf-8"
                    });
                    saveAs(blob, "grant_report_" + outputname + ".csv");

                }
  
  
}