var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var express = require('express');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var opn = require('opn');
var _ = require('lodash');
var gulpUtil = require('gulp-util');
var ignore = require('gulp-ignore');
var karma = require('karma').Server;
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');
var jscs = require('gulp-jscs');
var growlNotifier = growl();
var app = express();

//concatenate JS files into one single file for reload
gulp.task('js', function () {
  gulp.src(['../js/**/*.js','../js/**/appname.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('../app.js'))	  
    .pipe(ngAnnotate())
    //.pipe(uglify().on('error', gulpUtil.log))
    .pipe(gulp.dest('.'))
});

gulp.task('jsLib', function () {
  gulp.src(['public/angular.js','public/angular-sanitize.js',
			'public/ngStorage.js','public/angular-ui-router.js',
            'public/jquery.min.js','public/navbar.js',
			'public/ui-bootstrap-tpls.min.js',
			'public/angular-breadcrumb.min.js', 'public/datepicker.js', 
			'public/ng-table.min.js', 'public/angular-wizard.js','public/angular-messages.js',])
    .pipe(sourcemaps.init())
    .pipe(concat('../applib.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('.'))
});

gulp.task('pubcss', function () {
	  gulp.src(['public/bootstrap.css','public/ui-navbar.css', 'public/ng-table.min.css', 'public/angular-wizard.css'])
	    .pipe(sourcemaps.init())
	    .pipe(concat('../cssLibi.css'))	    
	    .pipe(gulp.dest('.'))
	});

gulp.task('watch', ['js','sass'], function () {
  gulp.watch('../js/**/*.js', ['js']);
  gulp.watch('css/*.scss', ['sass']);
});

gulp.task('jscs', function() {
    gulp.src('../js/**/*.js')
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }));
});

gulp.task('jshint', function() {
	gulp.src(['../js/**/*.js'])
		.pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'))
		.pipe(notify({
		title: 'JSCS',
		message: 'JSCS Passed. Let it fly!',
		notifier: growlNotifier
		}))
});

gulp.task('sass', function () {
  gulp.src('css/*.scss')
    .pipe(sass().on('error', sass.logError))
	//.pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('../css'))
});

var serverDetails = {
	host : 'localhost',
	port : 8088
}

gulp.task('server', function(){
	app.use(express.static('../'))
	var server = app.listen(serverDetails.port, function () {
	  var host = serverDetails.host;
	  var port = server.address().port;
	  console.log("Example app listening at http://%s:%s", host, port)
	});
	
});

gulp.task('openbrowser', function() {
  opn( 'http://' + serverDetails.host + ':' + serverDetails.port , {app: 'chrome'});
});



//testing tasks

gulp.task('test', function (done) {
	console.log(__dirname);
  new karma({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('default', ['js', 'jsLib', 'pubcss', 'watch', 'server','jshint','jscs','sass','openbrowser']);