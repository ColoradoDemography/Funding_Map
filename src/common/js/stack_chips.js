// @flow

module.exports = function(data: Array < Object > ): Array < Object > {

    'use strict';


    var chipstack: Array < number > = [];

    var cities: Array < Object > = data.map(function(d) {
        var lgid = d.lgid;
        if (chipstack.hasOwnProperty(lgid)) {
            chipstack[lgid]++;
        } else {
            chipstack[lgid] = 0;
        }
        var rlat: number = (d.latitude + (0.002 * chipstack[lgid]));
        var rlng: number = d.longitude;
        d.latLng = [rlat, rlng];

        return d;
    });

    return cities;

};