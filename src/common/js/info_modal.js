// @flow

module.exports = function(map: Object) {
    'use strict';

    map.openModal({
        content: '<table class="abbrev">' +
            '<tr><td><span class="ttext">CDBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-development-block-grant-cdbg" class="blue" target="_blank" >Community Development Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CSBG:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/community-services-block-grant-csbg" class="blue" target="_blank" >Community Services Block Grants</a></span></td></tr>' +
            '<tr><td><span class="ttext">CTF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/conservation-trust-fund-ctf" class="blue" target="_blank" >Conservation Trust Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">EIAF:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/energymineral-impact-assistance-fund-eiaf" class="blue" target="_blank" >Energy/Mineral Impact Assistance Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">FFB:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/firefighter-cardiac-benefit-program" class="blue" target="_blank" >Firefighter Cardiac Benefit Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">FML:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Federal Mineral Lease Direct Distribution</a></span></td></tr>' +
            '<tr><td><span class="ttext">GAME:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/limited-gaming-impact-program" class="blue" target="_blank" >Limited Gaming Impact Program</a></span></td></tr>' +
            '<tr><td><span class="ttext">REDI:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="http://www.advancecolorado.com/blueprint/regional-partners/rural-economic-development-initiative-redi-grant-program-0" class="blue" target="_blank" >Rural Economic Development Initiative</a></span></td></tr>' +
            '<tr><td><span class="ttext">SAR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/search-and-rescue-fund" class="blue" target="_blank" >Search and Rescue</a></span></td></tr>' +
            '<tr><td><span class="ttext">SEVEDD:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/direct-distribution-severance-tax-federal-mineral-lease" class="blue" target="_blank" >Severance Direct Distribution</a></span></td></tr>' +
            '<tr><td><span class="ttext">VFP:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/volunteer-firefighter-pension-fund-vfp" class="blue" target="_blank" >Volunteer Firefighter Pension Fund</a></span></td></tr>' +
            '<tr><td><span class="ttext">DR:</span></td><td><span class="desctext">&nbsp;&nbsp;<a href="https://www.colorado.gov/pacific/dola/disaster-recovery" class="grey" target="_blank" >Disaster Recovery Grants</a></span></td></tr>' +
            '</table><br />' +
            '<a id="bblink" href="http://dola.colorado.gov/gis-cms/content/interactive-broadband-map" target="_blank">Colorado Broadband Grant Map</a><br />'
    });


}