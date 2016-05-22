module.exports = function(map, instance, basemaps) {
    'use strict';

    var overlays: object = {
        "Impact Score": instance[0],
        "Field Regions": instance[1],
        "Planning Regions": instance[2]
    };

    var basemap = {
        "Mapbox Emerald": basemaps.emerald,
        "Mapquest": basemaps.mapquestOSM,
        "Mapbox Streets": basemaps.classic
    };

    L.control.layers(basemap, overlays).addTo(map);



}