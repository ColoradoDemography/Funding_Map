module.exports = function(map, daterange, refreshdata) {
    'use strict';

    // create the control
    var sliderctrl = L.control({
        position: 'bottomleft'
    });
    sliderctrl.onAdd = function() {
        var div = L.DomUtil.create('div', 'sl');
        div.width = 400;
        div.innerHTML = '<div id="slider"></div>';
        return div;
    };
    sliderctrl.addTo(map);


    //disable click propogation to map below
    var diva = L.DomUtil.get('slider');
    L.DomEvent.disableClickPropagation(diva);
    var browserwidth = $(window).width();
    $('.sl').width((browserwidth - 100) + "px");
    $(window).resize(function() {
        var browserwidth = $(window).width();
        $('.sl').width((browserwidth - 100) + "px");
    });


    $("#slider").dateRangeSlider({
        bounds: {
            min: new Date(2012, 0, 1),
            max: daterange.maxdate
        },
        defaultValues: {
            min: daterange.mindate,
            max: daterange.maxdate
        },
        step: {
            days: 1
        }
    });
    $("#slider").bind("valuesChanged", function(e, data) {
        daterange.mindate = data.values.min;
        daterange.maxdate = data.values.max;
        refreshdata();
    });




};