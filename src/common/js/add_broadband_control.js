module.exports = function(map){
  
           //Custom Control - broadband link
         var bband = L.control({
             position: 'bottomleft'
         });

         bband.onAdd = function() {
             var div = L.DomUtil.create('div', 'lnk');
             div.innerHTML = '<a href="http://dola.colorado.gov/gis-cms/content/interactive-broadband-map">Colorado Broadband Grant Map</a>';
             return div;
         };
         bband.addTo(map);
  
  
  
}