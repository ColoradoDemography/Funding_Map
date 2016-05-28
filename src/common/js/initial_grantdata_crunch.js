// @flow

var monthNumStr = require("./util").monthNumStr;

module.exports = function (d: Object, searchstring: Array<string>, coordinates: Array<[number, number]>) {
          
          

            if (d.program === "FML_SB106") {
                d.program = "FML";
            }

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


            var dateofaward: string = (d.dateofaward).split("-");
            var awrd: Date = new Date(Number("20" + dateofaward[2]), monthNumStr(dateofaward[1]), Number(dateofaward[0]));


            if (d.projectnmbr === "null") {
                d.projectnmbr = "";
            }
            if (d.projname === "null") {
                d.projname = d.program + " Distribution";
            }

            var rObj = {};
            rObj['award'] = parseFloat(d.award);
            rObj['dateofaward'] = awrd;
            rObj['govname'] = d.govname;
            rObj['latitude'] = parseFloat(d.latitude);
            rObj['longitude'] = parseFloat(d.longitude);
            rObj['lgid'] = d.lgid;
            rObj['lgstatus'] = parseInt(d.lgstatus, 10);
            rObj['lgtype'] = parseInt(d.lgtype, 10);
            rObj['program'] = d.program;
            rObj['projectnmbr'] = d.projectnmbr;
            rObj['projname'] = d.projname;
            return rObj;
        }