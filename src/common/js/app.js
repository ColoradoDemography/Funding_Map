// @flow

var p2: Promise = new Promise(function(resolve) {

    /* $FlowIssue - Flow throws cannot find module error on Worker */
    var Worker = require("worker!./workers/load_data.js");

    var worker: Worker = new Worker;

    worker.postMessage("start");

    worker.onmessage = function(e) {
        resolve(e.data);
    }

});



document.addEventListener("DOMContentLoaded", function() {
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


    require("./d3")(map, instance[0], p2);



}); //end DOM Content Loaded