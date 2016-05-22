var assert = require('chai').assert;

var get_color = require("../src/common/js/get_color.js");


describe('get_color', function() {

    it('should return a string', function () {
      assert.equal((typeof get_color("FML")), 'string');
    });
  
    it('should return "grey" for the DR program', function () {
      assert.equal(get_color("DR"), 'grey');
    });

    it('should return "black" if given a non-existant program', function () {
      assert.equal(get_color("BLAHBLAH"), 'black');
    });

    it('should return "black" if given null', function () {
      assert.equal(get_color(null), 'black');
    });  
});