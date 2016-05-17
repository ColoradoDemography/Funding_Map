
$(document).ready(function() {
         'use strict';

         require("!style!css!../../lib/css/uirange-min.css");
         require("!style!css!../../lib/css/leaflet.modal.css");
         require("!style!css!../../lib/css/easy-button.css");

         require("!style!css!../css/app.css");


         var basemaps = require("./load_basemaps")();

         var map = L.map('map', {
             center: [39, -105.5],
             zoom: 7,
             layers: [basemaps.emerald],
             zoomControl: false
         });

         require("./add_title_control")(map);

         require("./add_search_control")(map);

         require("./add_typeahead.js")(map);

         L.control.zoom({
             position: 'topright'
         }).addTo(map);

         require("./add_easy_button.js")(map);

         var instance = require("./geojson_layers.js")(map);

         require("./add_layer_control.js")(map, instance, basemaps);

         require("./d3")(map);


     }); //end $ document