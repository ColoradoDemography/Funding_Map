// @flow

module.exports = function() {

    'use strict';

    var basemaps: Object = {};

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

    basemaps.light = L.tileLayer(basemaps.mbUrl, {
        id: 'mapbox.light',
        attribution: basemaps.mbAttr
    });

    basemaps.mapquestOSM = L.tileLayer("https://{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: ["otile1-s", "otile2-s", "otile3-s", "otile4-s"],
        attribution: 'Tiles courtesy of <a href="https://www.mapquest.com/" target="_blank">MapQuest</a> <img src="https://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA | <a href="#" id="devcred" >Credits</a>'
    });


    return basemaps;

}