module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            files: ['js/app.js', 'Gruntfile.js', 'index.html'],
            tasks: ['jshint', 'jsbeautifier', 'prettify']
        },



        jshint: ['js/app.js', 'Gruntfile.js'],

        jsbeautifier: {
            files: ['js/app.js', 'Gruntfile.js'],
            options: {}
        },

        prettify: {
            options: {
                "indent": 4,
                "condense": true,
                "max_preserve_newlines": 4,
                "indent_inner_html": true,
            },
            html: {
                files: {
                    'index.html': ['index.html']
                }
            }
        },

        concat: {

            js: {
                src: ['jquery/jquery-2.1.4.min.js', 'jquery/jquery-ui.min.js', 'js/jQDateRangeSlider-min.js', 'js/bootstrap.min.js', 'js/typeahead.jquery.js', 'js/leaflet.js', 'js/oms.min.js', 'js/Leaflet.MakiMarkers.js', 'js/Leaflet.Modal.js', 'js/easy-button.js', 'js/leaflet.label.js', 'js/leaflet-geocoder-mapzen.min.js'],
                dest: 'build/js/bundle.js',
            }

        },

        uglify: {

            js: {
                src: 'build/js/bundle.js',
                dest: 'build/js/bundle.min.js'
            }

        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                root: '',
                rebase: 'false'
            },
            target: {
                files: {
                    'build/css/bundle.css': ['css/bootstrap.min.css', 'jquery/jquery-ui.min.css', 'jquery/jquery-ui.structure.min.css', 'jquery/jquery-ui.theme.min.css', 'css/classic-min.css', 'jquery/jquery-ui.css', 'css/leaflet.css', 'css/leaflet.modal.css', 'css/easy-button.css', 'css/leaflet-label.css', 'css/app.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    //grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'jsbeautifier', 'cssmin', 'concat', 'uglify']);
};
