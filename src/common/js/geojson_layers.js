// @flow

module.exports = function(map: Object) {
    'use strict';


    /**
     * This function creates a popup when a field region is clicked.
     * @param {Object} feature the individual feature that was clicked on
     * @param {Object} layer the layer that the feature belongs to           
     * @returns {undefined} no return value.
     */

    function county_onEachFeature(feature, layer) {
        layer.bindPopup("County: " + feature.properties.NAME);
    }

    function plan_onEachFeature(feature, layer) {
        layer.bindPopup("Region " + feature.properties.PlanRgn);
    }

    function field_onEachFeature(feature, layer) {
        layer.bindPopup(feature.properties.FieldReg_N + " Region");
    }

    function score_onEachFeature(feature, layer) {
        layer.bindPopup("County: " + feature.properties.NAME + "<br />" + "Score: " + feature.properties.score);
    }

    var coutline: Object = new L.geoJson(null, {
        style: function() {
            return {
                weight: 1,
                color: "#444",
                fillOpacity: 0
            };
        },
        onEachFeature: county_onEachFeature
    }).addTo(map);

    var planning_region: Object = new L.geoJson(null, {
        style: require("./planning_reg_style"),
        onEachFeature: plan_onEachFeature
    });

    var field_region: Object = new L.geoJson(null, {
        style: require("./field_reg_style"),
        onEachFeature: field_onEachFeature
    });

    var impact_score: Object = new L.geoJson(null, {
        style: require('./impact_score_style'),
        onEachFeature: score_onEachFeature
    });


    var p1: Promise = new Promise(function(resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', "data/counties.geojson");
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var parsed_response = JSON.parse(xhr.responseText);
                    coutline.addData(parsed_response);
                    planning_region.addData(parsed_response);
                    field_region.addData(parsed_response);
                    impact_score.addData(parsed_response);
                    resolve("geojson file successfully loaded");
                } else {
                    console.log('Error: ' + xhr.status);
                    reject("count not load geojson file");
                }
            }
        };

    }); //end promise

    return [p1, coutline, planning_region, field_region, impact_score];

}