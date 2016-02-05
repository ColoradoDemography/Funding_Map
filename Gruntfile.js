module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            files: ['js/app.js', 'Gruntfile.js'],
            tasks: ['jshint', 'jsbeautifier']
        },

        jshint: ['js/app.js', 'Gruntfile.js'],

        jsbeautifier: {
            files: ['js/app.js', 'Gruntfile.js'],
            options: {}
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-jsbeautifier");

    grunt.registerTask('default', ['watch']);



};
