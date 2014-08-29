// Gulp modules
var gulp = require('gulp'),
    minify = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less');


// Paths for tasks
var paths = {
	css: './assets/stylesheets/*.css',
	js: './assets/javascripts/*.js'
};

gulp.task('css', function(){
	return gulp.src(paths.css) 						// Take the css files
		.pipe(minify())								// Minify the css
    	.pipe(gulp.dest('./public/stylesheets/'));	// Output to public folder
});


gulp.task('js', function(){
	return gulp.src(paths.js)						// Take the js files
		// .pipe(minify())								// Minify the js
		.pipe(gulp.dest('./public/javascripts'));	// Output to public folder
});


gulp.task('serve', function(){
	nodemon({
		script: 'app.js',							// Main server file
		ext: 'js',									// Only restart when js files are changed	
		ignore: ['/assets/**', '/public/**'] 		// But don't restart the server for the client-js files
	}).on('restart', function(){
		console.log('restarted! ' + (new Date()));
	});
});


gulp.task('watch', function(){

	livereload.listen();

	gulp.watch('assets/less/*.less', ['less']);
	gulp.watch(['public/**/*', 'templates/**/*jade'])
		.on('change', function(file){
			livereload.changed(file.path);
		});

});


gulp.task('less', function(){
	return gulp.src('./assets/less/style.less')
		.pipe(less())
		.pipe(minify())
		.pipe(gulp.dest('./public/css'));
});


gulp.task('build', ['less', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);

