"use strict";


var map;

var sumtotal; //geojson

function popopen(table) {
    console.log('popopen()');
    map.openModal({
        content: table.replace(/\?/g, "'")
    });
}

    $(document).ready(function() {





$.ajax({
    type: "GET",
    url: "../CO_FS_Data_PHP/sumtotal.geojson",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(jdata) {
        sumtotal = jdata;
      init();
    },
    error: function(xhr, textStatus, errorThrown) {
        console.log(xhr.responseText);
    }
});
      


function init() {





        var i6 = [8, 20];
        var i7 = [10, 25];
        var i8 = [12, 30];
        var i9 = [16, 40];
        var i10 = [20, 50];
        var i11 = [24, 60];
        var i12 = [28, 70];

        var mindate = new Date("Thu Jan 01 2014 00:00:00 GMT-0700");
        var maxdate = new Date("Thu Jan 01 2016 00:00:00 GMT-0700");


        //modern browser
        var city_federal = L.geoJson(null, {});
        var county_federal = L.geoJson(null, {});
        var district_federal = L.geoJson(null, {});
var other_federal = L.geoJson(null, {});
        var city_state = L.geoJson(null, {});
        var county_state = L.geoJson(null, {});
        var district_state = L.geoJson(null, {});
var other_state = L.geoJson(null, {});  
        var city_formula = L.geoJson(null, {});
        var county_formula = L.geoJson(null, {});
        var district_formula = L.geoJson(null, {});
var other_formula = L.geoJson(null, {});  
        var city_special = L.geoJson(null, {});
        var county_special = L.geoJson(null, {});
        var district_special = L.geoJson(null, {});
var other_special = L.geoJson(null, {});

        var city_flag = 1,
            county_flag = 1,
            district_flag = 1,
other_flag = 1,
            federal_flag = 1,
            state_flag = 1,
            formula_flag = 1,
            special_flag = 1;

        var mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
            mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';



        var grayscale = L.tileLayer(mbUrl, {
            id: 'mapbox.light',
            attribution: mbAttr
        });
        var streets = L.tileLayer(mbUrl, {
            id: 'mapbox.streets',
            attribution: mbAttr
        });
        var classic = L.tileLayer(mbUrl, {
            id: 'mapbox.streets-basic',
            attribution: mbAttr
        });
        var emerald = L.tileLayer(mbUrl, {
            id: 'mapbox.emerald',
            attribution: mbAttr
        });

        var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
            maxZoom: 19,
            subdomains: ["otile1", "otile2", "otile3", "otile4"],
            attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
        });

  
  
        map = L.map('map', {
            center: [39, -105.5],
            zoom: 7,
            minZoom: 6,
            maxZoom: 12,
            layers: [emerald],
            zoomControl: false
        });


        var southWest = L.latLng(36.987965, -109.065964),
            northEast = L.latLng(41.007374, -102.042814),
            llbounds = L.latLngBounds(southWest, northEast);

        //MAPZEN GEOCODER  
        var options = {
            bounds: llbounds,
            position: 'topright',
            expanded: true,
            markers: false,
            autocomplete: false,
            layers: 'coarse'
        }

        L.control.geocoder('search-YawpV0M', options).addTo(map);



        //trick add zoom control on right
        L.control.zoom({
            position: 'topright'
        }).addTo(map);


        map.on('zoomend', function() {
            refreshdata();
        });

        var oms = new OverlappingMarkerSpiderfier(map, {
            keepSpiderfied: true
        });


  
        var popup = new L.Popup();
        oms.addListener('click', function(marker) {
            popup.setContent(marker.desc);
            popup.setLatLng(marker.getLatLng());
            map.openPopup(popup);

        });

        oms.addListener('spiderfy', function(markers) {
            map.closePopup();
        });


        L.easyButton('fa-question', function(btn, map) {

            map.openModal({
                content: '<h4>Abbreviations</h4><table><tr><td><span class="ttext">CDBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants</a></span></td></tr><tr><td><span class="ttext">CSBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-services-block-grant-csbg" class="blue" target="_blank" >Community Services Block Grants</a></span></td></tr><tr><td><span class="ttext">CTF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/conservation-trust-fund-ctf" class="blue" target="_blank" >Conservation Trust Fund</a></span></td></tr><tr><td><span class="ttext">EIAF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/energymineral-impact-assistance-fund-eiaf" class="blue" target="_blank" >Energy/Mineral Impact Assistance Fund</a></span></td></tr><tr><td><span class="ttext">FFB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/firefighter-cardiac-benefit-program" class="blue" target="_blank" >Firefighter Cardiac Benefit Program</a></span></td></tr><tr><td><span class="ttext">FMLDD:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Federal Mineral Lease Direct Distribution</a></span></td></tr><tr><td><span class="ttext">FMLDDSB106:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://drive.google.com/open?id=0B6P5TF4k2v8qVG1WRUVObDVBdkk&authuser=0" class="blue" target="_blank" >Federal Mineral Lease Supplemental Distribution</a></span></td></tr><tr><td><span class="ttext">GAME:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/limited-gaming-impact-program" class="blue" target="_blank" >Limited Gaming Impact Program</a></span></td></tr><tr><td><span class="ttext">REDI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="http://www.advancecolorado.com/blueprint/regional-partners/rural-economic-development-initiative-redi-grant-program-0" class="blue" target="_blank" >Rural Economic Development Initiative</a></span></td></tr><tr><td><span class="ttext">SAR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/search-and-rescue-fund" class="blue" target="_blank" >Search and Rescue</a></span></td></tr><tr><td><span class="ttext">SEVEDD:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Severance Direct Distribution</a></span></td></tr><tr><td><span class="ttext">VFP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/volunteer-firefighter-pension-fund-vfp" class="blue" target="_blank" >Volunteer Firefighter Pension Fund</a></span></td></tr></table><br /><h4>Development</h4><p><a target ="_blank" href="https://jqueryui.com/">JQuery UI</a>, <a target ="_blank" href="http://leafletjs.com/">Leaflet</a>, <a target ="_blank" href="http://fortawesome.github.io/Font-Awesome/">Font-Awesome</a>, <a target ="_blank" href="https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet">Overlapping Marker Spiderfier</a>, <a target ="_blank" href="https://github.com/jseppi/Leaflet.MakiMarkers">Maki Markers</a>, <a target ="_blank" href="https://github.com/Leaflet/Leaflet.label">Leaflet Label</a>, <a target ="_blank" href="https://github.com/CliffCloud/Leaflet.EasyButton">Leaflet Easy Button</a>, <a target ="_blank" href="https://github.com/w8r/Leaflet.Modal">Leaflet Modal</a>, <a target ="_blank" href="http://ghusse.github.io/jQRangeSlider/index.html">JQRangeSlider</a>, <a target ="_blank" href="http://www.menucool.com/tooltip/css-tooltip">CSS Tooltip</a>, <a target ="_blank" href="https://github.com/pelias/leaflet-geocoder">Mapzen Pelias Leaflet-Geocoder</a> </p>'
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
                layer.bindPopup("County: " + feature.properties.cnty + "<br />" + "Score: " + feature.properties.score);
            }
        }

          function county_onEachFeature(feature, layer) {
            if (feature.properties && feature.properties.NAMELSAD) {
                layer.bindPopup(feature.properties.NAMELSAD);
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
            style: function(feature) {
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
            style: function(feature) {
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
            url: "data/score.geojson",
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

        bband.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'lnk');
            div.innerHTML = '<a href="http://dola.colorado.gov/gis-cms/content/interactive-broadband-map">Colorado Broadband Grant Map</a>';
            return div;
        };

        bband.addTo(map);
  
        // create the control
        var sliderctrl = L.control({
            position: 'bottomleft'
        });
        sliderctrl.onAdd = function(map) {
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

        title.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'title');
            div.innerHTML = '<h2>Colorado Financial Assistance</h2>';
            return div;
        };

        title.addTo(map);



        //Custom Layer Control
        var command = L.control({
            position: 'topleft'
        });

        command.onAdd = function(map) {
            var div = L.DomUtil.create('div', 'command');

            div.innerHTML = '<form><h4>Programs</h4>' +

                    '<input class="leg" id="federal" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/blue_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Federal<br />' +
                    '<input class="leg" id="state" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/red_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;State<br />' +
                    '<input class="leg" id="formula" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/green_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Formula<br />' +

                    '<input class="leg" id="special" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/purple_sm.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Special<br />' +


                    '<h4>Organization Type</h4>' + 
              
              '<input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/triangle_sm.svg" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;City<br />'+
              '<input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/star_sm.svg" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;County<br />'+
              '<input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/marker_sm.svg" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;District<br />'+
              '<input class="leg" id="other" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<img src="css/images/circle_sm.svg" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Other</form>';
            


            return div;
        };


        command.addTo(map);


        $("#slider").dateRangeSlider({
            bounds: {
                min: new Date("Thu Jan 01 2012 00:00:00 GMT-0700"),
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


        function click_federal() {
            console.log('click federal');
            if ($('#federal').is(':checked')) {
                federal_flag = 1;
            } else {
                federal_flag = 0;
            }
            refreshdata();
        }

        function click_state() {
            console.log('click state');
            if ($('#state').is(':checked')) {
                state_flag = 1;
            } else {
                state_flag = 0;
            }
            refreshdata();
        }

        function click_formula() {
            console.log('click formula');
            if ($('#formula').is(':checked')) {
                formula_flag = 1;
            } else {
                formula_flag = 0;
            }
            refreshdata();
        }

        function click_special() {
            console.log('click special');
            if ($('#special').is(':checked')) {
                special_flag = 1;
            } else {
                special_flag = 0;
            }
            refreshdata();
        }

        function click_city() {
            console.log('click city');
            if ($('#city').is(':checked')) {
                city_flag = 1;
            } else {
                city_flag = 0;
            }
            refreshdata();
        }

        function click_county() {
            console.log('click county');
            if ($('#county').is(':checked')) {
                county_flag = 1;
            } else {
                county_flag = 0;
            }
            refreshdata();
        }

        function click_district() {
            console.log('click district');
            if ($('#district').is(':checked')) {
                district_flag = 1;
            } else {
                district_flag = 0;
            }
            refreshdata();
        }

        function click_other() {
            console.log('click other');
            if ($('#other').is(':checked')) {
                other_flag = 1;
            } else {
                other_flag = 0;
            }
            refreshdata();
        }

            document.getElementById("federal").addEventListener("click", click_federal, false);
            document.getElementById("state").addEventListener("click", click_state, false);
            document.getElementById("formula").addEventListener("click", click_formula, false);
            document.getElementById("special").addEventListener("click", click_special, false);
            document.getElementById("city").addEventListener("click", click_city, false);
            document.getElementById("county").addEventListener("click", click_county, false);
            document.getElementById("district").addEventListener("click", click_district, false);
            document.getElementById("other").addEventListener("click", click_other, false);


        //convert number to money format        
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

        function refreshdata() {

            console.log('refreshdata()');
            //geojsonLayer


            var start = +new Date(); // log start timestamp



                map.removeLayer(city_federal);
                map.removeLayer(county_federal);
                map.removeLayer(district_federal);
                map.removeLayer(other_federal);
          
                map.removeLayer(city_state);
                map.removeLayer(county_state);
                map.removeLayer(district_state);
                map.removeLayer(other_state);
          
                map.removeLayer(city_formula);
                map.removeLayer(county_formula);
                map.removeLayer(district_formula);
                map.removeLayer(other_formula);
          
                map.removeLayer(city_special);
                map.removeLayer(county_special);
                map.removeLayer(district_special);
                map.removeLayer(other_special);

          
            var end = +new Date(); // log end timestamp
            var diff = end - start;

            console.log("remove:" + diff);

            var start = +new Date(); // log start timestamp


            //universal point to layer function
            function ptl(feature, latlng, color, type) {
              
              var icstyle;
              
              if(type=="district"){icstyle="marker";}
              if(type=="city"){icstyle="triangle";}
              if(type=="county"){icstyle="star";}
              if(type=="other"){icstyle="circle";}
              
                var zl = map.getZoom();
                var icon;

                if (zl === 6) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i6;
                }
                if (zl === 7) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i7;
                }
                if (zl === 8) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i8;
                }
                if (zl === 9) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i9;
                }
                if (zl === 10) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i10;
                }
                if (zl === 11) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i11;
                }
                if (zl === 12) {
                    icon = L.MakiMarkers.icon({
                        icon: null,
                        color: color,
                        size: "s",
                        icon: icstyle
                    });
                    icon.options.iconSize = i12;
                }


                var marker = new L.Marker(latlng, {
                    icon: icon,
                    riseOnHover: true
                }).bindLabel('<span style="color:' + color + '">' + feature.properties.govname + '</span>');
                oms.addMarker(marker);
                return marker;
            }


            function filterfeatures(feature, layer, inclusive, geofilter, programfilter) {
                var i;
                var j;


                //quick filter by geography
                var validcapture = 0;

                for (i = 0; i < geofilter.length; i = i + 1) {
                    if (feature.properties.lgtype === geofilter[i]) {
                        validcapture = validcapture + 1;
                    }
                }

                //inclusive or exclusive.  true for inclusive, false for exclusive
                //applies to geofilter.  inclusive is only those lgtypeids, exclusive is everything except those lgtypeids
                if (inclusive) {
                    if (validcapture > 0) {
                        //valid: continue
                    } else {
                        return false;
                    }
                } else {
                    if (validcapture > 0) {
                        return false;
                    } else {
                        //valid continue
                    }
                }


                //quick filter out if no projects

                if ((((feature.properties.projects.federal.cdbg).length) + ((feature.properties.projects.federal.csbg).length) + ((feature.properties.projects.state.eiaf).length) + ((feature.properties.projects.state.game).length) + ((feature.properties.projects.state.redi).length) + ((feature.properties.projects.formula.ctf).length) + ((feature.properties.projects.formula.fmldd).length) + ((feature.properties.projects.formula.fmlddsb106).length) + ((feature.properties.projects.formula.sevedd).length) + ((feature.properties.projects.special.ffb).length) + ((feature.properties.projects.special.sar).length) + ((feature.properties.projects.special.vfp).length)) === 0) {
                    return false;
                }



                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 1) {
                        if (((feature.properties.projects.federal.cdbg).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.federal.cdbg).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.federal.csbg).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.federal.csbg).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 2) {
                        if (((feature.properties.projects.state.eiaf).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.state.eiaf).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.state.game).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.state.game).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.state.game[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.game[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.state.redi).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.state.redi).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.state.redi[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.redi[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                    }
                }


                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 3) {
                        if (((feature.properties.projects.formula.ctf).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.formula.ctf).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.formula.fmldd).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.formula.fmldd).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.formula.fmlddsb106).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.formula.fmlddsb106).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.formula.sevedd).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.formula.sevedd).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                    }
                }



                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 4) {
                        if (((feature.properties.projects.special.ffb).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.special.ffb).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.special.sar).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.special.sar).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.special.sar[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.sar[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                        if (((feature.properties.projects.special.vfp).length) > 0) {
                            for (i = 0; i < ((feature.properties.projects.special.vfp).length); i = i + 1) {
                                if ((new Date(((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[2])) < maxdate) {
                                    return true;
                                }
                            }
                        }
                    }
                }

                return false;
            }


            function onEach(feature, layer, programfilter, prefix) {
                var i;
                var j;

                var dateofproj;
                var datearray;

                var csbg_temptotal = 0;
                var cdbg_temptotal = 0;
                var csbg_class = false;
                var cdbg_class = false;

                var eiaf_temptotal = 0;
                var game_temptotal = 0;
                var redi_temptotal = 0;
                var eiaf_class = false;
                var game_class = false;
                var redi_class = false;

                var ctf_temptotal = 0;
                var fmldd_temptotal = 0;
                var fmlddsb106_temptotal = 0;
                var sevedd_temptotal = 0;
                var ctf_class = false;
                var fmldd_class = false;
                var fmlddsb106_class = false;
                var sevedd_class = false;

                var ffb_temptotal = 0;
                var sar_temptotal = 0;
                var vfp_temptotal = 0;
                var ffb_class = false;
                var sar_class = false;
                var vfp_class = false;

                var vfptemptable = '';
                var sartemptable = '';
                var ffbtemptable = '';
                var seveddtemptable = '';
                var fmlddsb106temptable = '';
                var fmlddtemptable = '';
                var ctftemptable = '';
                var reditemptable = '';
                var gametemptable = '';
                var eiaftemptable = '';
                var cdbgtemptable = '';
                var csbgtemptable = '';



                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 1) {
                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[2])) < maxdate) {
                                csbg_class = 'btn';
                                csbg_temptotal = csbg_temptotal + Number(feature.properties.projects.federal.csbg[i].award || 0);
                                csbgtemptable = csbgtemptable + "<tr><td>" + feature.properties.projects.federal.csbg[i].projname + "</td><td>" + feature.properties.projects.federal.csbg[i].served + "</td><td>" + feature.properties.projects.federal.csbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.csbg[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[2])) < maxdate) {
                                cdbg_class = 'btn';
                                cdbg_temptotal = cdbg_temptotal + Number(feature.properties.projects.federal.cdbg[i].award || 0);
                                cdbgtemptable = cdbgtemptable + "<tr><td>" + feature.properties.projects.federal.cdbg[i].projname + "</td><td>" + feature.properties.projects.federal.cdbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.federal.cdbg[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                    }
                }


                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 2) {
                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[2])) < maxdate) {
                                eiaf_class = 'btn';
                                eiaf_temptotal = eiaf_temptotal + Number(feature.properties.projects.state.eiaf[i].award || 0);
                                eiaftemptable = eiaftemptable + "<tr><td>" + feature.properties.projects.state.eiaf[i].projname + "</td><td>" + feature.properties.projects.state.eiaf[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.eiaf[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.state.game[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.game[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[2])) < maxdate) {
                                game_class = 'btn';
                                game_temptotal = game_temptotal + Number(feature.properties.projects.state.game[i].award || 0);
                                gametemptable = gametemptable + "<tr><td>" + feature.properties.projects.state.game[i].projname + "</td><td>" + feature.properties.projects.state.game[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.state.game[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.game[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.state.game[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.state.redi[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.state.redi[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[2])) < maxdate) {
                                redi_class = 'btn';
                                redi_temptotal = redi_temptotal + Number(feature.properties.projects.state.redi[i].award || 0);
                                reditemptable = reditemptable + "<tr><td>" + feature.properties.projects.state.redi[i].projname + "</td><td>" + feature.properties.projects.state.redi[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.state.redi[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.state.redi[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                    }
                }

                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 3) {
                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[2])) < maxdate) {
                                ctf_class = 'btn';
                                ctf_temptotal = ctf_temptotal + Number(feature.properties.projects.formula.ctf[i].award || 0);
                                ctftemptable = ctftemptable + "<tr><td>" + feature.properties.projects.formula.ctf[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.ctf[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[2])) < maxdate) {
                                fmldd_class = 'btn';
                                fmldd_temptotal = fmldd_temptotal + Number(feature.properties.projects.formula.fmldd[i].award || 0);
                                fmlddtemptable = fmlddtemptable + "<tr><td>" + feature.properties.projects.formula.fmldd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmldd[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[2])) < maxdate) {
                                fmlddsb106_class = 'btn';
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(feature.properties.projects.formula.fmlddsb106[i].award || 0);
                                fmlddsb106temptable = fmlddsb106temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[2])) < maxdate) {
                                sevedd_class = 'btn';
                                sevedd_temptotal = sevedd_temptotal + Number(feature.properties.projects.formula.sevedd[i].award || 0);
                                seveddtemptable = seveddtemptable + "<tr><td>" + feature.properties.projects.formula.sevedd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.formula.sevedd[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                    }
                }


                for (j = 0; j < programfilter.length; j = j + 1) {
                    if (programfilter[j] === 4) {
                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[2])) < maxdate) {
                                ffb_class = 'btn';
                                ffb_temptotal = ffb_temptotal + Number(feature.properties.projects.special.ffb[i].award || 0);
                                ffbtemptable = ffbtemptable + "<tr><td>" + feature.properties.projects.special.ffb[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.ffb[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.special.sar[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.sar[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[2])) < maxdate) {
                                sar_class = 'btn';
                                sar_temptotal = sar_temptotal + Number(feature.properties.projects.special.sar[i].award || 0);
                                sartemptable = sartemptable + "<tr><td>" + feature.properties.projects.special.sar[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.special.sar[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.sar[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            if ((new Date(((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[2])) > mindate && (new Date(((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[2])) < maxdate) {
                                vfp_class = 'btn';
                                vfp_temptotal = vfp_temptotal + Number(feature.properties.projects.special.vfp[i].award || 0);
                                vfptemptable = vfptemptable + "<tr><td>" + feature.properties.projects.special.vfp[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", (new Date(((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[0] + " " + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[1] + " 20" + ((feature.properties.projects.special.vfp[i].dateofaward).split("-"))[2]))) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                    }
                }


                var programstring = "";


                if (csbg_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th align='center'>Service Area</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + csbgtemptable + "</table>").replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th align='center'>Service Area</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + csbgtemptable + "</table>") + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                }


                if (cdbg_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + cdbgtemptable + "</table>").replace(/'/g, "?") + '\');"  class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + cdbgtemptable + "</table>") + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                }


                if (eiaf_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + eiaftemptable + "</table>").replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + eiaftemptable + "</table>") + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                }


                if (game_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + gametemptable + "</table>").replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + gametemptable + "</table>") + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                }


                if (redi_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + reditemptable + "</table>").replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + reditemptable + "</table>") + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                }


                if (ctf_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ctftemptable + "</table>").replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ctftemptable + "</table>") + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                }


                if (fmldd_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddtemptable + "</table>").replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddtemptable + "</table>") + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                }


                if (fmlddsb106_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddsb106temptable + "</table>").replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddsb106temptable + "</table>") + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                }


                if (sevedd_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + seveddtemptable + "</table>").replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + seveddtemptable + "</table>") + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                }


                if (ffb_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ffbtemptable + "</table>").replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ffbtemptable + "</table>") + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                }


                if (sar_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + sartemptable + "</table>").replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + sartemptable + "</table>") + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                }


                if (vfp_class) {
                    programstring = programstring + '<a href="#" onclick="popopen(\'' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + vfptemptable + "</table>").replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + ("<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + vfptemptable + "</table>") + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                }


                var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                    "<i>" + prefix + "Awards<br />" +
                    $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                    programstring;

                layer.desc = popuphtml;
                // layer.bindPopup(popuphtml);
            }



                city_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["2", "3", "4", "5"], [1]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#0000FF", "city");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [1], "Federal ");
                    }
                });

                county_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["1", "61", "70"], [1]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#0000FF", "county");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [1], "Federal ");
                    }
                });


                district_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, false, ["1", "2", "3", "4", "5", "61", "70", "100"], [1]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#0000FF", "district");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [1], "Federal ");
                    }
                });

                other_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["100"], [1]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#0000FF", "other");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [1], "Federal ");
                    }
                });


                //geojsonLayer
                city_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["2", "3", "4", "5"], [2]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#FF0000", "city");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [2], "State ");
                    }
                });

                county_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["1", "61", "70"], [2]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#FF0000", "county");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [2], "State ");
                    }
                });


                district_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, false, ["1", "2", "3", "4", "5", "61", "70", "100"], [2]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#FF0000", "district");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [2], "State ");
                    }
                });
 
                other_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["100"], [2]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#FF0000", "other");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [2], "State ");
                    }
                });         

          
                //geojsonLayer
                city_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["2", "3", "4", "5"], [3]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#008000", "city");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [3], "Formula ");
                    }
                });

                county_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["1", "61", "70"], [3]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#008000", "county");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [3], "Formula ");
                    }
                });

                district_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, false, ["1", "2", "3", "4", "5", "61", "70", "100"], [3]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#008000", "district");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [3], "Formula ");
                    }
                });

                other_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["100"], [3]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#008000", "other");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [3], "Formula ");
                    }
                });
          
          
                //geojsonLayer
                city_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["2", "3", "4", "5"], [4]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#800080", "city");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [4], "Special ");
                    }
                });

                county_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["1", "61", "70"], [4]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#800080", "county");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [4], "Special ");
                    }
                });


                district_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, false, ["1", "2", "3", "4", "5", "61", "70", "100"], [4]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#800080", "district");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [4], "Special ");
                    }
                });

                other_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {
                        return filterfeatures(feature, layer, true, ["100"], [4]);
                    },
                    pointToLayer: function(feature, latlng) {
                        return ptl(feature, latlng, "#800080", "other");
                    },
                    onEachFeature: function(feature, layer) {
                        onEach(feature, layer, [4], "Special ");
                    }
                });


            var end = +new Date(); // log end timestamp
            var diff = end - start;

            console.log("build:" + diff);


            var start = +new Date(); // log start timestamp

          
                if (city_flag === 1 && formula_flag === 1) {
                    map.addLayer(city_formula);
                }
                if (county_flag === 1 && formula_flag === 1) {
                    map.addLayer(county_formula);
                }
                if (district_flag === 1 && formula_flag === 1) {
                    map.addLayer(district_formula);
                }
                if (other_flag === 1 && formula_flag === 1) {
                    map.addLayer(other_formula);
                }
          
                if (city_flag === 1 && special_flag === 1) {
                    map.addLayer(city_special);
                }
                if (county_flag === 1 && special_flag === 1) {
                    map.addLayer(county_special);
                }
                if (district_flag === 1 && special_flag === 1) {
                    map.addLayer(district_special);
                }
                if (other_flag === 1 && special_flag === 1) {
                    map.addLayer(other_special);
                }

                if (city_flag === 1 && state_flag === 1) {
                    map.addLayer(city_state);
                }
                if (county_flag === 1 && state_flag === 1) {
                    map.addLayer(county_state);
                }
                if (district_flag === 1 && state_flag === 1) {
                    map.addLayer(district_state);
                }
                if (other_flag === 1 && state_flag === 1) {
                    map.addLayer(other_state);
                }
          
                if (city_flag === 1 && federal_flag === 1) {
                    map.addLayer(city_federal);
                }
                if (county_flag === 1 && federal_flag === 1) {
                    map.addLayer(county_federal);
                }
                if (district_flag === 1 && federal_flag === 1) {
                    map.addLayer(district_federal);
                }
                if (other_flag === 1 && federal_flag === 1) {
                    map.addLayer(other_federal);
                }


            var end = +new Date(); // log end timestamp
            var diff = end - start;

            console.log("render:" + diff);

        };

        refreshdata();


} //end init
      
      
      
    });