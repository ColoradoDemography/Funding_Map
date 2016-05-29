// @flow

module.exports = function(d: Object, searchstring: Array<string>, coordinates: Array<[number, number]>){
  
              //seed the search arrays
            if (searchstring.indexOf(d.govname) === -1) {
                searchstring.push(d.govname);
                coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
                searchstring.push(d.lgid);
                coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
            }
            //search by EIAF project number - precede search with #
            if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                searchstring.push(("#" + d.projectnmbr));
                coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
            }
            //search by EIAF project number - precede search with #
            if (d.program === "EIAF" && d.projectnmbr > 0 && (searchstring.indexOf(("#" + d.projectnmbr)) === -1)) {
                searchstring.push(("#" + d.projectnmbr));
                coordinates.push([parseFloat(d.longitude), parseFloat(d.latitude)]);
            }
  
}