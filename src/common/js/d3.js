// @flow

var grant_report = require("./grant_report.js");
var filter_prog_geo_date = require('./filter_prog_geo_date');
var getcolor = require("./get_color");
var accounting = require("accounting");
var stack_chips = require("./stack_chips");
var top_text = require("./top_text.js");


module.exports = function(map: Object, p1: Promise, p2: Promise) {
    'use strict';

    function symbolize(d) {
        if (d.lgtype === 2 || d.lgtype === 3 || d.lgtype === 4 || d.lgtype === 5) {
            return "✦";
        }
        if (d.lgtype === 1 || d.lgtype === 61 || d.lgtype === 70) {
            return "★";
        }
        if (d.lgtype !== 1 && d.lgtype !== 2 && d.lgtype !== 3 && d.lgtype !== 4 && d.lgtype !== 5 && d.lgtype !== 61 && d.lgtype !== 70 && d.lgtype !== 100) {
            return "▪";
        }
        if (d.lgtype === 100) {
            return "▲";
        }

        return "ARG!!!"; //hopefully not

    } //✦★▪▲


    function fontSize(d) {
        if (d.lgtype === 2 || d.lgtype === 3 || d.lgtype === 4 || d.lgtype === 5) {
            return "4pt";
        }
        if (d.lgtype === 1 || d.lgtype === 61 || d.lgtype === 70) {
            return "4pt";
        }
        if (d.lgtype !== 1 && d.lgtype !== 2 && d.lgtype !== 3 && d.lgtype !== 4 && d.lgtype !== 5 && d.lgtype !== 61 && d.lgtype !== 70 && d.lgtype !== 100) {
            return "7pt";
        }
        if (d.lgtype === 100) {
            return "3pt";
        }

        return "100pt"; //hopefully not

    } //✦★▪▲


    function offSet(d) {
        if (d.lgtype === 2 || d.lgtype === 3 || d.lgtype === 4 || d.lgtype === 5) {
            return 1.7;
        }
        if (d.lgtype === 1 || d.lgtype === 61 || d.lgtype === 70) {
            return 1.6;
        }
        if (d.lgtype !== 1 && d.lgtype !== 2 && d.lgtype !== 3 && d.lgtype !== 4 && d.lgtype !== 5 && d.lgtype !== 61 && d.lgtype !== 70 && d.lgtype !== 100) {
            return 3;
        }
        if (d.lgtype === 100) {
            return 1.4;
        }

        return 4; //hopefully not

    } //✦★▪▲

    var animation_ms: number = 1000;
  
    var csvdatacopy: Array < Object > = [];
    var cities: Array < Object > = [];
    var texts: Array < Object > = [];

    //not constants... can be changed by slider
    var daterange: {
        mindate: Date,
        maxdate: Date
    } = {
        mindate: new Date(2012, 0, 1),
        maxdate: new Date()
    };

    function dateShort(dateobj) {
        return (dateobj.getMonth() + 1) + '/' + dateobj.getDate() + '/' + dateobj.getFullYear();
    }

    var ifmobile = document.getElementById('ifmobile');
    ifmobile.innerHTML = " | <a href='https://dola.colorado.gov'>DOLA</a> | " + dateShort(daterange.mindate) + " to " + dateShort(daterange.maxdate);


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

        var key = function(d): number {
            return d.id;
        };

        var citiesUpd = sel.selectAll('circle')
            .data(cities, key);

        citiesUpd.enter()
            .append('circle')
            .style("opacity", 1e-6)
            .attr('r', 3.2)
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 0.12)
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
                var a = accounting.formatMoney(parseFloat(d.award));
                //console.log('{"lgid": "' + d.lgid + '", "fips":null, "lgname": "' + d.govname + '", "lgtype": "'+d.lgtype+'", "lgstatus":"1", "bbox":"", "coordinates":[' + d.longitude + ',' + d.latitude + ']},');
                return tooltip.html('<b>' + d.govname + '</b>' + '<br /><span style="font-family: monospace;">' + projoutput + '-------<br /><span style="color: grey;">Program:</span>&nbsp;' + d.program + '<br /><span style="color: grey;">Date:</span>&nbsp;&nbsp;&nbsp;&nbsp;' + (d.dateofaward).toString().slice(4, 15) + '<br />' + '<span style="color: grey;">Award:</span>&nbsp;&nbsp;&nbsp;' + a + '</span>');
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
                grant_report(d, map, cities, daterange)
            });




        //move all circles
        citiesUpd
            .transition()
            .duration(animation_ms)
            .ease("linear")
            .style("opacity", 1)
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            });


        citiesUpd.exit()
            .transition()
            .duration(animation_ms)
            .style("opacity", 1e-6)
            .remove();


        citiesUpd.order();


    });
    var textOverlay = L.d3SvgOverlay(function(sel, proj) {

        var key = function(d): number {
            return d.id;
        };

        var textUpd = sel.selectAll('text')
            .data(texts, key);

        textUpd.enter()
            .append('text')
            .style('text-anchor', 'middle')
            .style("opacity", 1e-6)
            .style('stroke', '#2f4f4f')
            .style('stroke-width', '0.1')
            .style('fill', '#eee9e9')
            .style('font-size', fontSize)
            .attr('x', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('y', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y + offSet(d);
            })
            .text(symbolize)
            .style('pointer-events', 'none');



        //move all circles
        textUpd
            .transition()
            .duration(animation_ms)
            .ease("linear")
            .style("opacity", 1)
            .attr('x', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('y', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y + offSet(d);
            });


        textUpd.exit()
            .transition()
            .duration(animation_ms)
            .style("opacity", 1e-6)
            .remove();

        textUpd.order();
    });


    //so that geojson layers do not load before chips (preventing them from being clickable)
    Promise.all([p1, p2]).then(function(values) {



        cities = values[1][0];
        csvdatacopy = cities;


        require("./add_typeahead.js")(map, values[1][1], values[1][2]);

        //      map.setView(L.latLng(38.9983, -105.6417), 9);
        refreshdata();
        map.addLayer(citiesOverlay);
        map.addLayer(textOverlay);

    });


    function refreshdata() {

        var flags: {
            bb_flag: number;cap_flag: number;dr_flag: number;ed_flag: number;en_flag: number;hhs_flag: number;hous_flag: number;pr_flag: number;pcd_flag: number;pf_flag: number;ps_flag: number;road_flag: number;sew_flag: number;wat_flag: number
        } = {
            bb_flag: 0,
            cap_flag: 0,
            dr_flag: 0,
            ed_flag: 0,
            en_flag: 0,
            hhs_flag: 0,
            hous_flag: 0,
            pr_flag: 0,
            pcd_flag: 0,
            pf_flag: 0,
            ps_flag: 0,
            road_flag: 0,
            sew_flag: 0,
            wat_flag: 0,

            city_flag: 0,
            county_flag: 0,
            district_flag: 0,
            other_flag: 0
        };

        (($('#bb').is(':checked'))) ? flags.bb_flag = 1: flags.bb_flag = 0;
        (($('#cap').is(':checked'))) ? flags.cap_flag = 1: flags.cap_flag = 0;
        (($('#dr').is(':checked'))) ? flags.dr_flag = 1: flags.dr_flag = 0;
        (($('#ed').is(':checked'))) ? flags.ed_flag = 1: flags.ed_flag = 0;
        (($('#en').is(':checked'))) ? flags.en_flag = 1: flags.en_flag = 0;
        (($('#hhs').is(':checked'))) ? flags.hhs_flag = 1: flags.hhs_flag = 0;
        (($('#hous').is(':checked'))) ? flags.hous_flag = 1: flags.hous_flag = 0;
        (($('#pr').is(':checked'))) ? flags.pr_flag = 1: flags.pr_flag = 0;
        (($('#pcd').is(':checked'))) ? flags.pcd_flag = 1: flags.pcd_flag = 0;
        (($('#pf').is(':checked'))) ? flags.pf_flag = 1: flags.pf_flag = 0;
        (($('#ps').is(':checked'))) ? flags.ps_flag = 1: flags.ps_flag = 0;
        (($('#road').is(':checked'))) ? flags.road_flag = 1: flags.road_flag = 0;
        (($('#sew').is(':checked'))) ? flags.sew_flag = 1: flags.sew_flag = 0;
        (($('#wat').is(':checked'))) ? flags.wat_flag = 1: flags.wat_flag = 0;
    

        (($('#city').is(':checked'))) ? flags.city_flag = 1: flags.city_flag = 0;
        (($('#county').is(':checked'))) ? flags.county_flag = 1: flags.county_flag = 0;
        (($('#district').is(':checked'))) ? flags.district_flag = 1: flags.district_flag = 0;
        (($('#other').is(':checked'))) ? flags.other_flag = 1: flags.other_flag = 0;

        cities = csvdatacopy.filter(d => filter_prog_geo_date(d, flags, daterange));
        cities = stack_chips(cities);
        texts = top_text(cities);

        map.fireEvent('zoomend', {}); //lol, hack to refresh
    }

    require("./add_slider.js")(map, daterange, refreshdata);

    require("./add_custom_control.js")(map, refreshdata);



};