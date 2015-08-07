'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            app: ['app'],
            assets: ['assets'],
            css: ['sass/style.scss']
        },
        /*
         * Copy the files that cannot be included in dop.min.js and are already minified to assets folder.  
         */
        copy: {
            main: {
                src: [
                'bower_components/angular-translate-loader-url/angular-translate-loader-url.min.js'
                ],
                dest: '<%= project.assets %>/js/',
                flatten: true,
                expand: true
            },
            fonts: {
                src: [
                    'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.eot',
                    'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular',
                    'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf',
                    'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff',
                    'bower_components/bootstrap-sass/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2',
                ],
                dest: '<%= project.assets %>/fonts/bootstrap/',
                flatten: true,
                expand: true
            }
        },
        concat: {
            js: {
                options: {
                    separator: ';\n'
                },
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
                    'bower_components/angular-translate/angular-translate.min.js',
                    'bower_components/angular-click-outside/clickoutside.directive.js',
                    'bower_components/angular-youtube-mb/dist/angular-youtube-embed.min.js',
                    'bower_components/jsog/lib/JSOG.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/ui-select/dist/select.min.js',
                ],
                dest: '<%= project.assets %>/js/dop.min.js',
            },
            css: {
                src: [
                    '<%= project.assets %>/css/dop.min.css',
                    'bower_components/ui-select/dist/select.min.css',
                ],
                dest: '<%= project.assets %>/css/dop.min.css',
            }
        },
        uglify: {
            options: {
            },
            my_target: {
                files: {
                    '<%= project.assets %>/js/dop.min.js': ['<%= project.assets %>/js/dop.min.js'],
                    '<%= project.assets %>/js/require.min.js': ['bower_components/requirejs/require.js'],
                    '<%= project.assets %>/js/modernizr.min.js': ['bower_components/modernizr/modernizr.js']
                }
            }
        },
        cssmin: {
            options: {
                processImport: false
            },
            target: {
                files: {
                    '<%= project.assets %>/css/dop.min.css': ['<%= project.assets %>/css/dop.min.css', 'bower_components/ui-select/dist/select.min.css']
                }
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'compressed',
                    compass: false
                },
                files: {
                    '<%= project.assets %>/css/dop.min.css':'<%= project.css %>'
                }
            }
        },
        watch: {
            sass: {
                files: 'sass/{,*/}*.{scss,sass}',
                tasks: ['sass:dev', 'cssmin']
            }
        },
        clean: {
            build: ["lib", "assets", "dop.tar.gz"],
            sourcemap: ["assets/css/dop.min.css.map"]
        }, 
    	compress: {
            main: {
                clean: ["assets/css/dop.min.css.map"],
                options: {
                    archive: 'dop.tar.gz',
                    mode: 'tgz'
                },
                src: ['app/**/*', 'assets/**/*', 'img/**/*', 'index.html', 'favicon.ico']
            }
        },
        bower: {
        	install: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', ['npm-install', 'bower', 'clean:build', 'copy', 'sass', 'concat', 'cssmin', 'uglify']);
    grunt.registerTask('package', ['build', 'clean:sourcemap', 'compress']);

};