module.exports = function(data){
   'use strict';

           var valueize = require("./valueize");
  
  var basedate = new Date("2000,1,1");
  var stackchips=[];
  
  var cities = data.map(function(d) {
                 var tv = d.lgid;
                 if (stackchips.hasOwnProperty(tv)) {
                     stackchips[tv]++;
                 } else {
                     stackchips[tv] = 0;
                 }
                 var rlat = (parseFloat(d.latitude) + (0.002 * stackchips[tv]));
                 var rlng = d.longitude;
                 d.latLng = [rlat, rlng];
                 d.id = valueize(d, basedate) + (0.000001 * stackchips[tv]);

                 return d;
             });
  
  return cities;
  
};