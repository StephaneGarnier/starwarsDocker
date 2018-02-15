
module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-filerev-replace');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-file-append');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-processhtml');

    var path = require('path');
   

    grunt.initConfig({
        globals: {
            buildPath: 'build/public',
            appFolder: 'public',
            staticFiles: [
                'assets/**',
                '*.json',
                '.htaccess'
            ]
        },

        bower: {
            all: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './public/bower_components',
                    cleanTargetDir: true,
                    verbose: true
                }
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                '<%= globals.appFolder %>/public.module.js',
                '<%= globals.appFolder %>/js/**/*.js'],
                options: {
                    jshintrc: true,
                    predef: ['angular']
                }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'sha256',
                length: 16
            },
            js: {
                src: ['<%= globals.buildPath %>/js/**/*.js']
            },
            images: {
                src: [
                    '<%= globals.buildPath %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '!<%= globals.buildPath %>/assets/images/dynamic/**/*'
                ]
            },
            css: {
                src: '<%= globals.buildPath %>/style/**/*.css'
            }
        },

        filerev_replace: {
            options: {
                assets_root: '<%= globals.buildPath %>/'
            },
            compiled_assets: {
                src: '<%= globals.buildPath %>/*.{css,js}'
            },
            views: {
                src: [
                    '<%= globals.buildPath %>/index.html',
                    '<%= globals.buildPath %>/views/{*.html}'
                ]
            }
        },

        useminPrepare: {
            all: '<%= globals.appFolder %>/index.html',
            options: {
                flow: {
                    all: {
                        steps: {
                            'js': [
                                'concat',
                                {
                                    name: 'uglify',
                                    createConfig: function (context, block) {
                                        var cfg = {files: []},
                                            outfile = path.join('<%= globals.buildPath %>', block.dest),
                                            filesDef = {};


                                        filesDef.dest = outfile;
                                        filesDef.src = [];
                                        context.inFiles.forEach(function (inFile) {
                                            filesDef.src.push(path.join(context.inDir, inFile));
                                        });

                                        cfg.files.push(filesDef);

                                        return cfg;
                                    }
                                }
                            ],
                            'css': [
                                'concat',
                                {
                                    name: 'cssmin',
                                    createConfig: function (context, block) {
                                        var cfg = {files: []},
                                            outfile = path.join('<%= globals.buildPath %>', block.dest),
                                            filesDef = {};

                                        filesDef.dest = outfile;
                                        filesDef.src = [];
                                        context.inFiles.forEach(function (inFile) {
                                            console.log('File: ', path.join(context.inDir, inFile));
                                            filesDef.src.push(path.join(context.inDir, inFile));
                                        });

                                        cfg.files.push(filesDef);
                                        return cfg;
                                    }
                                }
                            ]
                        },
                        post: {

                        }
                    }
                }
            }
        },

        usemin: {
            html: '<%= globals.buildPath %>/**/*.html',
            css: '<%= globals.buildPath %>/**/*.css',
            options: {
                dirs: ['<%= globals.buildPath %>'],
                assetsDirs: [
                    '<%= globals.buildPath %>',
                    '<%= globals.buildPath %>/assets/images',
                    '<%= globals.buildPath %>/style/css'
                ],
                blockReplacements: {
                    less: function (block) {
                        return '<link rel=\"stylesheet\" href=\"' + block.dest + '\"/>';
                    }
                }
            }
        },

        cssmin: {
            all: {
                files: [{
                    expand: true,
                    cwd: '<%= globals.buildPath %>/style/css',
                    src: ['styles.css'],
                    dest: '<%= globals.buildPath %>/style/css'
                }]
            }
        },

        copy: {
            prod: {
                files: [
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['index.html'], dest: '<%= globals.buildPath %>'},
                    {expand: true, cwd: '<%= globals.appFolder %>/views/', src: ['**/*.html'], dest: '<%= globals.buildPath %>/views'},
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['<%= globals.staticFiles %>'], dest: '<%= globals.buildPath %>'},
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['js/build-generated/**/*'], dest: '<%= globals.buildPath %>'},
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['.htaccess'], dest: '<%= globals.buildPath %>'},
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['js/constants/config.prod.js'], dest: '<%= globals.buildPath %>'},
                    {expand: true, cwd: '<%= globals.appFolder %>/', src: ['robots.txt'], dest: '<%= globals.buildPath %>'},
                ]
            }
        },

        clean: {
            all: ['<%= globals.buildPath %>/*']
        },

        file_append: {
            default_options: {
                files: [
                    function() {
                        return {
                            /*jshint multistr: true */
                            append: "\nvar console = {}; \
                            \nconsole.log = function(){}; \
                            \nconsole.debug = function(){}; \
                            \nconsole.warn = function(){}; \
                            \nconsole.info = function(){}; \
                            \nconsole.error = function(){}; \
                            \nwindow.console = console;",
                            input: '.tmp/concat/js/app.js'
                        };
                    }
                ]
            }
        },

        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                cwd: '<%= globals.buildPath %>',
                src: ['<%= globals.buildPath %>/index.html', '**/*.html'],
                dest: '<%= globals.buildPath %>'
            }
        },

        processhtml: {
            options: {
                commentMarker: "process"
            },
            prod: {
                files: {
                    '<%= globals.buildPath %>/index.html': ['<%= globals.buildPath %>/index.html']
                }
            }
        }
    });

    grunt.registerTask('prod', [
        'clean:all',
        'jshint:all',
        'useminPrepare:all',
        'concat:generated',
        'file_append',
        'uglify:generated',
        'copy:prod',
        'cssmin:generated',
        'cssmin:all',
        'filerev',
        'filerev_replace',
        'processhtml:prod',
        'usemin',
        'htmlmin:all'
    ]);
};
