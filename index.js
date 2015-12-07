var gulp     = require('gulp');
var _        = require('underscore');
var Elixir   = require('laravel-elixir');
var tinypng	 = require('gulp-tinypng-compress');
var config   = Elixir.config;

Elixir.extend('tinypng', function(options) {

    config.images = _.extend({
			src: config.assetsPath + '/img',
			output: config.publicPath + '/img',
			tinypngKey: ''
    }, config.images || {});

    new Elixir.Task('tinypng', function () {
			return gulp.src(config.images.src + '/**/*.{png,jpg,jpeg}')
				.pipe(tinypng({
						key: config.images.tinypngKey,
						checkSigs: true,
						sigFile: config.images.src + '/.tinypng-sigs',
						log: true
					}))
				.pipe(gulp.dest(config.images.output))
				.pipe(new Elixir.Notification('Tinypng Complete!'))
    })
    .watch(config.images.src + '/**/*.{png,jpg,jpeg}')
});
