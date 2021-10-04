module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                // Task-specific options go here.
                browsers: ['last 2 versions', 'firefox > 3']
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            },
            watch:
            {
                files: ['css/style.css'],
                tasks: ['autoprefixer']
            },
            copy:
            {
                src: 'css/style.css',
                dest: 'css/styleprefixed.css'
            },
            cssmin:
            {
                target: {
                    files: {
                        'css/styleprefixed.min.css':
                            ['css/styleprefixed.css']
                    }
                }
            },
            uglify:
            {
                target: {
                    files: {
                        'js/output.min.js': ['js/*.js']
                    }
                }
            },
            imagemin:
            {
                dynamic:
                {
                    files: [
                        {
                            expand: true,
                            cwd: 'images/',
                            src: ['**/*.{jpg,png,gif}'],
                            dest: 'images/build'
                        }]
                }
            },
            concurrent:
            {
                target:
                {
                    tasks: ["watch", "autoprefixer", "imagemin"],
                    options: {
                        logConcurrentOutput: true
                    }
                }
            },
            qunit: {
                all: {
                    options: {
                        urls: [
                            'http://localhost:8000'
                        ]
                    }
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '/tests/',
                    keepalive: true,
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ['autoprefixer']);
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask("minifyNewImages", 'newer:imagemin');


};