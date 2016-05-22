module.exports = function(map, refreshdata) {
    'use strict';

    //Custom Layer Control
    var command = L.control({
        position: 'topleft'
    });
    command.onAdd = function() {
        var div = L.DomUtil.create('div', 'command bord');
        div.innerHTML = '<ul><li><a href="#tabs-1">Legend</a></li><li><a href="#tabs-2">Options</a></li></ul>' +
            '<div id="tabs-1">' +
            '<form><h4>Programs</h4>' +
            '&nbsp;&nbsp;&nbsp;<img src="images/blue_chip.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Federal<br />' +
            '&nbsp;&nbsp;&nbsp;<img src="images/red_chip.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;State<br />' +
            '&nbsp;&nbsp;&nbsp;<img src="images/green_chip.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Formula<br />' +
            '&nbsp;&nbsp;&nbsp;<img src="images/purple_chip.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Special<br />' +
            '&nbsp;&nbsp;&nbsp;<img src="images/grey_chip.png" style="position: relative; top: 2px;" />&nbsp;&nbsp;&nbsp;Disaster Recovery<br />' +
            '<h4>Organization Type</h4>' +
            '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#10022;</span>&nbsp;&nbsp;&nbsp;City<br />' +
            '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9733;</span>&nbsp;&nbsp;&nbsp;County<br />' +
            '&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9642;</span>&nbsp;&nbsp;&nbsp;&nbsp;District<br />' +
            '&nbsp;&nbsp;&nbsp;<span style="font-size:16px;" >&#9899;</span>&nbsp;&nbsp;&nbsp;Other</form></div>' +
            '<div id="tabs-2">' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="cdbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)">Community Development Block Grants</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="csbg" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,0,255)">Community Services Block Grants</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="eiaf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Energy/Mineral Impact Assistance Fund</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="game" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Limited Gaming Impact Program</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="redi" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(255,0,0)">Rural Economic Development Initiative</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ctf" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Conservation Trust Fund</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="fmldd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Federal Mineral Lease Direct Distribution</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="fmlddsb106" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Federal Mineral Lease Supplemental Distribution</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sevedd" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(0,126,0)">Severance Direct Distribution</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="ffb" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Firefighter Cardiac Benefit Program</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="sar" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Search and Rescue</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="vfp" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(126,0,126)">Volunteer Firefighter Pension Fund</span><br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="dr" type="checkbox" checked />&nbsp;&nbsp;&nbsp;<span style="color:rgb(100,100,100)">Disaster Recovery Grant</span><br />' +
            '<hr>' + '&nbsp;&nbsp;&nbsp;<input class="leg" id="city" type="checkbox" checked />&nbsp;&nbsp;&nbsp;City<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="county" type="checkbox" checked />&nbsp;&nbsp;&nbsp;County<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="district" type="checkbox" checked />&nbsp;&nbsp;&nbsp;District<br />' +
            '&nbsp;&nbsp;&nbsp;<input class="leg" id="other" type="checkbox" checked />&nbsp;&nbsp;&nbsp;Other<br />' +
            '</div>';
        return div;
    };
    command.addTo(map);


    $(".command").tabs();


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
    document.getElementById("fmlddsb106").addEventListener("click", function() {
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

  var a = document.getElementsByClassName('leaflet-control-container')[0];
  a.addEventListener('dblclick', function(event){
    
    event = event || window.event // cross-browser event
    if (event.stopPropagation) {
        event.stopPropagation()
    } else {
        event.cancelBubble = true
    }

  });
  a.addEventListener('mousemove', function(event){
    
    event = event || window.event // cross-browser event
    if (event.stopPropagation) {
        event.stopPropagation()
    } else {
        event.cancelBubble = true
    }

  });

}