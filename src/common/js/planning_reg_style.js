// @flow

module.exports = function(feature: Object): Object {
    'use strict';

    var style_obj: Object = {};

    switch (feature.properties.PlanRgn) {
        case 1:
            style_obj = {
                stroke: false,
                color: "rgb(102,237,100)"
            };
            break;
        case 2:
            style_obj = {
                stroke: false,
                color: "rgb(176,118,79)"
            };
            break;
        case 3:
            style_obj = {
                stroke: false,
                color: "rgb(116,68,194)"
            };
            break;
        case 4:
            style_obj = {
                stroke: false,
                color: "rgb(81,197,232)"
            };
            break;
        case 5:
            style_obj = {
                stroke: false,
                color: "rgb(250,105,173)"
            };
            break;
        case 6:
            style_obj = {
                stroke: false,
                color: "rgb(73,128,74)"
            };
            break;
        case 7:
            style_obj = {
                stroke: false,
                color: "rgb(255,255,115)"
            };
            break;
        case 8:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 9:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 10:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 11:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 12:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 13:
            style_obj = {
                stroke: false,
                color: "rgb(47,80,130)"
            };
            break;
        case 14:
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