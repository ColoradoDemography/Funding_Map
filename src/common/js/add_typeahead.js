// @flow

module.exports = function(map: Object, searchstring: Array<string>, coordinates: Array<[number, number]>) {
    'use strict';


    var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
            var matches: Array<Object> = []; // an array that will be populated with substring matches
            var substrRegex = new RegExp(q, 'i'); // regex used to determine if a string contains the substring `q`
            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({
                        value: str
                    });
                }
            });
            cb(matches);
        };
    };
  
    //Typeahead (Name or ID Search)
    {
        $('.typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 4
        }, {
            name: 'searchstring',
            displayKey: 'value',
            source: substringMatcher(searchstring)
        });
      
        $('.typeahead').on('typeahead:select', function(e, datum) {
            //console.log('select');
            searchresult(datum);
        }).on('typeahead:autocomplete', function(e, datum) {
            //console.log('autocomplete');
            searchresult(datum);
        });


        $('.typeahead').on('keyup', function(e) {
            if (e.which == 13) {
                //console.log('pressed return');
                e.preventDefault();
                //find the selectable item under the input, if any:
                var selectables = $('.typeahead').siblings(".tt-menu").find(".tt-selectable");
                if (selectables.length > 0) {
                    $(selectables[0]).trigger('click');
                }
            }
        });

        //dropdown suggestions default to hidden.  
        $('.tt-menu').css("visibility", "hidden");
      
        //if textbox is cleared, dropdown suggestions become hidden again
        $('#slgid').on('input', function() {
            if ($('#slgid').val().length < 4) {
                $('.tt-menu').css("visibility", "hidden");
            } else {
                $('.tt-menu').css("visibility", "visible");
            }
        });
      
        $('#slgid').on('click', function() {
            //clear box on click
            $('#slgid').val("");
        });
    }

    function searchresult(result) {

        var latlng: Object;
        for (var m = 0; m < searchstring.length; m = m + 1) {
            if (result.value === searchstring[m]) {
                latlng = L.latLng(coordinates[m][1], coordinates[m][0]);
            }
        }
        map.setView(latlng, 12);
        map.fireEvent('zoomend'); //hack to refresh D3
        $('.tt-menu').css("visibility", "hidden");
    }

    $("#slgid").click(function(event) {
        event.stopPropagation();
        // Do something
    });
    $(".tt-menu").click(function(event) {
        event.stopPropagation();
        // Do something
    });
    $("#slgid").dblclick(function(event) {
        event.stopPropagation();
        // Do something
    });
    $("#slgid").mousemove(function(event) {
        event.stopPropagation();
        // Do something
    });


}