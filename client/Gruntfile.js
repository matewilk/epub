module.exports = function(grunt){
    'use strict';

    grunt.initConfig({
        handlebars: {
            compile: {
                options: {
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': 'app/scripts/templates/*.hbs'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'app/scripts/**/*.js', 'test/spec/**/*.js']
        },

        watch: {
            handlebars: {
                files: 'app/scripts/templates/*.hbs',
                tasks: ['handlebars'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['handlebars', 'jshint']);
};