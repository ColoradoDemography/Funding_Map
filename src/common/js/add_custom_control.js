// @flow

module.exports = function(map: Object, refreshdata: Function) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });

    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = //'<ul><li><a href="#tabs-1">Options</a></li>' + //<a href="#tabs-2">Legend</a></li></ul>' +
            //'<div id="tabs-2">' +
            // '<form><h4>Funding Source</h4>' +
            // '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="blue" /></svg>&nbsp;&nbsp;&nbsp;Federal<br />' +
            // '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="red" /></svg>&nbsp;&nbsp;&nbsp;State<br />' +
            // '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="green" /></svg>&nbsp;&nbsp;&nbsp;Formula<br />' +
            // '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="purple" /></svg>&nbsp;&nbsp;&nbsp;Special<br />' +
            // '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="grey" /></svg>&nbsp;&nbsp;&nbsp;Disaster Recovery<br />' +
            // '<h4>Organization Type</h4>' +
            // '&nbsp;&nbsp;<span style="padding-left: 4px; font-size: 15pt; line-height: 15pt;">&#10022;</span>&nbsp;&nbsp;&nbsp;City<br />' +
            // '&nbsp;&nbsp;<span style="padding-left: 4px; padding-right: 1px; font-size: 14pt; line-height: 15pt;">&#9733;</span>&nbsp;&nbsp;&nbsp;County<br />' +
            // '&nbsp;&nbsp;<span style="padding-left: 8px; padding-right: 5px; font-size: 9pt; line-height: 15pt;">&#9632;</span>&nbsp;&nbsp;&nbsp;District<br />' +
            // '&nbsp;&nbsp;<span style="padding-left: 7px; padding-right: 3px; font-size: 12pt; line-height: 15pt;">&#9650;</span>&nbsp;&nbsp;&nbsp;Other</form></div>' +

            //'</br><div id="tabs-1"><h4 style="margion-top: 10px margin-bottom: 10px;">Programs&nbsp;&nbsp;<span id="prgbtn" class="ui-button ui-widget ui-state-default ui-corner-//all ui-button-icon-only" role="button" aria-disabled="false" style="margin-top: -10px; margin-left: 20px;" title="Project Type" ><span class="ui-button-icon-//primary ui-icon ui-icon-help"></span><span class="ui-button-text">Project Type</span></span></h4>' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="bb" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,255,0)" title="Broadband">Broadband</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="cap" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,255,0)" title="Capacity">Capacity</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="dr" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Drainage">Drainage</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ed" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,255,0)" title="Economic Development">Economic Development</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="en" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,255,0)" title="Energy">Energy</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="hhs" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Health and Human Services">Health and Human Services</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="hous" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Housing">Housing</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="pr" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(150,0,150)" title="Parks and Recreation">Parks and Recreation</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="pcd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Planning/Community Development">Planning/Community Development</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="pf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(150,0,150)" title="Public Facilities">Public Facilities</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ps" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(150,0,150)" title="Public Safety">Public Safety</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="road" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(150,0,150)" title="Road/Street">Road/Street</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sew" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Sewer">Sewer</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="wat" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Water">Water</span><br />' +
            
            '<hr>' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;&nbsp;City<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;&nbsp;County<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;&nbsp;District<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="other" type="checkbox" checked />&nbsp;&nbsp;&nbsp;Other<br />' +
            '</div>';
        return div;
    };
    command.addTo(map);


    $(".command").tabs();


    $("#prgbtn").on('click', function() {
        require("./info_modal.js")(map);
    });

    document.getElementById("bb").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("cap").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("dr").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ed").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("en").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("hhs").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("hous").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("pr").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("pcd").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("pf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ps").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("road").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("sew").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("wat").addEventListener("click", function() {
        refreshdata();
    }, false);
   
    
    document.getElementById("city").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("county").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("district").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("other").addEventListener("click", function() {
        refreshdata();
    }, false);

    var a: Object = document.getElementsByClassName('leaflet-control-container')[0];
    a.addEventListener('dblclick', function(event) {

        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }

    });
    a.addEventListener('mousemove', function(event) {

        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }

    });

}