module.exports = function(map) {
  
           //Custom Title Control
         var title = L.control({
             position: 'topleft'
         });
         title.onAdd = function() {
             var div = L.DomUtil.create('div', 'title bord');
             div.innerHTML = '<h2>Colorado Financial Assistance</h2>';
             return div;
         };
         title.addTo(map);
  
};

