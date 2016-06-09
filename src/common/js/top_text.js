

module.exports = function(cities){
  
  //get array 
  
  var tempkeys=[];
  var toptextarray=[];
  
  for(let i=(cities.length-1); i>0; i--){
    var citieslgid = cities[i].lgid;
    
    var existing = tempkeys.indexOf(citieslgid);
    
    if(existing===-1){
      tempkeys.push(citieslgid);
      toptextarray.push(cities[i]);
    }
    
    
  }
  
  return toptextarray;
  
}