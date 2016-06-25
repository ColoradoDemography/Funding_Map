/* eslint-disable */

importScripts('https://d3js.org/d3.v3.min.js');

//IE FindIndex Polyfill: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function(predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.findIndex called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return i;
            }
        }
        return -1;
    };
}

var valueize = require("../valueize.js");
var sortNumeric = require("../util").sortNumeric;
var initial_grantdata_crunch = require("../initial_grantdata_crunch.js");
var stack_chips = require("../stack_chips");

onmessage = function(e) {
        console.log('Message received from main script');

        var searchstring = [];
        var coordinates = [];

        d3.csv("https://storage.googleapis.com/co-publicdata/grants.csv", function(data) {
            d3.csv("/data/keypts.csv", function(keys) {
              
                //seed search box            
                keys.forEach(d => {
                    //seed the search arrays
                    if (searchstring.indexOf(d.govname) === -1) {
                        searchstring.push(d.govname);
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                        searchstring.push(d.lgid);
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                    //search by EIAF project number - precede search with #
                    if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                        searchstring.push(("#" + d.projectnmbr));
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                    //search by EIAF project number - precede search with #
                    if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                        searchstring.push(("#" + d.projectnmbr));
                        coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                    }
                });

                var data_translated: Array < Object > = data.map(d => {
                    return initial_grantdata_crunch(d, searchstring, coordinates, keys);
                });

                // remove undefineds - now life can go on without them
                // but a warning will be printed in the console (from the webworker)
                var rem_undef = data_translated.filter(d => {
                    if (d) {
                        return true;
                    } else {
                        return false;
                    }
                })

                var cities = stack_chips(rem_undef);
                cities.forEach(d => valueize(d));
                cities = cities.sort(sortNumeric);

                //create return array:  [cities,searchstring,coordinates];
                console.log('Posting message back to main script');
                postMessage([cities, searchstring, coordinates]);

                close(); //worker is finished

            }); //end d3.csv keyfile
        }); //end d3.csv data file
    } //end onmessage