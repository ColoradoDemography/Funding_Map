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

            '</br><div id="tabs-1"><h4 style="margion-top: 10px margin-bottom: 10px;">Programs&nbsp;&nbsp;<span id="prgbtn" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only" role="button" aria-disabled="false" style="margin-top: -10px; margin-left: 20px;" title="Program Information" ><span class="ui-button-icon-primary ui-icon ui-icon-help"></span><span class="ui-button-text">Program Information</span></span></h4>' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="cdbg" type="checkbox" />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Community Development Block Grants">Community Development Block Grants</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="chpg" type="checkbox" />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Colorado Heritage Planning Grants">Colorado Heritage Planning Grants</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="csbg" type="checkbox" />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Community Services Block Grants">Community Services Block Grants</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="dr" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)" title="Community Development Block Grant Disaster Recovery">Community Development Block Grant Disaster Recovery </span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="dcfa" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Defense Counsel on First Appearance">Defense Counsel on First Appearance</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="eiaf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Energy and Mineral Impact Assistance Fund">Energy and Mineral Impact Assistance Fund</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="game" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Local Government Limited Gaming Impact Program">Local Government Limited Gaming Impact Program</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="redi" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Rural Economic Development Initiative">Rural Economic Development Initiative</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="mj" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)" title="Marijuana Impact Grant Programs">Marijuana Impact Grant Programs</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ctf" type="checkbox"  />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Conservation Trust Fund">Conservation Trust Fund</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="fml" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Direct Distribution of Federal Mineral Lease Dollars ">Direct Distribution of Federal Mineral Lease Dollar</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sevedd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)" title="Direct Distribution of Severance Tax Dollars">Direct Distribution of Severance Tax Dollars</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ffb" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Firefighter Cardiac Benefit Program">Firefighter Cardiac Benefit Program</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sar" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Colorado Search and Rescue Program">Colorado Search and Rescue Program</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="vfp" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)" title="Volunteer Firefighter Pension">Volunteer Firefighter Pension</span><br />' +
            
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
    document.getElementById("chpg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("csbg").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("dcfa").addEventListener("click", function() {
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
    document.getElementById("mj").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("ctf").addEventListener("click", function() {
        refreshdata();
    }, false);
    document.getElementById("fml").addEventListener("click", function() {
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