// @flow

module.exports = function(feature: Object): Object {
    'use strict';

    var style_obj: Object = {};

    switch (feature.properties.fieldreg) {
        case "sc":
            style_obj = {
                stroke: false,
                color: "rgb(102,237,100)"
            };
            break;
        case "sw":
            style_obj = {
                stroke: false,
                color: "rgb(176,118,79)"
            };
            break;
        case "se":
            style_obj = {
                stroke: false,
                color: "rgb(116,68,194)"
            };
            break;
        case "nw":
            style_obj = {
                stroke: false,
                color: "rgb(81,197,232)"
            };
            break;
        case "nm":
            style_obj = {
                stroke: false,
                color: "rgb(250,105,173)"
            };
            break;
        case "ne":
            style_obj = {
                stroke: false,
                color: "rgb(73,128,74)"
            };
            break;
        case "c":
            style_obj = {
                stroke: false,
                color: "rgb(255,255,115)"
            };
            break;
        case "nc":
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        default:
            style_obj = {
                stroke: "black",
                color: "black"
            };
            break;

    }

    return style_obj;

};