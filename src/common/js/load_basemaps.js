module.exports = function() {

    'use strict';

    //credits
    //         var popmodal = function() {

    //         map.openModal({
    //             content: '<h4>Development</h4><p>' +
    //                 '<a target ="_blank" href="https://jqueryui.com/">JQuery</a>, ' +
    //                 '<a target ="_blank" href="https://jqueryui.com/">JQuery UI</a>, ' +
    //                 '<a target ="_blank" href="http://leafletjs.com/">Leaflet</a>, ' +
    //                 '<a target ="_blank" href="https://d3js.org/">D3 Data Visualization Library</a>, ' +
    //                 '<a target ="_blank" href="https://github.com/teralytics/Leaflet.D3SvgOverlay">D3 SVG Overlay</a>, ' +
    //                 '<a target ="_blank" href="https://fortawesome.github.io/Font-Awesome/">Font-Awesome</a>, ' +
    //                 '<a target ="_blank" href="https://github.com/CliffCloud/Leaflet.EasyButton">Leaflet Easy Button</a>, ' +
    //                 '<a target ="_blank" href="https://github.com/w8r/Leaflet.Modal">Leaflet Modal</a>, ' +
    //                 '<a target ="_blank" href="https://ghusse.github.io/jQRangeSlider/index.html">JQRangeSlider</a>, ' +
    //                 '<a target ="_blank" href="https://twitter.github.io/typeahead.js/">Twitter Typeahead</a> </p>'
    //         });
    //     };

    var basemaps = {};

    basemaps.mbAttr = "© <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> | © <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap Contributors</a> | <a href='#' id='devcred'>Credits</a>",
        basemaps.mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVjb2RlbW9nIiwiYSI6Ikp0Sk1tSmsifQ.hl44-VjKTJNEP5pgDFcFPg';


    basemaps.emerald = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.emerald',
        attribution: basemaps.mbAttr
    });


    basemaps.classic = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.streets-basic',
        attribution: basemaps.mbAttr
    });


    basemaps.mapquestOSM = L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
        attribution: 'Tiles courtesy of <a href="https://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA | <a href="#" id="devcred" >Credits</a>'
    });


    return basemaps;

}