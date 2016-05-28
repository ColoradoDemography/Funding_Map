// @flow

    var grant_report = require("./grant_report.js");
    var filter_prog_geo_date = require('./filter_prog_geo_date');
    var getcolor = require("./get_color");
    var formatMoney = require("./util").formatMoney;
    var sortNumeric = require("./util").sortNumeric;
    var stack_chips = require("./stack_chips");
    var initial_grantdata_crunch = require("./initial_grantdata_crunch.js")
    var valueize = require("./valueize.js");

module.exports = function(map: Object, searchstring: Array < string > , coordinates: Array < Array < number >> , p1: any, p2: any, p3: any) {
    'use strict';




    var csvdatacopy: Array < Object > = [];
    var cities: Array < Object > = [];


    //not constants... can be changed by slider
    var daterange: Object = {
        mindate: new Date(2014, 0, 1),
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

        var key = function(d): number {
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
            .on("click", function(d){grant_report(d, map, cities, daterange)});



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


        citiesUpd.exit()
            .transition()
            .duration(1000)
            .style("opacity", 1e-6).remove()
            .attr('cx', function(d) {
                return proj.latLngToLayerPoint(d.latLng).x;
            })
            .attr('cy', function(d) {
                return proj.latLngToLayerPoint(d.latLng).y;
            });

        citiesUpd.order();
    });



    d3.csv("https://storage.googleapis.com/co-publicdata/grantpts.csv", function(data) {

        var data_translated: Array<Object> = data.map(d => {
          return initial_grantdata_crunch(d, searchstring, coordinates);
        });

        cities = stack_chips(data_translated);
        cities.forEach( d => valueize(d) );
        cities = cities.sort(sortNumeric);
        csvdatacopy = cities; //the same object

        //so that geojson layers do not load before chips (preventing them from being clickable)
        Promise.all([p1, p2, p3]).then(function() {
            map.addLayer(citiesOverlay);
          
          var latlng: Object = L.latLng(38.9983, -105.6417);
          
            map.setView( latlng, 9  );
            refreshdata();
        });



    }); //end d3.csv





    function refreshdata() {

        var flags: Object = {};

        (($('#cdbg').is(':checked'))) ? flags.cdbg_flag = 1: flags.cdbg_flag = 0;
        (($('#csbg').is(':checked'))) ? flags.csbg_flag = 1: flags.csbg_flag = 0;
        (($('#eiaf').is(':checked'))) ? flags.eiaf_flag = 1: flags.eiaf_flag = 0;
        (($('#game').is(':checked'))) ? flags.game_flag = 1: flags.game_flag = 0;
        (($('#redi').is(':checked'))) ? flags.redi_flag = 1: flags.redi_flag = 0;
        (($('#ctf').is(':checked'))) ? flags.ctf_flag = 1: flags.ctf_flag = 0;
        (($('#fmldd').is(':checked'))) ? flags.fmldd_flag = 1: flags.fmldd_flag = 0;
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