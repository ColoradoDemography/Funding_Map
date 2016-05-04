module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks


    grunt.initConfig({

        watch: {
            files: ['js/app.js', 'Gruntfile.js', 'index.html', 'package.json'],
            tasks: ['eslint', 'jsbeautifier', 'documentation']
        },

        eslint: {
            target: ['js/app.js', 'Gruntfile.js']
        },

        jsbeautifier: {
            files: ['js/app.js', 'Gruntfile.js', 'package.json'],
            options: {}

        },

        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "src/app.js": "js/app.js"
                }
            }
        },

        documentation: {
            default: {
                files: [{
                    "expand": true,
                    "cwd": "",
                    "src": ["js/app.js"]
                }],
                options: {
                    destination: "docs",
                    format: "md"
                }
            }
        }

    });


    grunt.registerTask('default', ['watch']);

};
