// @flow

module.exports = function(map: Object, instance: Array<Object>, basemaps: Object) {
    'use strict';

    var overlays: Object = {
        "Impact Score": instance[0],
        "Field Regions": instance[1],
        "Planning Regions": instance[2]
    };

    var basemap: Object = {
        "Mapbox Emerald": basemaps.emerald,
        "Mapquest": basemaps.mapquestOSM,
        "Mapbox Streets": basemaps.classic
    };

    L.control.layers(basemap, overlays).addTo(map);



}