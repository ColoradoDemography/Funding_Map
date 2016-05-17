module.exports = function(feature) {
    'use strict';
  
    switch (feature.properties.score) {
        case 3:
            return {
                stroke: false,
                color: "rgb(255,255,128)"
            };
        case 4:
            return {
                stroke: false,
                color: "rgb(250,209,85)"
            };
        case 5:
            return {
                stroke: false,
                color: "rgb(250,209,85)"
            };
        case 6:
            return {
                stroke: false,
                color: "rgb(242,167,46)"
            };
        case 7:
            return {
                stroke: false,
                color: "rgb(173,83,19)"
            };
        case 8:
            return {
                stroke: false,
                color: "rgb(173,83,19)"
            };
        case 9:
            return {
                stroke: false,
                color: "rgb(107,0,0)"
            };
        case 10:
            return {
                stroke: false,
                color: "rgb(107,0,0)"
            };
    }
}