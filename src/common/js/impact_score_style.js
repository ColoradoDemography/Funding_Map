// @flow

module.exports = function(feature: Object): Object {
    'use strict';

    var style_obj: Object = {};

    switch (feature.properties.score) {
        case 3:
            style_obj = {
                stroke: false,
                color: "rgb(255,255,128)"
            };
            break;
        case 4:
            style_obj = {
                stroke: false,
                color: "rgb(250,209,85)"
            };
            break;
        case 5:
            style_obj = {
                stroke: false,
                color: "rgb(250,209,85)"
            };
            break;
        case 6:
            style_obj = {
                stroke: false,
                color: "rgb(242,167,46)"
            };
            break;
        case 7:
            style_obj = {
                stroke: false,
                color: "rgb(173,83,19)"
            };
            break;
        case 8:
            style_obj = {
                stroke: false,
                color: "rgb(173,83,19)"
            };
            break;
        case 9:
            style_obj = {
                stroke: false,
                color: "rgb(107,0,0)"
            };
            break;
        case 10:
            style_obj = {
                stroke: false,
                color: "rgb(107,0,0)"
            };
            break;
        default:
            console.log('error unexpected default case');
            style_obj = {};
            break;
    }

    return style_obj;
}