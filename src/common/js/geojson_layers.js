module.exports = function(map) {
    'use strict';

    /**
     * This function creates a popup when a field region is clicked.
     * @param {Object} feature the individual feature that was clicked on
     * @param {Object} layer the layer that the feature belongs to           
     * @returns {undefined} no return value.
     */
    function field_onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.FieldReg_N) {
            layer.bindPopup(feature.properties.FieldReg_N + " Region");
        }
    }

    function plan_onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.PlanRgn) {
            layer.bindPopup("Region " + feature.properties.PlanRgn);
        }
    }

    function score_onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.cnty) {
            layer.bindPopup("County: " + feature.properties.NAME + "<br />" + "Score: " + feature.properties.score);
        }
    }

    function county_onEachFeature(feature, layer) {
        if (feature.properties && feature.properties.NAME) {
            layer.bindPopup(feature.properties.NAME);
        }
    }

    var field = new L.geoJson(null, {
        style: require("./field_reg_style"),
        onEachFeature: field_onEachFeature
    });

    $.ajax({

        dataType: "json",
        url: "data/fieldregions.geojson",
        success: function(data) {
            $(data.features).each(function(key, data) {
                field.addData(data);
            });
        }
    }).error(function() {
        console.log('error loading fieldregions.geojson');
    });

    var plan = new L.geoJson(null, {
        style: function() {
            return {
                weight: 2,
                color: "#000",
                fillOpacity: 0
            };
        },
        onEachFeature: plan_onEachFeature
    });

    $.ajax({

        dataType: "json",
        url: "data/planningregions.geojson",
        success: function(data) {
            $(data.features).each(function(key, data) {
                plan.addData(data);
            });
        }
    }).error(function() {});

    var coutline = new L.geoJson(null, {
        style: function() { //feature
            return {
                weight: 1,
                color: "#444",
                fillOpacity: 0
            };
        },
        onEachFeature: county_onEachFeature
    }).addTo(map);

    var score = new L.geoJson(null, {
        style: require('./impact_score_style'),
        onEachFeature: score_onEachFeature
    });

    $.ajax({
        dataType: "json",
        url: "data/counties.geojson",
        success: function(data) {
            $(data.features).each(function(key, data) {
                coutline.addData(data);
            });
            $(data.features).each(function(key, data) {
                score.addData(data);
            });
        }
    }).error(function() {});


    return [score, field, plan];
}