// @flow

module.exports = function(map: Object, instance: Array < Object > , basemaps: Object) {
    'use strict';

//         "Mapquest": basemaps.mapquestOSM,
//         "Mapbox Streets": basemaps.classic,
  
    var basemap: Object = {
        "Mapbox Light": basemaps.light,
        "Mapbox Emerald": basemaps.emerald
    };

  
var groupedOverlays: Object = {
  "Overlays": {
    "None": instance[5],
    "Planning Regions": instance[2],
    "Field Regions": instance[3],
    "Impact Score": instance[4]
  }
};
  
var options = {
  exclusiveGroups: ["Overlays"]
};

L.control.groupedLayers(basemap, groupedOverlays, options).addTo(map);
  

  
  
  
  
  
}