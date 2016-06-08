// @flow

module.exports = function(feature: Object): Object {
    'use strict';

    var style_obj: Object = {};

    switch (feature.properties.PlanRgn) {
        case 1:
            style_obj = {
                stroke: false,
                color: "rgb(63,114,252)"
            };
            break;
        case 2:
            style_obj = {
                stroke: false,
                color: "rgb(56,168,0)"
            };
            break;
        case 3:
            style_obj = {
                stroke: false,
                color: "rgb(252,114,101)"
            };
            break;
        case 4:
            style_obj = {
                stroke: false,
                color: "rgb(63,252,224)"
            };
            break;
        case 5:
            style_obj = {
                stroke: false,
                color: "rgb(252,63,237)"
            };
            break;
        case 6:
            style_obj = {
                stroke: false,
                color: "rgb(252,205,63)"
            };
            break;
        case 7:
            style_obj = {
                stroke: false,
                color: "rgb(168,112,0)"
            };
            break;
        case 8:
            style_obj = {
                stroke: false,
                color: "rgb(252,235,190)"
            };
            break;
        case 9:
            style_obj = {
                stroke: false,
                color: "rgb(255,170,0)"
            };
            break;
        case 10:
            style_obj = {
                stroke: false,
                color: "rgb(63,158,252)"
            };
            break;
        case 11:
            style_obj = {
                stroke: false,
                color: "rgb(136,252,101)"
            };
            break;
        case 12:
            style_obj = {
                stroke: false,
                color: "rgb(230,252,63)"
            };
            break;
        case 13:
            style_obj = {
                stroke: false,
                color: "rgb(252,25,109)"
            };
            break;
        case 14:
            style_obj = {
                stroke: false,
                color: "rgb(0,168,132)"
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