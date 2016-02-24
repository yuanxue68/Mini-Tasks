var gulp = require('gulp');
var webpack = require("webpack");
var gutil = require("gulp-util");
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');

webpackConfig = {
	entry: "./app/Main.js",
	output: {
		filename: "./public/dist/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'stage-0', 'react'],
				}
			}
		]
	},
	devtool: 'source-map',
	debug: true
};

gulp.task('webpack',function(callback){
	webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
	
});

gulp.task('sass', function(){
	gulp.src('./style/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/dist'));
});

gulp.task('start', function () {
  nodemon({ script: 'server.js'
          , ext: 'js'
          , watch: ['server/**','server.js'] })
    .on('restart', function () {
      console.log('restarted!')
    });
});

gulp.task('dev', function () {
	env({
    file: '.env.js'
  });

  nodemon({ script: 'server.js'
          , ext: 'js'
          , watch: ['server/**','server.js'] })
    .on('restart', function () {
      console.log('restarted!')
    });
});


gulp.task('watch', function(){
	gulp.watch('./app/**/*.js',['webpack']);
	gulp.watch('./style/**/*.scss',['sass']);
});

gulp.task('default', ['webpack','sass','dev','watch']);
