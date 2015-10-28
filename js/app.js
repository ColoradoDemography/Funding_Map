//browser check
var minimal = false;
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}


function devicecheck() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

console.log('devicecheck: ' + devicecheck());

console.log('IE ' + detectIE());

if (detectIE() || devicecheck()) {
    minimal = true;
    console.log('you are on IE or Mobile.');

}


var map;

var sumtotal; //geojson



function popopen(table) {
    console.log('popopen()');
    map.openModal({
        content: table.replace(/\?/g, "'")
    });
}


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


    $(document).ready(function() {

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
        var city_state = L.geoJson(null, {});
        var county_state = L.geoJson(null, {});
        var district_state = L.geoJson(null, {});
        var city_formula = L.geoJson(null, {});
        var county_formula = L.geoJson(null, {});
        var district_formula = L.geoJson(null, {});
        var city_special = L.geoJson(null, {});
        var county_special = L.geoJson(null, {});
        var district_special = L.geoJson(null, {});

        //ie & mobile only
        var city = L.geoJson(null, {});
        var county = L.geoJson(null, {});
        var district = L.geoJson(null, {});

        var city_flag = 1,
            county_flag = 1,
            district_flag = 1,
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
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.FieldReg_N) {
                layer.bindPopup(feature.properties.FieldReg_N + " Region");
            }
        }

        function plan_onEachFeature(feature, layer) {
            // does this feature have a property named popupContent?
            if (feature.properties && feature.properties.PlanRgn) {
                layer.bindPopup("Region " + feature.properties.PlanRgn);
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



        var overlays = {
            "Field Regions": field,
            "Planning Regions": plan
        };


        var basemaps = {
            "Mapbox Emerald": emerald,
            "Mapquest": mapquestOSM,
            "Mapbox Streets": classic

        };

        L.control.layers(basemaps, overlays).addTo(map);

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

            if (minimal) {
                div.innerHTML = '<h4>Government Type</h4><input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;City<br /><input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;County<br /><input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;District</form>';

            } else {
                div.innerHTML = '<form><h4>Programs</h4>' +

                    '<input class="leg" id="federal" type="checkbox" checked />&nbsp;&nbsp;<img src="css/images/blue_sm.png" style="position: relative; top: 2px;" /><a href="#" class="btn" onclick="popopen(\'<table><tr><td>CDBG:</td><td>&nbsp;&nbsp;Community Development Block Grants</span></td></tr><tr><td>CSBG:</td><td>&nbsp;&nbsp;Community Services Block Grants</td></tr></table>\')">&nbsp;&nbsp;Federal<span ><img class="callout" src="cssttp/callout.gif" /><table><tr><td>CDBG:</td><td>&nbsp;&nbsp;Community Development Block Grants</td></tr><tr><td>CSBG:</td><td>&nbsp;&nbsp;Community Services Block Grants</td></tr></table></span></a><br />' +
                    '<input class="leg" id="state" type="checkbox" checked />&nbsp;&nbsp;<img src="css/images/red_sm.png" style="position: relative; top: 2px;" /><a href="#" class="btn" onclick="popopen(\'<table><tr><td>EIAF:</td><td>&nbsp;&nbsp;Energy/Mineral Impact Assistance Fund</td></tr><tr><td>GAME:</td><td>&nbsp;&nbsp;Limited Gaming Impact Program</td></tr><tr><td>REDI:</td><td>&nbsp;&nbsp;Rural Economic Development Initiative</td></tr></table>\')">&nbsp;&nbsp;State<span ><img class="callout" src="cssttp/callout.gif" /><table><tr><td>EIAF:</td><td>&nbsp;&nbsp;Energy/Mineral Impact Assistance Fund</td></tr><tr><td>GAME:</td><td>&nbsp;&nbsp;Limited Gaming Impact Program</td></tr><tr><td>REDI:</td><td>&nbsp;&nbsp;Rural Economic Development Initiative</td></tr></table></span></a><br />' +
                    '<input class="leg" id="formula" type="checkbox" checked />&nbsp;&nbsp;<img src="css/images/green_sm.png" style="position: relative; top: 2px;" /><a href="#" class="btn" onclick="popopen(\'<table><tr><td>CTF:</td><td>&nbsp;&nbsp;Conservation Trust Fund</td></tr><tr><td>SEVEDD:</td><td>&nbsp;&nbsp;Severance Direct Distribution</td></tr><tr><td>FMLDD:</td><td>&nbsp;&nbsp;Federal Mineral Lease Direct Distribution</td></tr><tr><td>FMLDDSB106:</td><td>&nbsp;&nbsp;Federal Mineral Lease Supplemental Distribution</td></tr></table>\')">&nbsp;&nbsp;Formula<span ><img class="callout" src="cssttp/callout.gif" /><table><tr><td>CTF:</td><td>&nbsp;&nbsp;Conservation Trust Fund</td></tr><tr><td>SEVEDD:</td><td>&nbsp;&nbsp;Severance Direct Distribution</td></tr><tr><td>FMLDD:</td><td>&nbsp;&nbsp;Federal Mineral Lease Direct Distribution</td></tr><tr><td>FMLDDSB106:</td><td>&nbsp;&nbsp;Federal Mineral Lease Supplemental Distribution</td></tr></table></span></a><br />' +

                    '<input class="leg" id="special" type="checkbox" checked />&nbsp;&nbsp;<img src="css/images/purple_sm.png" style="position: relative; top: 2px;" /><a href="#" class="btn" onclick="popopen(\'<table><tr><td>FFB:</td><td>&nbsp;&nbsp;Firefighter Cardiac Benefit Program</td></tr><tr><td>SAR:</td><td>&nbsp;&nbsp;Search and Rescue</td></tr><tr><td>VFP:</td><td>&nbsp;&nbsp;Volunteer Firefighter Pension Fund</td></tr></table>\')">&nbsp;&nbsp;Special<span ><img class="callout" src="cssttp/callout.gif" /><table><tr><td>FFB:</td><td>&nbsp;&nbsp;Firefighter Cardiac Benefit Program</td></tr><tr><td>SAR:</td><td>&nbsp;&nbsp;Search and Rescue</td></tr><tr><td>VFP:</td><td>&nbsp;&nbsp;Volunteer Firefighter Pension Fund</td></tr></table></span></a><br />' +


                    '<h4>Government Type</h4><input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;City<br /><input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;County<br /><input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;District</form>';
            }


            return div;
        };


        command.addTo(map);


        $("#slider").dateRangeSlider({
            bounds: {
                min: new Date("Thu Jan 01 2010 00:00:00 GMT-0700"),
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

        if (minimal) {
            document.getElementById("city").addEventListener("click", click_city, false);
            document.getElementById("county").addEventListener("click", click_county, false);
            document.getElementById("district").addEventListener("click", click_district, false);
        } else {
            document.getElementById("federal").addEventListener("click", click_federal, false);
            document.getElementById("state").addEventListener("click", click_state, false);
            document.getElementById("formula").addEventListener("click", click_formula, false);
            document.getElementById("special").addEventListener("click", click_special, false);
            document.getElementById("city").addEventListener("click", click_city, false);
            document.getElementById("county").addEventListener("click", click_county, false);
            document.getElementById("district").addEventListener("click", click_district, false);
        }


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
          
            if (minimal) {

                map.removeLayer(district);
                map.removeLayer(city);
                map.removeLayer(county);

            } else {

                map.removeLayer(city_federal);
                map.removeLayer(county_federal);
                map.removeLayer(district_federal);

                map.removeLayer(city_state);
                map.removeLayer(county_state);
                map.removeLayer(district_state);

                map.removeLayer(city_formula);
                map.removeLayer(county_formula);
                map.removeLayer(district_formula);

                map.removeLayer(city_special);
                map.removeLayer(county_special);
                map.removeLayer(district_special);
            }

                var end = +new Date(); // log end timestamp
                var diff = end - start;

                console.log("remove:" + diff);
          
                var start = +new Date(); // log start timestamp

            if (minimal) {
                //only 3 layers for IE & mobile


                city = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter by geography
                        if (feature.properties.lgtype === "2" || feature.properties.lgtype === "3" || feature.properties.lgtype === "4" || feature.properties.lgtype === "5") {
                            //valid: continue
                        } else {
                            return false;
                        }

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;

                        if ((cdbgexist + csbgexist + eiafexist + gameexist + rediexist + ctfexist + fmlddexist + fmlddsb106exist + sevedd + ffbexist + sarexist + vfpexist) === 0) {
                            return false;
                        }
                        //console.log('still here');
                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }


                        return true;

                    },
                    pointToLayer: function(feature, latlng) {

                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#984ea3",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:#984ea3">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var datearray;

                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;
                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';
                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;
                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';
                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;
                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';
                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

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


                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                csbg_class = 'btn';
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                                csbgtemptable = csbgtemptable + "<tr><td>" + feature.properties.projects.federal.csbg[i].projname + "</td><td>" + feature.properties.projects.federal.csbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                cdbg_class = 'btn';
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                                cdbgtemptable = cdbgtemptable + "<tr><td>" + feature.properties.projects.federal.cdbg[i].projname + "</td><td>" + feature.properties.projects.federal.cdbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                eiaf_class = 'btn';
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                                eiaftemptable = eiaftemptable + "<tr><td>" + feature.properties.projects.state.eiaf[i].projname + "</td><td>" + feature.properties.projects.state.eiaf[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                game_class = 'btn';
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                                gametemptable = gametemptable + "<tr><td>" + feature.properties.projects.state.game[i].projname + "</td><td>" + feature.properties.projects.state.game[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                redi_class = 'btn';
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                                reditemptable = reditemptable + "<tr><td>" + feature.properties.projects.state.redi[i].projname + "</td><td>" + feature.properties.projects.state.redi[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ctf_class = 'btn';
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                                ctftemptable = ctftemptable + "<tr><td>" + feature.properties.projects.formula.ctf[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmldd_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                                fmlddtemptable = fmlddtemptable + "<tr><td>" + feature.properties.projects.formula.fmldd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmlddsb106_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                                fmlddsb106temptable = fmlddsb106temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sevedd_class = 'btn';
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                                seveddtemptable = seveddtemptable + "<tr><td>" + feature.properties.projects.formula.sevedd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ffb_class = 'btn';
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                                ffbtemptable = ffbtemptable + "<tr><td>" + feature.properties.projects.special.ffb[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sar_class = 'btn';
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                                sartemptable = sartemptable + "<tr><td>" + feature.properties.projects.special.sar[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                vfp_class = 'btn';
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                                vfptemptable = vfptemptable + "<tr><td>" + feature.properties.projects.special.vfp[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }


                        var csbg_text = function() {
                            if (csbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + csbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            if (cdbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + cdbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');"  class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var eiaf_text = function() {
                            if (eiaf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + eiaftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            if (game_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + gametemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            if (redi_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + reditemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var ctf_text = function() {
                            if (ctf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ctftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            if (fmldd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            if (fmlddsb106_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddsb106temptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            if (sevedd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + seveddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();
                        var ffb_text = function() {
                            if (ffb_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ffbtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            if (sar_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + sartemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            if (vfp_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + vfptemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text + eiaf_text + game_text + redi_text + ctf_text + fmldd_text + fmlddsb106_text + sevedd_text + ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);

                    }
                });


                county = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter by geography
                        if (feature.properties.lgtype === "1" || feature.properties.lgtype === "61" || feature.properties.lgtype === "70") {
                            // valid: continue
                        } else {
                            return false;
                        }

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;

                        if ((cdbgexist + csbgexist + eiafexist + gameexist + rediexist + ctfexist + fmlddexist + fmlddsb106exist + sevedd + ffbexist + sarexist + vfpexist) === 0) {
                            return false;
                        }
                        //console.log('still here');
                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }


                        return true;

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#377eb8",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }


                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:#377eb8">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var datearray;

                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;
                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';
                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;
                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';
                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;
                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';
                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

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


                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                csbg_class = 'btn';
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                                csbgtemptable = csbgtemptable + "<tr><td>" + feature.properties.projects.federal.csbg[i].projname + "</td><td>" + feature.properties.projects.federal.csbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                cdbg_class = 'btn';
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                                cdbgtemptable = cdbgtemptable + "<tr><td>" + feature.properties.projects.federal.cdbg[i].projname + "</td><td>" + feature.properties.projects.federal.cdbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                eiaf_class = 'btn';
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                                eiaftemptable = eiaftemptable + "<tr><td>" + feature.properties.projects.state.eiaf[i].projname + "</td><td>" + feature.properties.projects.state.eiaf[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                game_class = 'btn';
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                                gametemptable = gametemptable + "<tr><td>" + feature.properties.projects.state.game[i].projname + "</td><td>" + feature.properties.projects.state.game[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                redi_class = 'btn';
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                                reditemptable = reditemptable + "<tr><td>" + feature.properties.projects.state.redi[i].projname + "</td><td>" + feature.properties.projects.state.redi[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ctf_class = 'btn';
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                                ctftemptable = ctftemptable + "<tr><td>" + feature.properties.projects.formula.ctf[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmldd_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                                fmlddtemptable = fmlddtemptable + "<tr><td>" + feature.properties.projects.formula.fmldd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmlddsb106_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                                fmlddsb106temptable = fmlddsb106temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sevedd_class = 'btn';
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                                seveddtemptable = seveddtemptable + "<tr><td>" + feature.properties.projects.formula.sevedd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ffb_class = 'btn';
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                                ffbtemptable = ffbtemptable + "<tr><td>" + feature.properties.projects.special.ffb[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sar_class = 'btn';
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                                sartemptable = sartemptable + "<tr><td>" + feature.properties.projects.special.sar[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                vfp_class = 'btn';
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                                vfptemptable = vfptemptable + "<tr><td>" + feature.properties.projects.special.vfp[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }


                        var csbg_text = function() {
                            if (csbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + csbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            if (cdbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + cdbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');"  class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var eiaf_text = function() {
                            if (eiaf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + eiaftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            if (game_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + gametemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            if (redi_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + reditemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var ctf_text = function() {
                            if (ctf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ctftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            if (fmldd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            if (fmlddsb106_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddsb106temptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            if (sevedd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + seveddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();
                        var ffb_text = function() {
                            if (ffb_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ffbtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            if (sar_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + sartemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            if (vfp_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + vfptemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text + eiaf_text + game_text + redi_text + ctf_text + fmldd_text + fmlddsb106_text + sevedd_text + ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);

                    }
                });

                district = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter by geography
                        if (feature.properties.lgtype !== "1" && feature.properties.lgtype !== "61" && feature.properties.lgtype !== "70" && feature.properties.lgtype !== "2" && feature.properties.lgtype !== "3" && feature.properties.lgtype !== "4" && feature.properties.lgtype !== "5") {
                            //valid: continue
                        } else {
                            return false;
                        }

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;

                        if ((cdbgexist + csbgexist + eiafexist + gameexist + rediexist + ctfexist + fmlddexist + fmlddsb106exist + sevedd + ffbexist + sarexist + vfpexist) === 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        return true;

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#ff7f00",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }


                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:#ff7f00">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var datearray;

                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;
                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';
                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;
                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';
                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;
                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';
                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

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


                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                csbg_class = 'btn';
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                                csbgtemptable = csbgtemptable + "<tr><td>" + feature.properties.projects.federal.csbg[i].projname + "</td><td>" + feature.properties.projects.federal.csbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                cdbg_class = 'btn';
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                                cdbgtemptable = cdbgtemptable + "<tr><td>" + feature.properties.projects.federal.cdbg[i].projname + "</td><td>" + feature.properties.projects.federal.cdbg[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                eiaf_class = 'btn';
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                                eiaftemptable = eiaftemptable + "<tr><td>" + feature.properties.projects.state.eiaf[i].projname + "</td><td>" + feature.properties.projects.state.eiaf[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                game_class = 'btn';
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                                gametemptable = gametemptable + "<tr><td>" + feature.properties.projects.state.game[i].projname + "</td><td>" + feature.properties.projects.state.game[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                redi_class = 'btn';
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                                reditemptable = reditemptable + "<tr><td>" + feature.properties.projects.state.redi[i].projname + "</td><td>" + feature.properties.projects.state.redi[i].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ctf_class = 'btn';
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                                ctftemptable = ctftemptable + "<tr><td>" + feature.properties.projects.formula.ctf[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmldd_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                                fmlddtemptable = fmlddtemptable + "<tr><td>" + feature.properties.projects.formula.fmldd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                fmlddsb106_class = 'btn';
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                                fmlddsb106temptable = fmlddsb106temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sevedd_class = 'btn';
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                                seveddtemptable = seveddtemptable + "<tr><td>" + feature.properties.projects.formula.sevedd[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                ffb_class = 'btn';
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                                ffbtemptable = ffbtemptable + "<tr><td>" + feature.properties.projects.special.ffb[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                sar_class = 'btn';
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                                sartemptable = sartemptable + "<tr><td>" + feature.properties.projects.special.sar[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                vfp_class = 'btn';
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                                vfptemptable = vfptemptable + "<tr><td>" + feature.properties.projects.special.vfp[i].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", dateofproj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[i].award).formatMoney(0) + "</td></tr>";
                            }
                        }


                        var csbg_text = function() {
                            if (csbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + csbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            if (cdbg_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + cdbgtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');"  class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var eiaf_text = function() {
                            if (eiaf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + eiaftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            if (game_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + gametemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            if (redi_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>" + reditemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var ctf_text = function() {
                            if (ctf_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ctftemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            if (fmldd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            if (fmlddsb106_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + fmlddsb106temptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            if (sevedd_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + seveddtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();
                        var ffb_text = function() {
                            if (ffb_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + ffbtemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            if (sar_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + sartemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            if (vfp_class === '') {
                                return "";
                            } else {
                                var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>" + vfptemptable + "</table>";
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text + eiaf_text + game_text + redi_text + ctf_text + fmldd_text + fmlddsb106_text + sevedd_text + ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);

                    }
                });


            } else {


                city_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        //console.log((feature.properties.projects.federal.csbg).length);
                        if ((cdbgexist + csbgexist) === 0) {
                            return false;
                        }
                        //console.log('still here');
                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        //filter by geography
                        if (feature.properties.lgtype === "2" || feature.properties.lgtype === "3" || feature.properties.lgtype === "4" || feature.properties.lgtype === "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {

                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:blue">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';
                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.federal.csbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.csbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    csbg_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.federal.cdbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.cdbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    cdbg_class = 'btn';
                                }
                            }
                        }


                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                            }
                        }


                        var csbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.csbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.csbg[j].projname + "</td><td>" + feature.properties.projects.federal.csbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (csbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.cdbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.cdbg[j].projname + "</td><td>" + feature.properties.projects.federal.cdbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (cdbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');"  class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();



                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);

                    }
                });

                county_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        if ((cdbgexist + csbgexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        //filter by geography
                        if (feature.properties.lgtype === "1" || feature.properties.lgtype === "61" || feature.properties.lgtype === "70") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }


                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:blue">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';
                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.federal.csbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.csbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    csbg_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.federal.cdbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.cdbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    cdbg_class = 'btn';
                                }
                            }
                        }


                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                            }
                        }

                        var csbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.csbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.csbg[j].projname + "</td><td>" + feature.properties.projects.federal.csbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (csbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.cdbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.cdbg[j].projname + "</td><td>" + feature.properties.projects.federal.cdbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (cdbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();



                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });


                district_federal = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var cdbgexist = (feature.properties.projects.federal.cdbg).length;
                        var csbgexist = (feature.properties.projects.federal.csbg).length;
                        if ((cdbgexist + csbgexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (cdbgexist > 0) {
                            for (i = 0; i < cdbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (csbgexist > 0) {
                            for (i = 0; i < csbgexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        //filter by geography
                        if (feature.properties.lgtype !== "1" && feature.properties.lgtype !== "61" && feature.properties.lgtype !== "70" && feature.properties.lgtype !== "2" && feature.properties.lgtype !== "3" && feature.properties.lgtype !== "4" && feature.properties.lgtype !== "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#0000FF",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }


                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:blue">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;
                        var csbg_temptotal = 0;
                        var cdbg_temptotal = 0;
                        var csbg_class = '';
                        var cdbg_class = '';
                        var csbg_title = '';
                        var cdbg_title = '';
                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.federal.csbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.csbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    csbg_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.federal.cdbg).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.federal.cdbg.length); k = k + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    cdbg_class = 'btn';
                                }
                            }
                        }

                        //sum csbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.csbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.csbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.federal.csbg[i].award) || 0;
                                csbg_temptotal = csbg_temptotal + Number(temp_award);
                            }
                        }
                        //sum cdbg for date range
                        for (i = 0; i < (feature.properties.projects.federal.cdbg).length; i = i + 1) {
                            var datearray = (feature.properties.projects.federal.cdbg[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.federal.cdbg[i].award || 0;
                                cdbg_temptotal = cdbg_temptotal + Number(temp_award);
                            }
                        }

                        var csbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.csbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.csbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.csbg[j].projname + "</td><td>" + feature.properties.projects.federal.csbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.csbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (csbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + csbg_class + '">CSBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + csbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var cdbg_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.federal.cdbg).length; j = j + 1) {
                                var datearray = (feature.properties.projects.federal.cdbg[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.federal.cdbg[j].projname + "</td><td>" + feature.properties.projects.federal.cdbg[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.federal.cdbg[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (cdbg_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + cdbg_class + '">CDBG:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + cdbg_temptotal.formatMoney(0) + '<br />';
                            }
                        }();



                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Federal Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            csbg_text + cdbg_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });



                //geojsonLayer
                city_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        if ((eiafexist + gameexist + rediexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                //parse date (chrome reads default format, firefox does not)
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        //filter by geography
                        if (feature.properties.lgtype === "2" || feature.properties.lgtype === "3" || feature.properties.lgtype === "4" || feature.properties.lgtype === "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:red">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;

                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';

                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.state.eiaf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.eiaf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    eiaf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.game).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.game.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.game[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    game_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.redi).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.redi.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.redi[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    redi_class = 'btn';
                                }
                            }
                        }


                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                            }
                        }


                        var eiaf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.eiaf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.eiaf[j].projname + "</td><td>" + feature.properties.projects.state.eiaf[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (eiaf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.game).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.game[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.game[j].projname + "</td><td>" + feature.properties.projects.state.game[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (game_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.redi).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.redi[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.redi[j].projname + "</td><td>" + feature.properties.projects.state.redi[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (redi_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>State Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            eiaf_text + game_text + redi_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

                county_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        if ((eiafexist + gameexist + rediexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype === "1" || feature.properties.lgtype === "61" || feature.properties.lgtype === "70") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:red">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;

                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';

                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.state.eiaf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.eiaf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    eiaf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.game).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.game.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.game[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    game_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.redi).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.redi.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.redi[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    redi_class = 'btn';
                                }
                            }
                        }

                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                            }
                        }


                        var eiaf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.eiaf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.eiaf[j].projname + "</td><td>" + feature.properties.projects.state.eiaf[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (eiaf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.game).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.game[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.game[j].projname + "</td><td>" + feature.properties.projects.state.game[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (game_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.redi).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.redi[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.redi[j].projname + "</td><td>" + feature.properties.projects.state.redi[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (redi_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>State Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            eiaf_text + game_text + redi_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });


                district_state = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var eiafexist = (feature.properties.projects.state.eiaf).length;
                        var gameexist = (feature.properties.projects.state.game).length;
                        var rediexist = (feature.properties.projects.state.redi).length;
                        if ((eiafexist + gameexist + rediexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (eiafexist > 0) {
                            for (i = 0; i < eiafexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (gameexist > 0) {
                            for (i = 0; i < gameexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (rediexist > 0) {
                            for (i = 0; i < rediexist; i = i + 1) {
                                var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype !== "1" && feature.properties.lgtype !== "61" && feature.properties.lgtype !== "70" && feature.properties.lgtype !== "2" && feature.properties.lgtype !== "3" && feature.properties.lgtype !== "4" && feature.properties.lgtype !== "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#FF0000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:red">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;

                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var eiaf_temptotal = 0;
                        var game_temptotal = 0;
                        var redi_temptotal = 0;

                        var eiaf_class = '';
                        var game_class = '';
                        var redi_class = '';

                        var eiaf_title = '';
                        var game_title = '';
                        var redi_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.state.eiaf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.eiaf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    eiaf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.game).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.game.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.game[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    game_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.state.redi).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.state.redi.length); k = k + 1) {
                                var datearray = (feature.properties.projects.state.redi[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    redi_class = 'btn';
                                }
                            }
                        }

                        //sum eiaf for date range
                        for (i = 0; i < (feature.properties.projects.state.eiaf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.eiaf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.state.eiaf[i].award) || 0;
                                eiaf_temptotal = eiaf_temptotal + Number(temp_award);
                            }
                        }
                        //sum game for date range
                        for (i = 0; i < (feature.properties.projects.state.game).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.game[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.game[i].award || 0;
                                game_temptotal = game_temptotal + Number(temp_award);
                            }
                        }
                        //sum redi for date range
                        for (i = 0; i < (feature.properties.projects.state.redi).length; i = i + 1) {
                            var datearray = (feature.properties.projects.state.redi[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.state.redi[i].award || 0;
                                redi_temptotal = redi_temptotal + Number(temp_award);
                            }
                        }


                        var eiaf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.eiaf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.eiaf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.eiaf[j].projname + "</td><td>" + feature.properties.projects.state.eiaf[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.eiaf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (eiaf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + eiaf_class + '">EIAF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + eiaf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var game_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.game).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.game[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.game[j].projname + "</td><td>" + feature.properties.projects.state.game[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.game[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (game_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + game_class + '">GAME:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + game_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var redi_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th align='center'>#</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.state.redi).length; j = j + 1) {
                                var datearray = (feature.properties.projects.state.redi[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.state.redi[j].projname + "</td><td>" + feature.properties.projects.state.redi[j].projectnmbr + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.state.redi[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (redi_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + redi_class + '">REDI:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + redi_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>State Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            eiaf_text + game_text + redi_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

                //geojsonLayer
                city_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        if ((ctfexist + fmlddexist + fmlddsb106exist + sevedd) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype === "2" || feature.properties.lgtype === "3" || feature.properties.lgtype === "4" || feature.properties.lgtype === "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:green">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;

                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';

                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.formula.ctf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.ctf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ctf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmldd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmldd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmldd_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmlddsb106).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmlddsb106.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmlddsb106_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.sevedd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.sevedd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sevedd_class = 'btn';
                                }
                            }
                        }

                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                            }
                        }

                        var ctf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.ctf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.ctf[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ctf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmldd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmldd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmldd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmlddsb106).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmlddsb106_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.sevedd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.sevedd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sevedd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Formula Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

                county_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        if ((ctfexist + fmlddexist + fmlddsb106exist + sevedd) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype === "1" || feature.properties.lgtype === "61" || feature.properties.lgtype === "70") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:green">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;

                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';

                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.formula.ctf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.ctf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ctf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmldd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmldd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmldd_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmlddsb106).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmlddsb106.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmlddsb106_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.sevedd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.sevedd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sevedd_class = 'btn';
                                }
                            }
                        }

                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                            }
                        }

                        var ctf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.ctf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.ctf[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ctf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmldd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmldd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmldd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmlddsb106).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmlddsb106_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.sevedd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.sevedd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sevedd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Formula Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });


                district_formula = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ctfexist = (feature.properties.projects.formula.ctf).length;
                        var fmlddexist = (feature.properties.projects.formula.fmldd).length;
                        var fmlddsb106exist = (feature.properties.projects.formula.fmlddsb106).length;
                        var sevedd = (feature.properties.projects.formula.sevedd).length;
                        if ((ctfexist + fmlddexist + fmlddsb106exist + sevedd) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ctfexist > 0) {
                            for (i = 0; i < ctfexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddexist > 0) {
                            for (i = 0; i < fmlddexist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (fmlddsb106exist > 0) {
                            for (i = 0; i < fmlddsb106exist; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sevedd > 0) {
                            for (i = 0; i < sevedd; i = i + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype !== "1" && feature.properties.lgtype !== "61" && feature.properties.lgtype !== "70" && feature.properties.lgtype !== "2" && feature.properties.lgtype !== "3" && feature.properties.lgtype !== "4" && feature.properties.lgtype !== "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#008000",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:green">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ctf_temptotal = 0;
                        var fmldd_temptotal = 0;
                        var fmlddsb106_temptotal = 0;
                        var sevedd_temptotal = 0;

                        var ctf_class = '';
                        var fmldd_class = '';
                        var fmlddsb106_class = '';
                        var sevedd_class = '';

                        var ctf_title = '';
                        var fmldd_title = '';
                        var fmlddsb106_title = '';
                        var sevedd_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.formula.ctf).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.ctf.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ctf_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmldd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmldd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmldd_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.fmlddsb106).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.fmlddsb106.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    fmlddsb106_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.formula.sevedd).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.formula.sevedd.length); k = k + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sevedd_class = 'btn';
                                }
                            }
                        }

                        //sum ctf for date range
                        for (i = 0; i < (feature.properties.projects.formula.ctf).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.ctf[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.formula.ctf[i].award) || 0;
                                ctf_temptotal = ctf_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmldd for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmldd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmldd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmldd[i].award || 0;
                                fmldd_temptotal = fmldd_temptotal + Number(temp_award);
                            }
                        }
                        //sum fmlddsb106 for date range
                        for (i = 0; i < (feature.properties.projects.formula.fmlddsb106).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.fmlddsb106[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.fmlddsb106[i].award || 0;
                                fmlddsb106_temptotal = fmlddsb106_temptotal + Number(temp_award);
                            }
                        }
                        //sum sevedd for date range
                        for (i = 0; i < (feature.properties.projects.formula.sevedd).length; i = i + 1) {
                            var datearray = (feature.properties.projects.formula.sevedd[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.formula.sevedd[i].award || 0;
                                sevedd_temptotal = sevedd_temptotal + Number(temp_award);
                            }
                        }

                        var ctf_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.ctf).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.ctf[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.ctf[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.ctf[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ctf_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ctf_class + '">CTF:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ctf_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmldd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmldd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmldd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmldd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmldd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmldd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmldd_class + '">FMLDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmldd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var fmlddsb106_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.fmlddsb106).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.fmlddsb106[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.fmlddsb106[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.fmlddsb106[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (fmlddsb106_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + fmlddsb106_class + '">FMLDDSB106:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + fmlddsb106_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sevedd_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.formula.sevedd).length; j = j + 1) {
                                var datearray = (feature.properties.projects.formula.sevedd[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.formula.sevedd[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.formula.sevedd[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sevedd_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sevedd_class + '">SEVEDD:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sevedd_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Formula Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ctf_text + fmldd_text + fmlddsb106_text + sevedd_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

                //geojsonLayer
                city_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;
                        if ((ffbexist + sarexist + vfpexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype === "2" || feature.properties.lgtype === "3" || feature.properties.lgtype === "4" || feature.properties.lgtype === "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:purple">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;

                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';

                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.special.ffb).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.ffb.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.ffb[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ffb_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.sar).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.sar.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.sar[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sar_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.vfp).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.vfp.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.vfp[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    vfp_class = 'btn';
                                }
                            }
                        }


                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                            }
                        }


                        var ffb_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.ffb).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.ffb[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.ffb[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ffb_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.sar).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.sar[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.sar[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sar_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.vfp).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.vfp[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.vfp[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (vfp_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Special Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

                county_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;
                        if ((ffbexist + sarexist + vfpexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype === "1" || feature.properties.lgtype === "61" || feature.properties.lgtype === "70") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:purple">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;

                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';

                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.special.ffb).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.ffb.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.ffb[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ffb_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.sar).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.sar.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.sar[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sar_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.vfp).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.vfp.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.vfp[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    vfp_class = 'btn';
                                }
                            }
                        }


                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                            }
                        }


                        var ffb_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.ffb).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.ffb[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.ffb[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ffb_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.sar).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.sar[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.sar[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sar_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.vfp).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.vfp[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.vfp[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (vfp_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Special Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });


                district_special = L.geoJson(sumtotal, {
                    filter: function(feature, layer) {

                        //filter out if no projects
                        var ffbexist = (feature.properties.projects.special.ffb).length;
                        var sarexist = (feature.properties.projects.special.sar).length;
                        var vfpexist = (feature.properties.projects.special.vfp).length;
                        if ((ffbexist + sarexist + vfpexist) == 0) {
                            return false;
                        }

                        //filter out if no projects in date range
                        var countprojinrange = 0;
                        if (ffbexist > 0) {
                            for (i = 0; i < ffbexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (sarexist > 0) {
                            for (i = 0; i < sarexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (vfpexist > 0) {
                            for (i = 0; i < vfpexist; i = i + 1) {
                                var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                                var dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    countprojinrange = countprojinrange + 1;
                                }
                            }
                        }
                        if (countprojinrange === 0) {
                            return false;
                        }

                        if (feature.properties.lgtype !== "1" && feature.properties.lgtype !== "61" && feature.properties.lgtype !== "70" && feature.properties.lgtype !== "2" && feature.properties.lgtype !== "3" && feature.properties.lgtype !== "4" && feature.properties.lgtype !== "5") {
                            return true;
                        } else {
                            return false;
                        }

                    },
                    pointToLayer: function(feature, latlng) {
                        var zl = map.getZoom();
                        var icon;

                        if (zl == 6) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i6;
                        }
                        if (zl == 7) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i7;
                        }
                        if (zl == 8) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i8;
                        }
                        if (zl == 9) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i9;
                        }
                        if (zl == 10) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i10;
                        }
                        if (zl == 11) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i11;
                        }
                        if (zl == 12) {
                            icon = L.MakiMarkers.icon({
                                icon: null,
                                color: "#800080",
                                size: "s"
                            });
                            icon.options.iconSize = i12;
                        }

                        var marker = new L.Marker(latlng, {
                            icon: icon,
                            riseOnHover: true
                        }).bindLabel('<span style="color:purple">' + feature.properties.govname + '</span>');
                        oms.addMarker(marker);
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        var dateofproj;

                        var ffb_temptotal = 0;
                        var sar_temptotal = 0;
                        var vfp_temptotal = 0;

                        var ffb_class = '';
                        var sar_class = '';
                        var vfp_class = '';

                        var ffb_title = '';
                        var sar_title = '';
                        var vfp_title = '';

                        var temp_award;

                        //if program has projects, add class and title attributes to html
                        if ((feature.properties.projects.special.ffb).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.ffb.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.ffb[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    ffb_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.sar).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.sar.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.sar[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    sar_class = 'btn';
                                }
                            }
                        }
                        if ((feature.properties.projects.special.vfp).length > 0) {
                            for (var k = 0; k < (feature.properties.projects.special.vfp.length); k = k + 1) {
                                var datearray = (feature.properties.projects.special.vfp[k].dateofaward).split("-");
                                dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (dateofproj > mindate && dateofproj < maxdate) {
                                    vfp_class = 'btn';
                                }
                            }
                        }


                        //sum ffb for date range
                        for (i = 0; i < (feature.properties.projects.special.ffb).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.ffb[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = Number(feature.properties.projects.special.ffb[i].award) || 0;
                                ffb_temptotal = ffb_temptotal + Number(temp_award);
                            }
                        }
                        //sum sar for date range
                        for (i = 0; i < (feature.properties.projects.special.sar).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.sar[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.sar[i].award || 0;
                                sar_temptotal = sar_temptotal + Number(temp_award);
                            }
                        }
                        //sum vfp for date range
                        for (i = 0; i < (feature.properties.projects.special.vfp).length; i = i + 1) {
                            var datearray = (feature.properties.projects.special.vfp[i].dateofaward).split("-");
                            dateofproj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                            if (dateofproj > mindate && dateofproj < maxdate) {
                                temp_award = feature.properties.projects.special.vfp[i].award || 0;
                                vfp_temptotal = vfp_temptotal + Number(temp_award);
                            }
                        }


                        var ffb_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.ffb).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.ffb[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.ffb[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.ffb[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (ffb_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + ffb_class + '">FFB:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + ffb_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var sar_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.sar).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.sar[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.sar[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.sar[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (sar_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + sar_class + '">SAR:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + sar_temptotal.formatMoney(0) + '<br />';
                            }
                        }();

                        var vfp_text = function() {
                            var temptable = "<table><tr><th align='left'>Project Name</th><th>Date</th><th align='right'>Award</th></tr>";
                            for (j = 0; j < (feature.properties.projects.special.vfp).length; j = j + 1) {
                                var datearray = (feature.properties.projects.special.vfp[j].dateofaward).split("-");
                                var datepj = new Date(datearray[0] + " " + datearray[1] + " 20" + datearray[2]);
                                if (datepj > mindate && datepj < maxdate) {
                                    temptable = temptable + "<tr><td>" + feature.properties.projects.special.vfp[j].projname + "</td><td>" + $.datepicker.formatDate("mm/dd/y", datepj) + "</td><td align='right'>$" + (feature.properties.projects.special.vfp[j].award).formatMoney(0) + "</td></tr>";
                                }
                            }
                            temptable = temptable + "</table>";
                            if (vfp_class == '') {
                                return "";
                            } else {
                                return '<a href="#" onclick="popopen(\'' + temptable.replace(/'/g, "?") + '\');" class="' + vfp_class + '">VFP:<span><img class="callout" src="cssttp/callout.gif" />' + temptable + '</span></a>  $' + vfp_temptotal.formatMoney(0) + '<br />';
                            }
                        }();


                        var popuphtml = "<h3>" + feature.properties.govname + "</h3>" +
                            "<i>Special Awards<br />" +
                            $.datepicker.formatDate("mm/dd/y", mindate) + " to " + $.datepicker.formatDate("mm/dd/y", maxdate) + "</i><br /><br />" +
                            ffb_text + sar_text + vfp_text;

                        layer.desc = popuphtml;
                        // layer.bindPopup(popuphtml);
                    }
                });

            }

          
          
                var end = +new Date(); // log end timestamp
                var diff = end - start;

                console.log("build:" + diff);

                    
                var start = +new Date(); // log start timestamp
          
            if (minimal) {
                if (district_flag === 1) {
                    map.addLayer(district);
                }
                if (city_flag === 1) {
                    map.addLayer(city);
                }
                if (county_flag === 1) {
                    map.addLayer(county);
                }
            } else {
                if (city_flag === 1 && formula_flag === 1) {
                    map.addLayer(city_formula);
                }
                if (county_flag === 1 && formula_flag === 1) {
                    map.addLayer(county_formula);
                }
                if (district_flag === 1 && formula_flag === 1) {
                    map.addLayer(district_formula);
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


                if (city_flag === 1 && state_flag === 1) {
                    map.addLayer(city_state);
                }
                if (county_flag === 1 && state_flag === 1) {
                    map.addLayer(county_state);
                }
                if (district_flag === 1 && state_flag === 1) {
                    map.addLayer(district_state);
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
            }
          
          
                var end = +new Date(); // log end timestamp
                var diff = end - start;

                console.log("render:" + diff);

        };

        refreshdata();


    });

} //end init