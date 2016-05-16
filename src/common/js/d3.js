module.exports = function(map) {
  
         var filter_prog_geo_date = require('./filter_prog_geo_date');
         var getcolor = require("./get_color");
         var formatMoney = require("./util").formatMoney;
         var sortNumeric = require("./util").sortNumeric;       
         var stack_chips = require("./stack_chips");       

  
         var csvdatacopy = [];
         var cities = [];

         //not constants... can be changed by slider
  var daterange={};
         daterange.mindate = new Date("2014,1,1");
         daterange.maxdate = new Date("2016,1,1");
  
  
         var citiesOverlay = L.d3SvgOverlay(function(sel, proj) {
           
                    var key = function(d) {
             return d.id;
         };
           
                    var tooltip = d3.select("body")
             .append("div")
             .style("position", "absolute")
             .style("z-index", "1000")
             .style("background-color", "white")
             .style("padding", "10px")
             .style("border", "1px solid grey")
             .style("visibility", "hidden")
             .text("a simple tooltip");

             var citiesUpd = sel.selectAll('circle').data(cities, key);

             citiesUpd.enter()
                 .append('circle')
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
                         projoutput = "";
                     } else {
                         projoutput = d.projname + "<br />";
                     }
                     var a = formatMoney.call((parseFloat(d.award)),0);
                     return tooltip.html(d.govname + "<br />Program: " + d.program + "&nbsp;&nbsp;Date: " + d.dateofaward + "<br />" + projoutput + "Award: $" + a);
                 })
                 .on("mouseover", function() {
                     return tooltip.style("visibility", "visible");
                 })
                 .on("mousemove", function() {
                     return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                 })
                 .on("mouseout", function() {
                     return tooltip.style("visibility", "hidden");
                 })
                 .on("click", function(d) {
                     map.openModal({
                         content: "data: " + d.toString()
                     });
                 });

             //move all circles	
             citiesUpd.transition()
                 .duration(0)
                 .ease("linear")
                 .attr('cx', function(d) {
                     return proj.latLngToLayerPoint(d.latLng).x;
                 })
                 .attr('cy', function(d) {
                     return proj.latLngToLayerPoint(d.latLng).y;
                 })
                 .attr('fill', function(d) {
                     return getcolor(d.program);
                 });

             citiesUpd.exit().remove();
             citiesUpd.order();
         });

  

         d3.csv("grantpts.csv", function(data) {
             cities = stack_chips(data);
             cities = cities.sort(sortNumeric);
             csvdatacopy = cities;
             map.addLayer(citiesOverlay);
             refreshdata();
         }); //end d3.csv

       
  

  
         function refreshdata() {
           
          var flags={};
 
             (($('#cdbg').is(':checked'))) ? flags.cdbg_flag = 1 : flags.cdbg_flag = 0;
             (($('#csbg').is(':checked'))) ? flags.csbg_flag = 1 : flags.csbg_flag = 0;
             (($('#eiaf').is(':checked'))) ? flags.eiaf_flag = 1 : flags.eiaf_flag = 0;
             (($('#game').is(':checked'))) ? flags.game_flag = 1 : flags.game_flag = 0;
             (($('#redi').is(':checked'))) ? flags.redi_flag = 1 : flags.redi_flag = 0;
             (($('#ctf').is(':checked'))) ? flags.ctf_flag = 1 : flags.ctf_flag = 0;
             (($('#fmldd').is(':checked'))) ? flags.fmldd_flag = 1 : flags.fmldd_flag = 0;
             (($('#fmlddsb106').is(':checked'))) ? flags.fmlddsb106_flag = 1 : flags.fmlddsb106_flag = 0;
             (($('#sevedd').is(':checked'))) ? flags.sevedd_flag = 1 : flags.sevedd_flag = 0;
             (($('#ffb').is(':checked'))) ? flags.ffb_flag = 1 : flags.ffb_flag = 0;
             (($('#sar').is(':checked'))) ? flags.sar_flag = 1 : flags.sar_flag = 0;
             (($('#vfp').is(':checked'))) ? flags.vfp_flag = 1 : flags.vfp_flag = 0;
             (($('#city').is(':checked'))) ? flags.city_flag = 1 : flags.city_flag = 0;
             (($('#county').is(':checked'))) ? flags.county_flag = 1 : flags.county_flag = 0;
             (($('#district').is(':checked'))) ? flags.district_flag = 1 : flags.district_flag = 0;
             (($('#other').is(':checked'))) ? flags.other_flag = 1 : flags.other_flag = 0;
           
             cities = csvdatacopy.filter(d => filter_prog_geo_date(d, flags, daterange));
             cities = stack_chips(cities);
             map.fireEvent('zoomend', {}); //lol, hack to refresh
         }

  require("./add_slider.js")(map, daterange, refreshdata);
  
  require("./add_custom_control.js")(map, refreshdata);


  
};