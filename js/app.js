  var map;
  var indexnum = 0;

  function popopen(table) {
      'use strict';

      map.openModal({
          content: table.replace(/\?/g, "'")
      });

  }

  (function() {

      'use strict';
      var searchstring = [];


      $(document).ready(function() {

          var basedate = new Date("2000,1,1");
          var mindate = new Date("2014,1,1");
          var maxdate = new Date("2016,1,1");



          function valueize(d) {
              //sort by lgid, program, by date
              //integer value for lgid plus hundredths for program plus thousands for date
              //sorted by lgid so no overlaps between chip stacks
              //TODO edge case remove alphachars from csbg
              //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG", "DR"];


              var start = parseFloat(d.lgid);

              if (d.program === "FML") {
                  start = start + 0.18;
              }
              if (d.program === "CTF") {
                  start = start + 0.19;
              }
              if (d.program === "SEV_DIST") {
                  start = start + 0.17;
              }
              if (d.program === "CSBG") {
                  start = start + 0.13;
              }
              if (d.program === "CDBG") {
                  start = start + 0.12;
              }
              if (d.program === "EIAF") {
                  start = start + 0.09;
              }
              if (d.program === "GAME") {
                  start = start + 0.10;
              }
              if (d.program === "REDI") {
                  start = start + 0.11;
              }
              if (d.program === "VFP") {
                  start = start + 0.15;
              }
              if (d.program === "SAR") {
                  start = start + 0.14;
              }
              if (d.program === "FFB") {
                  start = start + 0.16;
              }

              function daydiff(second) {
                  return Math.round((second - basedate) / (1000 * 60 * 60 * 24));
              }

              start = start + ((daydiff(new Date(d.dateofaward))) / 10000000);



              return start;
          }


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


          map = L.map('map', {
              center: [39, -105.5],
              zoom: 7,
              layers: [emerald],
              zoomControl: false
          });


          L.Control.Command = L.Control.extend({
              options: {
                  position: 'topright',
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

              style: function(feature) {
                  switch (feature.properties.fieldreg) {
                      case "sc":
                          return {
                              stroke: false,
                              color: "rgb(102,237,100)"
                          };
                      case "sw":
                          return {
                              stroke: false,
                              color: "rgb(176,118,79)"
                          };
                      case "se":
                          return {
                              stroke: false,
                              color: "rgb(116,68,194)"
                          };
                      case "nw":
                          return {
                              stroke: false,
                              color: "rgb(81,197,232)"
                          };
                      case "nm":
                          return {
                              stroke: false,
                              color: "rgb(250,105,173)"
                          };
                      case "ne":
                          return {
                              stroke: false,
                              color: "rgb(73,128,74)"
                          };
                      case "c":
                          return {
                              stroke: false,
                              color: "rgb(255,255,115)"
                          };
                      case "nc":
                          return {
                              stroke: false,
                              color: "rgb(47,80,130)"
                          };
                  }
              },
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
              style: function() { //feature
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

              style: function(feature) {

                  switch (feature.properties.score) {
                      case 3:
                          return {
                              stroke: false,
                              color: "rgb(255,255,128)"
                          };
                      case 4:
                          return {
                              stroke: false,
                              color: "rgb(250,209,85)"
                          };
                      case 5:
                          return {
                              stroke: false,
                              color: "rgb(250,209,85)"
                          };
                      case 6:
                          return {
                              stroke: false,
                              color: "rgb(242,167,46)"
                          };
                      case 7:
                          return {
                              stroke: false,
                              color: "rgb(173,83,19)"
                          };
                      case 8:
                          return {
                              stroke: false,
                              color: "rgb(173,83,19)"
                          };
                      case 9:
                          return {
                              stroke: false,
                              color: "rgb(107,0,0)"
                          };
                      case 10:
                          return {
                              stroke: false,
                              color: "rgb(107,0,0)"
                          };
                  }
              },
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
                  var matches;
                  // an array that will be populated with substring matches
                  matches = [];
                  // regex used to determine if a string contains the substring `q`
                  var substrRegex = new RegExp(q, 'i');
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
              $('.typeahead').bind('typeahead:select', function(ev, suggestion) {
                  console.log('ev: ' + ev);
                  console.log('Selection: ' + suggestion);
              });
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
                      //console.log('hit');
                      //console.log(coordinates[m]);
                      latlng = L.latLng(coordinates[m][1], coordinates[m][0]);
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

          var cdbg_flag = 1;
          var csbg_flag = 1;
          var eiaf_flag = 1;
          var game_flag = 1;

          var redi_flag = 1;
          var ctf_flag = 1;
          var fmldd_flag = 1;
          var fmlddsb106_flag = 1;

          var sevedd_flag = 1;
          var ffb_flag = 1;
          var sar_flag = 1;
          var vfp_flag = 1;

          function click_cdbg() {
              if ($('#cdbg').is(':checked')) {
                  cdbg_flag = 1;
              } else {
                  cdbg_flag = 0;
              }
              refreshdata();
          }

          function click_csbg() {
              if ($('#csbg').is(':checked')) {
                  csbg_flag = 1;
              } else {
                  csbg_flag = 0;
              }
              refreshdata();
          }

          function click_eiaf() {
              if ($('#eiaf').is(':checked')) {
                  eiaf_flag = 1;
              } else {
                  eiaf_flag = 0;
              }
              refreshdata();
          }

          function click_game() {
              if ($('#game').is(':checked')) {
                  game_flag = 1;
              } else {
                  game_flag = 0;
              }
              refreshdata();
          }

          function click_redi() {
              if ($('#redi').is(':checked')) {
                  redi_flag = 1;
              } else {
                  redi_flag = 0;
              }
              refreshdata();
          }

          function click_ctf() {
              if ($('#ctf').is(':checked')) {
                  ctf_flag = 1;
              } else {
                  ctf_flag = 0;
              }
              refreshdata();
          }

          function click_fmldd() {
              if ($('#fmldd').is(':checked')) {
                  fmldd_flag = 1;
              } else {
                  fmldd_flag = 0;
              }
              refreshdata();
          }

          function click_fmlddsb106() {
              if ($('#fmlddsb106').is(':checked')) {
                  fmlddsb106_flag = 1;
              } else {
                  fmlddsb106_flag = 0;
              }
              refreshdata();
          }

          function click_sevedd() {
              if ($('#sevedd').is(':checked')) {
                  sevedd_flag = 1;
              } else {
                  sevedd_flag = 0;
              }
              refreshdata();
          }

          function click_ffb() {
              if ($('#ffb').is(':checked')) {
                  ffb_flag = 1;
              } else {
                  ffb_flag = 0;
              }
              refreshdata();
          }

          function click_sar() {
              if ($('#sar').is(':checked')) {
                  sar_flag = 1;
              } else {
                  sar_flag = 0;
              }
              refreshdata();
          }

          function click_vfp() {
              if ($('#vfp').is(':checked')) {
                  vfp_flag = 1;
              } else {
                  vfp_flag = 0;
              }
              refreshdata();
          }

          var city_flag = 1;
          var county_flag = 1;
          var district_flag = 1;
          var other_flag = 1;

          function click_city() {
              if ($('#city').is(':checked')) {
                  city_flag = 1;
              } else {
                  city_flag = 0;
              }
              refreshdata();
          }

          function click_county() {
              if ($('#county').is(':checked')) {
                  county_flag = 1;
              } else {
                  county_flag = 0;
              }
              refreshdata();
          }

          function click_district() {
              if ($('#district').is(':checked')) {
                  district_flag = 1;
              } else {
                  district_flag = 0;
              }
              refreshdata();
          }

          function click_other() {
              if ($('#other').is(':checked')) {
                  other_flag = 1;
              } else {
                  other_flag = 0;
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



          /* jshint ignore:start */
          Number.prototype.formatMoney = function(c, d, t) {
              var n = this,
                  c = isNaN(c = Math.abs(c)) ? 2 : c,
                  d = d == undefined ? "." : d,
                  t = t == undefined ? "," : t,
                  s = n < 0 ? "-" : "",
                  i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                  j = (j = i.length) > 3 ? j % 3 : 0;
              return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
          };
          /* jshint ignore:end */


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

              function getcolor(program) {
                  //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG"];
                  if (program === "FML" || program === "CTF" || program === "SEV_DIST") {
                      return "green";
                  }
                  if (program === "CSBG" || program === "CDBG") {
                      return "blue";
                  }
                  if (program === "EIAF" || program === "GAME" || program === "REDI") {
                      return "red";
                  }
                  if (program === "VFP" || program === "SAR" || program === "FFB") {
                      return "purple";
                  }
                  return "black";
              }



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
                      return tooltip.html(d.govname + "<br />Program: " + d.program + "&nbsp;&nbsp;Date: " + d.dateofaward + "<br />" + d.projname + "<br />" + "Award: $" + (parseFloat(d.award)).formatMoney(0));
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
                          content: "data"
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


          var didit = 0;


          d3.csv("../CO_Grants_Data/grantpts.csv", function(data) {



              var stackchips = [];
              var v1 = data.map(function(d) {
                  var tv = d.lgid;
                  if (stackchips.hasOwnProperty(tv)) {
                      stackchips[tv]++;
                  } else {
                      stackchips[tv] = 0;
                  }
                  var rlat = (parseFloat(d.latitude) + (0.002 * stackchips[tv]));
                  var rlng = d.longitude;
                  d.latLng = [rlat, rlng];
                  d.id = valueize(d) + (0.000001 * stackchips[tv]);


                  if (didit < 5) {

                      console.log(stackchips[tv]);
                      console.log(d.id);
                      didit++;
                  }


                  return d;
              });


              var cities = v1.sort(function(a, b) {
                  if (a.id < b.id) {
                      return 1;
                  } else {
                      return -1;
                  }
              });

              csvdatacopy = cities;

              map.addLayer(citiesOverlay);

              refreshdata();
          }); //end d3.csv

          function refreshdata() {


              //["FML", "SEV_DIST", "VFP", "CTF", "SAR", "FFB", "EIAF", "GAME", "REDI", "CSBG", "CDBG", "DR"];
              //filter out by returning false
              //return true to keep
              var v1 = csvdatacopy.filter(function(d) {

                  //filter program
                  if (d.program === "FML" && fmldd_flag === 0) {
                      return false;
                  }
                  if (d.program === "SEV_DIST" && sevedd_flag === 0) {
                      return false;
                  }
                  if (d.program === "VFP" && vfp_flag === 0) {
                      return false;
                  }
                  if (d.program === "CTF" && ctf_flag === 0) {
                      return false;
                  }

                  if (d.program === "SAR" && sar_flag === 0) {
                      return false;
                  }
                  if (d.program === "FFB" && ffb_flag === 0) {
                      return false;
                  }
                  if (d.program === "EIAF" && eiaf_flag === 0) {
                      return false;
                  }
                  if (d.program === "GAME" && game_flag === 0) {
                      return false;
                  }

                  if (d.program === "REDI" && redi_flag === 0) {
                      return false;
                  }
                  if (d.program === "CSBG" && csbg_flag === 0) {
                      return false;
                  }
                  if (d.program === "CDBG" && cdbg_flag === 0) {
                      return false;
                  }
                  if (d.program === "FMLDDSB106" && fmlddsb106_flag === 0) {
                      return false;
                  }

                  //filter geo
                  if ((d.lgtype === "2" || d.lgtype === "3" || d.lgtype === "4" || d.lgtype === "5") && city_flag === 0) {
                      return false;
                  }
                  if ((d.lgtype === "1" || d.lgtype === "61" || d.lgtype === "70") && county_flag === 0) {
                      return false;
                  }
                  if ((d.lgtype !== "1" && d.lgtype !== "2" && d.lgtype !== "3" && d.lgtype !== "4" && d.lgtype !== "5" && d.lgtype !== "61" && d.lgtype !== "70" && d.lgtype !== "100") && district_flag === 0) {
                      return false;
                  }
                  if ((d.lgtype === "100") && other_flag === 0) {
                      return false;
                  }

                  //filter date
                  if ((new Date(((d.dateofaward).split("-"))[0] + " " + ((d.dateofaward).split("-"))[1] + " 20" + ((d.dateofaward).split("-"))[2])) < mindate || (new Date(((d.dateofaward).split("-"))[0] + " " + ((d.dateofaward).split("-"))[1] + " 20" + ((d.dateofaward).split("-"))[2])) > maxdate) {
                      return false;
                  }

                  return true;
              });


              var stackchips = [];
              cities = v1.map(function(d) {
                  var tv = d.lgid;
                  if (stackchips.hasOwnProperty(tv)) {
                      stackchips[tv]++;
                  } else {
                      stackchips[tv] = 0;
                  }
                  var rlat = (parseFloat(d.latitude) + (0.002 * stackchips[tv]));
                  var rlng = d.longitude;
                  d.latLng = [rlat, rlng];
                  d.id = valueize(d) + (0.000001 * stackchips[tv]);


                  return d;
              });

              map.fireEvent('zoomend', {}); //lol, hack to refresh

          }




      }); //end $ document
  }()); //end module
