module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            files: ['js/app.js', 'Gruntfile.js', 'index.html'],
            tasks: ['jshint', 'jsbeautifier']
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
        }

    });


    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    //grunt.registerTask('default', ['cssmin']);
    grunt.registerTask('default', ['watch']);

};
