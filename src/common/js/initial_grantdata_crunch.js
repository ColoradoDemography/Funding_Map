// @flow

var monthNumStr = require("./util").monthNumStr;

module.exports = function(d: Object, keys: Array < Object > ) {


    if (d.program === "FML_SB106") {
        d.program = "FML";
    }


    var dateofaward: string = (d.dateofaward).split("-");
    var awrd: Date = new Date(Number("20" + dateofaward[2]), monthNumStr(dateofaward[1]), Number(dateofaward[0]));


    if (d.projectnmbr === "null") {
        d.projectnmbr = "";
    }
    if (d.projname === "null") {
        d.projname = d.program + " Distribution";
    }

  
    function matchLGID(element, index, array) {
        if (array[index].lgid === d.lgid) {
            return true;
        }
    }

    var matched_index = keys.findIndex(matchLGID);


    if (matched_index > -1) {

        var rObj = {};
        rObj['award'] = parseFloat(d.award);
        rObj['dateofaward'] = awrd;
        rObj['govname'] = keys[matched_index].govname;
        rObj['latitude'] = parseFloat(keys[matched_index].latitude);
        rObj['longitude'] = parseFloat(keys[matched_index].longitude);
        rObj['lgid'] = d.lgid;
        rObj['lgtype'] = parseInt(keys[matched_index].lgtype, 10);
        rObj['program'] = d.program;
        rObj['projectnmbr'] = d.projectnmbr;
        rObj['projname'] = d.projname;
        return rObj;
    } else {
        console.log('problem? no match for ' + d.lgid);
        console.log('please add an entry in the keypts.csv file for ' + d.lgid);
    }

}