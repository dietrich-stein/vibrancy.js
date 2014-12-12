module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("vibrancy.jquery.json"),

		// Banner definitions
		meta: {
			banner: '/*!\n' +
				' *  <%= pkg.title %> - v<%= pkg.version %>\n' +
				' *  <%= pkg.description %>\n' +
				' *  <%= pkg.homepage %>\n' +
				' *\n' +
				' *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
				' *  This content is released under the <%= pkg.licenses[0].type %> license.\n' +
				' */\n\n'
		},

		// Concat definitions
		concat: {
			dist: {
				src: ["src/jquery.vibrancy.js"],
				dest: "dist/jquery.vibrancy-<%= pkg.version %>.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/jquery.vibrancy-<%= pkg.version %>.js"],
				dest: "dist/jquery.vibrancy-<%= pkg.version %>.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// watch for changes to source
		// Better than calling grunt a million times
		// (call 'grunt watch')
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["concat", "uglify"]);
};