module.exports = function(feature) {
   'use strict';
                 switch (feature.properties.fieldreg) {
                     case "sc":
                         return {
                             stroke: false,
                             color: "rgb(102,237,100)"
                         };
                     case "sw":
                         return {
                             stroke: false,
                             color: "rgb(176,118,79)"
                         };
                     case "se":
                         return {
                             stroke: false,
                             color: "rgb(116,68,194)"
                         };
                     case "nw":
                         return {
                             stroke: false,
                             color: "rgb(81,197,232)"
                         };
                     case "nm":
                         return {
                             stroke: false,
                             color: "rgb(250,105,173)"
                         };
                     case "ne":
                         return {
                             stroke: false,
                             color: "rgb(73,128,74)"
                         };
                     case "c":
                         return {
                             stroke: false,
                             color: "rgb(255,255,115)"
                         };
                     case "nc":
                         return {
                             stroke: false,
                             color: "rgb(47,80,130)"
                         };
                 }
   
             };