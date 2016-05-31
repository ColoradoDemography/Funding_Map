// @flow

module.exports = function(map: Object, instance: Array < Object > , basemaps: Object) {
    'use strict';

    var basemap: Object = {
        "Mapbox Emerald": basemaps.emerald,
        "Mapquest": basemaps.mapquestOSM,
        "Mapbox Streets": basemaps.classic
    };

    var overlays: Object = {
        "Planning Regions": instance[2],
        "Field Regions": instance[3],
        "Impact Score": instance[4]
    };

    L.control.layers(basemap, overlays).addTo(map);

}