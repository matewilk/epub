module.exports = function(grunt){

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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.registerTask('default', ['handlebars']);
};