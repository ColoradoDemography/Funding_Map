module.exports = function(data) {

    'use strict';


    var stackchips = [];

    var cities = data.map(function(d) {
        var lgid = d.lgid;
        if (stackchips.hasOwnProperty(lgid)) {
            stackchips[lgid]++;
        } else {
            stackchips[lgid] = 0;
        }
        var rlat = (d.latitude + (0.002 * stackchips[lgid]));
        var rlng = d.longitude;
        d.latLng = [rlat, rlng];

        return d;
    });

    return cities;

};

