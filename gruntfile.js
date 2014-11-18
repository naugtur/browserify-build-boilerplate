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
                        //,standalone: "AwesomeLib" //doesn't work for some reason, I'll fix it some day
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("build", ["clean", "browserify"]);
    
    grunt.registerTask("default", ["build"]);

}