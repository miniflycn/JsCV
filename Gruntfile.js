module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.title %> Module <%= pkg.module %> v<%= pkg.version %> Copyright © 2012 <%= pkg.author.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dst/core.js',
				dest: 'build/core.js'
			}
		}
	});

	// Access the logMaker
	grunt.registerTask("logMaker", function( commit, configFile ) {
		var fs = require("fs"),
			done = this.async();
		fs.readFile('./src/core.js', function(err, data){
			if(err) throw err;
			data = data.toString().split(/\r\n/);
			var len = data.length,
				i = 0;
			for(; i < len; i++){
				data[i] = data[i].replace(/\/\*\s*\{line\}\s*\*\//g, ", " + (i + 1));
			}
			data = data.join("\n");
			fs.writeFile('./dst/core.js', data, function(err){
				if(err) throw err;
				done();
				console.log('complete!');
			});
		});
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['logMaker', 'uglify']);

};