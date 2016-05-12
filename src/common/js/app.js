     $(document).ready(function() {
         'use strict';

         require("!style!css!../../lib/css/uirange-min.css");
         require("!style!css!../../lib/css/leaflet.modal.css");
         require("!style!css!../../lib/css/easy-button.css");

         require("!style!css!../css/app.css");

         var filter_prog_geo_date = require('./filter_prog_geo_date');
         var getcolor = require("./get_color");
         var field_reg_style = require('./field_reg_style');
         var impact_score_style = require('./impact_score_style');
       
         var formatMoney = require("./util").formatMoney;
         var sortNumeric = require("./util").sortNumeric;       
         var stack_chips = require("./stack_chips");       
       
         var searchstring = [];

         var mindate = new Date("2014,1,1");
         var maxdate = new Date("2016,1,1");

         var mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
             mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';

         var classic = L.tileLayer(mbUrl, {
             id: 'mapbox.streets-basic',
             attribution: mbAttr
         });

         var emerald = L.tileLayer(mbUrl, {
             id: 'mapbox.emerald',
             attribution: mbAttr
         });

         var mapquestOSM = L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
             maxZoom: 19,
             subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
             attribution: 'Tiles courtesy of <a href="https://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
         });

         var map = L.map('map', {
             center: [39, -105.5],
             zoom: 7,
             layers: [emerald],
             zoomControl: false
         });

         L.Control.Command = L.Control.extend({
             options: {
                 position: 'topright'
             },
             onAdd: function() {
                 var opt2div = L.DomUtil.create('div', '');
                 opt2div.id = 'opt2div';
                 opt2div.className = "form-group has-feedback";
                 var w = L.DomUtil.create('input', '', opt2div);
                 w.id = "slgid";
                 w.class = 'typeahead';
                 w.type = 'text';
                 w.placeholder = "Search...";
                 w.className = "form-control typeahead";
                 return opt2div;
             }
         });

         L.control.command = function(options) {
             return new L.Control.Command(options);
         };

         var LeafletFilterControl = L.control.command({
             postion: 'topright'
         });

         map.addControl(LeafletFilterControl);
         //trick add zoom control on right

         L.control.zoom({
             position: 'topright'
         }).addTo(map);





         L.easyButton('fa-question', function(btn, map) {

             map.openModal({
                 content: '<table class="abbrev"><tr><td><span class="ttext">CDBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants</a></span></td></tr><tr><td><span class="ttext">CSBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-services-block-grant-csbg" class="blue" target="_blank" >Community Services Block Grants</a></span></td></tr><tr><td><span class="ttext">CTF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/conservation-trust-fund-ctf" class="blue" target="_blank" >Conservation Trust Fund</a></span></td></tr><tr><td><span class="ttext">EIAF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/energymineral-impact-assistance-fund-eiaf" class="blue" target="_blank" >Energy/Mineral Impact Assistance Fund</a></span></td></tr><tr><td><span class="ttext">FFB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/firefighter-cardiac-benefit-program" class="blue" target="_blank" >Firefighter Cardiac Benefit Program</a></span></td></tr><tr><td><span class="ttext">FMLDD:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Federal Mineral Lease Direct Distribution</a></span></td></tr><tr><td><span class="ttext">FMLDDSB106:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://drive.google.com/open?id=0B6P5TF4k2v8qVG1WRUVObDVBdkk&authuser=0" class="blue" target="_blank" >Federal Mineral Lease Supplemental Distribution</a></span></td></tr><tr><td><span class="ttext">GAME:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/limited-gaming-impact-program" class="blue" target="_blank" >Limited Gaming Impact Program</a></span></td></tr><tr><td><span class="ttext">REDI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="http://www.advancecolorado.com/blueprint/regional-partners/rural-economic-development-initiative-redi-grant-program-0" class="blue" target="_blank" >Rural Economic Development Initiative</a></span></td></tr><tr><td><span class="ttext">SAR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/search-and-rescue-fund" class="blue" target="_blank" >Search and Rescue</a></span></td></tr><tr><td><span class="ttext">SEVEDD:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Severance Direct Distribution</a></span></td></tr><tr><td><span class="ttext">VFP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/volunteer-firefighter-pension-fund-vfp" class="blue" target="_blank" >Volunteer Firefighter Pension Fund</a></span></td></tr></table><br /><h4>Development</h4><p><a target ="_blank" href="https://jqueryui.com/">JQuery UI</a>, <a target ="_blank" href="http://leafletjs.com/">Leaflet</a>, <a target ="_blank" href="https://fortawesome.github.io/Font-Awesome/">Font-Awesome</a>, <a target ="_blank" href="https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet">Overlapping Marker Spiderfier</a>, <a target ="_blank" href="https://github.com/jseppi/Leaflet.MakiMarkers">Maki Markers</a>, <a target ="_blank" href="https://github.com/Leaflet/Leaflet.label">Leaflet Label</a>, <a target ="_blank" href="https://github.com/CliffCloud/Leaflet.EasyButton">Leaflet Easy Button</a>, <a target ="_blank" href="https://github.com/w8r/Leaflet.Modal">Leaflet Modal</a>, <a target ="_blank" href="https://ghusse.github.io/jQRangeSlider/index.html">JQRangeSlider</a>, <a target ="_blank" href="http://www.menucool.com/tooltip/css-tooltip">CSS Tooltip</a>, <a target ="_blank" href="https://twitter.github.io/typeahead.js/">Twitter Typeahead</a> </p>'
             });
         }).addTo(map); // probably just `map`

         /**
          * This function creates a popup when a field region is clicked.
          * @param {Object} feature the individual feature that was clicked on
          * @param {Object} layer the layer that the feature belongs to           
          * @returns {undefined} no return value.
          */
         function field_onEachFeature(feature, layer) {
             if (feature.properties && feature.properties.FieldReg_N) {
                 layer.bindPopup(feature.properties.FieldReg_N + " Region");
             }
         }

         function plan_onEachFeature(feature, layer) {
             if (feature.properties && feature.properties.PlanRgn) {
                 layer.bindPopup("Region " + feature.properties.PlanRgn);
             }
         }

         function score_onEachFeature(feature, layer) {
             if (feature.properties && feature.properties.cnty) {
                 layer.bindPopup("County: " + feature.properties.NAME + "<br />" + "Score: " + feature.properties.score);
             }
         }

         function county_onEachFeature(feature, layer) {
             if (feature.properties && feature.properties.NAME) {
                 layer.bindPopup(feature.properties.NAME);
             }
         }

         var field = new L.geoJson(null, {
             style: field_reg_style,
             onEachFeature: field_onEachFeature
         });

         $.ajax({

             dataType: "json",
             url: "data/fieldregions.geojson",
             success: function(data) {
                 $(data.features).each(function(key, data) {
                     field.addData(data);
                 });
             }
         }).error(function() {});

         var plan = new L.geoJson(null, {
             style: function() {
                 return {
                     weight: 2,
                     color: "#000",
                     fillOpacity: 0
                 };
             },
             onEachFeature: plan_onEachFeature
         });

         $.ajax({

             dataType: "json",
             url: "data/planningregions.geojson",
             success: function(data) {
                 $(data.features).each(function(key, data) {
                     plan.addData(data);
                 });
             }
         }).error(function() {});
         var coutline = new L.geoJson(null, {
             style: function() { //feature
                 return {
                     weight: 1,
                     color: "#444",
                     fillOpacity: 0
                 };
             },
             onEachFeature: county_onEachFeature
         }).addTo(map);

         $.ajax({
             dataType: "json",
             url: "data/counties.geojson",
             success: function(data) {
                 $(data.features).each(function(key, data) {
                     coutline.addData(data);
                 });
             }
         }).error(function() {});

         var score = new L.geoJson(null, {

             style: impact_score_style,
             onEachFeature: score_onEachFeature
         });

         $.ajax({
             dataType: "json",
             url: "data/counties.geojson",
             success: function(data) {
                 $(data.features).each(function(key, data) {
                     score.addData(data);
                 });
             }
         }).error(function() {});

         var overlays = {
             "Impact Score": score,
             "Field Regions": field,
             "Planning Regions": plan
         };

         var basemaps = {
             "Mapbox Emerald": emerald,
             "Mapquest": mapquestOSM,
             "Mapbox Streets": classic
         };

         L.control.layers(basemaps, overlays).addTo(map);
         //Custom Control - broadband link
         var bband = L.control({
             position: 'bottomleft'
         });

         bband.onAdd = function() {
             var div = L.DomUtil.create('div', 'lnk');
             div.innerHTML = '<a href="http://dola.colorado.gov/gis-cms/content/interactive-broadband-map">Colorado Broadband Grant Map</a>';
             return div;
         };
         bband.addTo(map);


         // create the control
         var sliderctrl = L.control({
             position: 'bottomleft'
         });
         sliderctrl.onAdd = function() {
             var div = L.DomUtil.create('div', 'sl');
             div.width = 500;
             div.innerHTML = '<div id="slider"></div>';
             return div;
         };
         sliderctrl.addTo(map);

         //disable click propogation to map below
         var diva = L.DomUtil.get('slider');
         L.DomEvent.disableClickPropagation(diva);
         var browserwidth = $(window).width();
         $('.sl').width((browserwidth - 100) + "px");
         $(window).resize(function() {
             var browserwidth = $(window).width();
             $('.sl').width((browserwidth - 100) + "px");
         });




         //Custom Title Control
         var title = L.control({
             position: 'topleft'
         });
         title.onAdd = function() {
             var div = L.DomUtil.create('div', 'title bord');
             div.innerHTML = '<h2>Colorado Financial Assistance</h2>';
             return div;
         };
         title.addTo(map);
         //Custom Layer Control
         var command = L.control({
             position: 'topleft'
         });
         command.onAdd = function() {
             var div = L.DomUtil.create('div', 'command bord');
             div.innerHTML = '<ul><li><a href="#tabs-1">Legend</a></li><li><a href="#tabs-2">Options</a></li></ul>' + '<div id="tabs-1">' + '<form><h4>Programs</h4>' + '&nbsp;&nbsp;&nbsp;<img src="css/images/blue_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Federal<br />' + '&nbsp;&nbsp;&nbsp;<img src="css/images/red_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;State<br />' + '&nbsp;&nbsp;&nbsp;<img src="css/images/green_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Formula<br />' + '&nbsp;&nbsp;&nbsp;<img src="css/images/purple_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Special<br />' + '<h4>Organization Type</h4>' + '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#10022;</span>&nbsp;&nbsp;&nbsp;City<br />' + '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9733;</span>&nbsp;&nbsp;&nbsp;County<br />' + '&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9642;</span>&nbsp;&nbsp;&nbsp;&nbsp;District<br />' + '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9899;</span>&nbsp;&nbsp;&nbsp;Other</form></div>' + '<div id="tabs-2">' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="cdbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)">Community Development Block Grants</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="csbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)">Community Services Block Grants</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="eiaf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Energy/Mineral Impact Assistance Fund</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="game" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Limited Gaming Impact Program</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="redi" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Rural Economic Development Initiative</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="ctf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Conservation Trust Fund</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="fmldd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Federal Mineral Lease Direct Distribution</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="fmlddsb106" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Federal Mineral Lease Supplemental Distribution</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="sevedd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Severance Direct Distribution</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="ffb" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Firefighter Cardiac Benefit Program</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="sar" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Search and Rescue</span><br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="vfp" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Volunteer Firefighter Pension Fund</span><br />' + '<hr>' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;&nbsp;City<br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;&nbsp;County<br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;&nbsp;District<br />' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="other" type="checkbox" checked />&nbsp;&nbsp;&nbsp;Other<br />' + '</div>';
             return div;
         };
         command.addTo(map);
         $(".command").tabs();


         $("#slider").dateRangeSlider({
             bounds: {
                 min: new Date("2012,1,1"),
                 max: maxdate
             },
             defaultValues: {
                 min: mindate,
                 max: maxdate
             }
         });
         $("#slider").bind("valuesChanged", function(e, data) {
             mindate = data.values.min;
             maxdate = data.values.max;
             refreshdata();
         });


         var substringMatcher = function(strs) {
             return function findMatches(q, cb) {
                 var matches = []; // an array that will be populated with substring matches
                 var substrRegex = new RegExp(q, 'i'); // regex used to determine if a string contains the substring `q`
                 // iterate through the pool of strings and for any string that
                 // contains the substring `q`, add it to the `matches` array
                 $.each(strs, function(i, str) {
                     if (substrRegex.test(str)) {
                         // the typeahead jQuery plugin expects suggestions to a
                         // JavaScript object, refer to typeahead docs for more info
                         matches.push({
                             value: str
                         });
                     }
                 });
                 cb(matches);
             };
         };
         //Typeahead (Name or ID Search)
         {
             $('.typeahead').typeahead({
                 hint: true,
                 highlight: true,
                 minLength: 4
             }, {
                 name: 'searchstring',
                 displayKey: 'value',
                 source: substringMatcher(searchstring)
             });
             $('.typeahead').on('typeahead:select', function(e, datum) {
                 //console.log('select');
                 searchresult(datum);
             }).on('typeahead:autocomplete', function(e, datum) {
                 //console.log('autocomplete');
                 searchresult(datum);
             });
             /*$('.typeahead').bind('typeahead:select', function(ev, suggestion) {
                 console.log('ev: ' + ev);
                 console.log('Selection: ' + suggestion);
             });*/
             //dropdown suggestions default to hidden.  
             $('.tt-menu').css("visibility", "hidden");
             //if textbox is cleared, dropdown suggestions become hidden again
             $('#slgid').on('input', function() {
                 if ($('#slgid').val() === "") {
                     $('.tt-menu').css("visibility", "hidden");
                 } else {
                     $('.tt-menu').css("visibility", "visible");
                 }
             });
         }

         function searchresult(result) {
             //console.log(result);
             var latlng = null;
             for (var m = 0; m < searchstring.length; m = m + 1) {
                 if (result.value === searchstring[m]) {
                     /*console.log('hit');
                     console.log(coordinates[m]);
                     latlng = L.latLng(coordinates[m][1], coordinates[m][0]);*/
                 }
             }
             map.setView(latlng, 12);
             $('.tt-menu').css("visibility", "hidden");
         }
       
         $("#slgid").click(function(event) {
             event.stopPropagation();
             // Do something
         });
         $(".tt-menu").click(function(event) {
             event.stopPropagation();
             // Do something
         });
         $("#slgid").dblclick(function(event) {
             event.stopPropagation();
             // Do something
         });
         $("#slgid").mousemove(function(event) {
             event.stopPropagation();
             // Do something
         });

         var flags = {};
         flags.cdbg_flag = 1;
         flags.csbg_flag = 1;
         flags.eiaf_flag = 1;
         flags.game_flag = 1;

         flags.redi_flag = 1;
         flags.ctf_flag = 1;
         flags.fmldd_flag = 1;
         flags.fmlddsb106_flag = 1;

         flags.sevedd_flag = 1;
         flags.ffb_flag = 1;
         flags.sar_flag = 1;
         flags.vfp_flag = 1;

         function click_cdbg() {
             if ($('#cdbg').is(':checked')) {
                 flags.cdbg_flag = 1;
             } else {
                 flags.cdbg_flag = 0;
             }
             refreshdata();
         }

         function click_csbg() {
             if ($('#csbg').is(':checked')) {
                 flags.csbg_flag = 1;
             } else {
                 flags.csbg_flag = 0;
             }
             refreshdata();
         }

         function click_eiaf() {
             if ($('#eiaf').is(':checked')) {
                 flags.eiaf_flag = 1;
             } else {
                 flags.eiaf_flag = 0;
             }
             refreshdata();
         }

         function click_game() {
             if ($('#game').is(':checked')) {
                 flags.game_flag = 1;
             } else {
                 flags.game_flag = 0;
             }
             refreshdata();
         }

         function click_redi() {
             if ($('#redi').is(':checked')) {
                 flags.redi_flag = 1;
             } else {
                 flags.redi_flag = 0;
             }
             refreshdata();
         }

         function click_ctf() {
             if ($('#ctf').is(':checked')) {
                 flags.ctf_flag = 1;
             } else {
                 flags.ctf_flag = 0;
             }
             refreshdata();
         }

         function click_fmldd() {
             if ($('#fmldd').is(':checked')) {
                 flags.fmldd_flag = 1;
             } else {
                 flags.fmldd_flag = 0;
             }
             refreshdata();
         }

         function click_fmlddsb106() {
             if ($('#fmlddsb106').is(':checked')) {
                 flags.fmlddsb106_flag = 1;
             } else {
                 flags.fmlddsb106_flag = 0;
             }
             refreshdata();
         }

         function click_sevedd() {
             if ($('#sevedd').is(':checked')) {
                 flags.sevedd_flag = 1;
             } else {
                 flags.sevedd_flag = 0;
             }
             refreshdata();
         }

         function click_ffb() {
             if ($('#ffb').is(':checked')) {
                 flags.ffb_flag = 1;
             } else {
                 flags.ffb_flag = 0;
             }
             refreshdata();
         }

         function click_sar() {
             if ($('#sar').is(':checked')) {
                 flags.sar_flag = 1;
             } else {
                 flags.sar_flag = 0;
             }
             refreshdata();
         }

         function click_vfp() {
             if ($('#vfp').is(':checked')) {
                 flags.vfp_flag = 1;
             } else {
                 flags.vfp_flag = 0;
             }
             refreshdata();
         }

         flags.city_flag = 1;
         flags.county_flag = 1;
         flags.district_flag = 1;
         flags.other_flag = 1;

         function click_city() {
             if ($('#city').is(':checked')) {
                 flags.city_flag = 1;
             } else {
                 flags.city_flag = 0;
             }
             refreshdata();
         }

         function click_county() {
             if ($('#county').is(':checked')) {
                 flags.county_flag = 1;
             } else {
                 flags.county_flag = 0;
             }
             refreshdata();
         }

         function click_district() {
             if ($('#district').is(':checked')) {
                 flags.district_flag = 1;
             } else {
                 flags.district_flag = 0;
             }
             refreshdata();
         }

         function click_other() {
             if ($('#other').is(':checked')) {
                 flags.other_flag = 1;
             } else {
                 flags.other_flag = 0;
             }
             refreshdata();
         }
         document.getElementById("cdbg").addEventListener("click", click_cdbg, false);
         document.getElementById("csbg").addEventListener("click", click_csbg, false);
         document.getElementById("eiaf").addEventListener("click", click_eiaf, false);
         document.getElementById("game").addEventListener("click", click_game, false);
         document.getElementById("redi").addEventListener("click", click_redi, false);
         document.getElementById("ctf").addEventListener("click", click_ctf, false);
         document.getElementById("fmldd").addEventListener("click", click_fmldd, false);
         document.getElementById("fmlddsb106").addEventListener("click", click_fmlddsb106, false);
         document.getElementById("sevedd").addEventListener("click", click_sevedd, false);
         document.getElementById("ffb").addEventListener("click", click_ffb, false);
         document.getElementById("sar").addEventListener("click", click_sar, false);
         document.getElementById("vfp").addEventListener("click", click_vfp, false);
         document.getElementById("city").addEventListener("click", click_city, false);
         document.getElementById("county").addEventListener("click", click_county, false);
         document.getElementById("district").addEventListener("click", click_district, false);
         document.getElementById("other").addEventListener("click", click_other, false);



         var tooltip = d3.select("body")
             .append("div")
             .style("position", "absolute")
             .style("z-index", "1000")
             .style("background-color", "white")
             .style("padding", "10px")
             .style("border", "1px solid grey")
             .style("visibility", "hidden")
             .text("a simple tooltip");


         var key = function(d) {
             return d.id;
         };

         var csvdatacopy = [];
         var cities = [];


         var citiesOverlay = L.d3SvgOverlay(function(sel, proj) {

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
             var v1 = stack_chips(data);
             var cities = v1.sort(sortNumeric);
             csvdatacopy = cities;
             map.addLayer(citiesOverlay);
             refreshdata();
         }); //end d3.csv

       
         function refreshdata() {
             var v1 = csvdatacopy.filter(d => filter_prog_geo_date(d, flags, mindate, maxdate));
             cities = stack_chips(v1);
             map.fireEvent('zoomend', {}); //lol, hack to refresh
         }




     }); //end $ document