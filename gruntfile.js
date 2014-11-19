module.exports = function (grunt) {
    var package = grunt.file.readJSON("package.json");

    grunt.initConfig({
        pkg: package,
        clean: ["dist"],
        browserify: {
            dist: {
                files: {
                    "dist/awesome.js": ["src/myawesomelib.js"]
                },
                options: {
                    browserifyOptions: {
                        fullPaths: false,
                        insertGlobals: false,
                        detectGlobals: true, //globals from node - sometimes you don't need them
                        standalone: "<%=pkg.name %>" //doesn't work for some reason, I'll fix it some day
                    }
                }
            }
        },
        //don't use this at all if you don't care much about the size
        unpathify: {
            files: ["dist/awesome.js"],
            options: {
                packOptions: {
                    standalone: "<%=pkg.name %>" //unpathify rebuilds the bundle, so standalone should be set here
                }
            }
        },

        uglify: {
            options: {
                report: "gzip", //only shows with --verbose in current version
                banner: "// <%= pkg.name %> v<%= pkg.version %> \n" +
                    "// license:<%= pkg.license %> \n" +
                    "// <%= pkg.author %> \n" +
                    "// built <%= grunt.template.today('yyyy-mm-dd') %> \n" //remember the newline! :)
            },
            dist: {
                files: [{
                    src: 'dist/*.js', // source files mask
                    dest: 'dist/', // destination folder
                    expand: true, // allow globbing src
                    flatten: true, // remove all unnecessary nesting
                    ext: '.min.js' // replace .js to .min.js
                }]
            }
        }

    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("unpathify");

    grunt.registerTask("build", ["clean", "browserify", "unpathify", "uglify"]);

    grunt.registerTask("default", ["build"]);

}