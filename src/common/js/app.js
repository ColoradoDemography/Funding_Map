// @flow

$(document).ready(function() {
    'use strict';

    require("!style!css!../../lib/css/uirange-min.css");
    require("!style!css!../../lib/css/leaflet.modal.css");

    require("!style!css!../css/app.css");


    var basemaps = require("./load_basemaps")();

    var map = L.map('map', {
        center: [39, -105.5],
        zoom: 7,
        layers: [basemaps.emerald],
        zoomControl: false
    });

    var instance = require("./geojson_layers.js")(map);

    require("./add_credits")(map);
    require("./add_title_control")(map);
    require("./add_search_control")(map);

    L.control.zoom({
        position: 'topright'
    }).addTo(map);


    require("./add_layer_control.js")(map, instance, basemaps);

    var searchstring = [];
    var coordinates = [];


    require("./d3")(map, searchstring, coordinates, instance[3], instance[4], instance[5]);
    require("./add_typeahead.js")(map, searchstring, coordinates);




}); //end $ document