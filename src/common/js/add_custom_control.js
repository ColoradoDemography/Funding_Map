// @flow

module.exports = function(map: Object, refreshdata: Function) {
    'use strict';

    //Custom Layer Control
    var command: Object = L.control({
        position: 'topleft'
    });
  
    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = '<ul><li><a href="#tabs-1">Legend</a></li><li><a href="#tabs-2">Options</a></li></ul>' +
            '<div id="tabs-1">' +
            '<form><h4>Funding Source</h4>' +
            '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="blue" /></svg>&nbsp;&nbsp;&nbsp;Federal<br />' +
            '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="red" /></svg>&nbsp;&nbsp;&nbsp;State<br />' +
            '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="green" /></svg>&nbsp;&nbsp;&nbsp;Formula<br />' +
            '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="pruple" /></svg>&nbsp;&nbsp;&nbsp;Special<br />' +
            '&nbsp;&nbsp;&nbsp;<svg width="12" height="12"><circle cx="6" cy="6" r="6" stroke="black" stroke-width="0.2" fill="grey" /></svg>&nbsp;&nbsp;&nbsp;Disaster Recovery<br />' +
            '<h4>Organization Type</h4>' +
            '&nbsp;&nbsp;&nbsp;<span style="padding-left: 2px;">&#10022;</span>&nbsp;&nbsp;&nbsp;City<br />' +
            '&nbsp;&nbsp;&nbsp;<span style="padding-left: 2px;">&#9733;</span>&nbsp;&nbsp;&nbsp;County<br />' +
            '&nbsp;&nbsp;&nbsp;<span style="padding-left: 2px;">&#8718;</span>&nbsp;&nbsp;&nbsp;District<br />' +
            '&nbsp;&nbsp;&nbsp;<span style="padding-left: 2px;">&#9899;</span>&nbsp;&nbsp;&nbsp;Other</form></div>' +

            '<div id="tabs-2"><h4 style="margin-bottom: 10px;">Programs&nbsp;&nbsp;<span id="prgbtn" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false" style="margin-top: -10px; margin-left: 20px;" title="Program Information" ><span class="ui-button-icon-primary ui-icon ui-icon-help"></span><span class="ui-button-text">Program Information</span></span></h4>' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="cdbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Community Development Block Grants">CDBG</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="csbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Community Services Block Grants">CSBG</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="eiaf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Energy/Mineral Impact Assistance Fund">EIAF</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="game" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Limited Gaming Impact Program">GAME</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="redi" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Rural Economic Development Initiative">REDI</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ctf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Conservation Trust Fund">CTF</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="fmldd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Federal Mineral Lease Direct Distribution">FML</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sevedd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Severance Direct Distribution">SEV</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ffb" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Firefighter Cardiac Benefit Program">FFB</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sar" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Search and Rescue">SAR</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="vfp" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Volunteer Firefighter Pension Fund">VFP</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="dr" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(100,100,100)" title="Disaster Recovery Grant">DR</span><br />' +
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

    document.getElementById("cdbg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("csbg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("eiaf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("game").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("redi").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ctf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("fmldd").addEventListener("click", function() {
        refreshdata();
    }, false);

    document.getElementById("sevedd").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ffb").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("sar").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("vfp").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("dr").addEventListener("click", function() {
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