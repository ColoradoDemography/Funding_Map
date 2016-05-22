// @flow

module.exports = function(map: Object, searchstring: Array<string>, coordinates: Array<Array<number>>) {
    'use strict';


    var filter_prog_geo_date = require('./filter_prog_geo_date');
    var getcolor = require("./get_color");
    var formatMoney = require("./util").formatMoney;
    var sortNumeric = require("./util").sortNumeric;
    var monthNumStr = require("./util").monthNumStr;
    var stack_chips = require("./stack_chips");
    //var saveAs = require("../../lib/FileSaver.min.js");
    var saveAs = require("../../lib/js/FileSaver.min.js").saveAs;

    var csvdatacopy: Array < Object > = [];
    var cities: Array < Object > = [];





    //not constants... can be changed by slider
    var daterange: Object = {
        mindate: new Date(2014, 0, 0),
        maxdate: new Date()
    };

    var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "1000")
        .style("background-color", "white")
        .style("padding", "10px")
        .style("border", "1px solid grey")
        .style("display", "none")
        .text("a simple tooltip");


    var citiesOverlay = L.d3SvgOverlay(function(sel, proj) {

        var key = function(d): string {
            return d.id;
        };

        var citiesUpd = sel.selectAll('circle').data(cities, key);

        citiesUpd.enter()
            .append('circle')
            .style("opacity", 1e-6)
            .attr('r', 0.8)
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 0.03)
            .attr('fill', function(d) {
                return getcolor(d.program);
            })
            .on("mouseenter", function(d) {
                var projoutput = "";
                if (d.projname === "null" || d.projname === null) {
                    projoutput = '';
                } else {
                    projoutput = '<span style="vertical-align: -5px"><i>' + d.projname + '</i></span><br />';
                }
                var a = formatMoney.call((parseFloat(d.award)), 0);
                return tooltip.html('<b>' + d.govname + '</b>' + '<br /><span style="font-family: monospace;">' + projoutput + '-------<br /><span style="color: grey;">Program:</span>&nbsp;' + d.program + '<br /><span style="color: grey;">Date:</span>&nbsp;&nbsp;&nbsp;&nbsp;' + (d.dateofaward).toString().slice(4, 15) + '<br />' + '<span style="color: grey;">Award:</span>&nbsp;&nbsp;&nbsp;$' + a + '</span>');
            })
            .on("mouseover", function() {
                return tooltip.style("display", "block");
            })
            .on("mousemove", function() {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                return tooltip.style("display", "none");
            })
            .on("click", function(d) {

                var tbl_results = [];
                var len = cities.length;
                for (let i = 0; i < len; i++) {
                    if (cities[i].lgid === d.lgid) {
                        tbl_results.push(cities[i]);
                    }
                }

                function compare(a, b) {
                    if (a.dateofaward < b.dateofaward)
                        return -1;
                    else if (a.dateofaward > b.dateofaward)
                        return 1;
                    else
                        return 0;
                }

                tbl_results.sort(compare);


                var content_tbl = "";
                var award_ttl = 0;

                var j = tbl_results.length;
          
                for (var i = 0; i<j; i++) {
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

                    var oTable : any = document.getElementById('resultstable');
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


                    var blob = new Blob([csvstring], {
                        type: "text/csv;charset=utf-8"
                    });
                    saveAs(blob, "grant_report.csv");

                }


            });



        //move all circles	
        citiesUpd
            .transition()
            .duration(1000)
            .ease("linear")
            .style("opacity", 1)
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            });
        //             .attr('fill', function(d) {
        //                 return getcolor(d.program);
        //             });

        citiesUpd.exit()
            .transition()
            .duration(1500)
            .style("opacity", 1e-6).remove()
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            });

        citiesUpd.order();
    });



    d3.csv("grantpts.csv", function(data) {

     
        //map
        var data_translated = data.map(d => {
          if(d.program==="EIAF"){
                        console.log(d);
          }

          
          //seed the search arrays
          if(searchstring.indexOf(d.govname)===-1){
            searchstring.push(d.govname);
            coordinates.push([parseFloat(d.longitude),parseFloat(d.latitude)]);
            searchstring.push(d.lgid);
            coordinates.push([parseFloat(d.longitude),parseFloat(d.latitude)]);
          }
          //search by EIAF project number - precede search with #
          if(d.program === "EIAF" && d.projectnmbr>0 && (searchstring.indexOf(("#"+d.projectnmbr))===-1)){
            searchstring.push(("#" + d.projectnmbr));
            coordinates.push([parseFloat(d.longitude),parseFloat(d.latitude)]);
          }
          
            var dateofaward = (d.dateofaward).split("-");
            var awrd = new Date(Number("20" + dateofaward[2]), monthNumStr(dateofaward[1]), Number(dateofaward[0]));

            if (d.projectnmbr === "null") {
                d.projectnmbr = "";
            }
            if (d.projname === "null") {
                d.projname = d.program + " Distribution";
            }

            var rObj = {};
            rObj['award'] = parseFloat(d.award);
            rObj['dateofaward'] = awrd;
            rObj['govname'] = d.govname;
            rObj['latitude'] = parseFloat(d.latitude);
            rObj['longitude'] = parseFloat(d.longitude);
            rObj['lgid'] = parseInt(d.lgid, 10);
            rObj['lgstatus'] = parseInt(d.lgstatus, 10);
            rObj['lgtype'] = parseInt(d.lgtype, 10);
            rObj['program'] = d.program;
            rObj['projectnmbr'] = d.projectnmbr;
            rObj['projname'] = d.projname;
            return rObj;
        });
      
      
        cities = stack_chips(data_translated);
        cities = cities.sort(sortNumeric);
        csvdatacopy = cities;
        map.addLayer(citiesOverlay);
        refreshdata();
    }); //end d3.csv





    function refreshdata() {

        var flags = {};

        (($('#cdbg').is(':checked'))) ? flags.cdbg_flag = 1: flags.cdbg_flag = 0;
        (($('#csbg').is(':checked'))) ? flags.csbg_flag = 1: flags.csbg_flag = 0;
        (($('#eiaf').is(':checked'))) ? flags.eiaf_flag = 1: flags.eiaf_flag = 0;
        (($('#game').is(':checked'))) ? flags.game_flag = 1: flags.game_flag = 0;
        (($('#redi').is(':checked'))) ? flags.redi_flag = 1: flags.redi_flag = 0;
        (($('#ctf').is(':checked'))) ? flags.ctf_flag = 1: flags.ctf_flag = 0;
        (($('#fmldd').is(':checked'))) ? flags.fmldd_flag = 1: flags.fmldd_flag = 0;
        (($('#fmlddsb106').is(':checked'))) ? flags.fmlddsb106_flag = 1: flags.fmlddsb106_flag = 0;
        (($('#sevedd').is(':checked'))) ? flags.sevedd_flag = 1: flags.sevedd_flag = 0;
        (($('#ffb').is(':checked'))) ? flags.ffb_flag = 1: flags.ffb_flag = 0;
        (($('#sar').is(':checked'))) ? flags.sar_flag = 1: flags.sar_flag = 0;
        (($('#vfp').is(':checked'))) ? flags.vfp_flag = 1: flags.vfp_flag = 0;

        (($('#dr').is(':checked'))) ? flags.dr_flag = 1: flags.dr_flag = 0;

        (($('#city').is(':checked'))) ? flags.city_flag = 1: flags.city_flag = 0;
        (($('#county').is(':checked'))) ? flags.county_flag = 1: flags.county_flag = 0;
        (($('#district').is(':checked'))) ? flags.district_flag = 1: flags.district_flag = 0;
        (($('#other').is(':checked'))) ? flags.other_flag = 1: flags.other_flag = 0;

        cities = csvdatacopy.filter(d => filter_prog_geo_date(d, flags, daterange));
        cities = stack_chips(cities);
        map.fireEvent('zoomend', {}); //lol, hack to refresh
    }

    require("./add_slider.js")(map, daterange, refreshdata);

    require("./add_custom_control.js")(map, refreshdata);



};