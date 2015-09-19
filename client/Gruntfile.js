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
        sass: {
            compile: {
                options: {
                    trace: true
                },
                files: {
                    '.tmp/styles/main.css': ['app/styles/main.scss']
                }
            }
        },
        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/scripts/views/react',
                        src: ['**/*.jsx'],
                        dest: 'app/scripts/views/react',
                        ext: '.js'
                    }
                ]
            }
        },
        mocha: {
          test: {
            src: ['test/*.html']
          }
        },

        connect: {
          test: {
            options: {
              port: 9001,
              hostname: '*',
              keepalive: true,
              open: 'http://localhost:<%= connect.test.options.port %>/test/index.html'
            }
          }
        },

        watch: {
            handlebars: {
                files: 'app/scripts/templates/*.hbs',
                tasks: ['handlebars'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: ['app/styles/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },
            react: {
                files: ['app/scripts/views/react/*.jsx'],
                tasks: ['react'],
                options: {
                    livereload: true
                }
            }
        },

        clean: {
            options: {
                force: true
            },
            dist: ['../server/dist']
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app',
                        src: ['**'],
                        dest: '../server/dist/'
                    },
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: ['**'],
                        dest: '../server/dist/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['handlebars', /*'jshint',*/ 'sass', 'react']);

    grunt.registerTask('build', ['handlebars', 'sass','clean', 'copy']);

    grunt.registerTask('test:server', 'Launches a connect server for Mocha tests', function () {
        grunt.task.run(['connect:test']);
        grunt.log.writeln('Tests can be found at: http://localhost:9001/test/index.html');
    });
};
