var gulp     = require('gulp');
var _        = require('underscore');
var Elixir   = require('laravel-elixir');
var tinypng	 = require('gulp-tinypng-compress');

Elixir.extend('tinypng', function(options) {

		options = _.extend({
			src: config.assetsPath + '/img',
			output: config.publicPath + '/img',
			tinypngKey: ''
		}, options);

    new Elixir.Task('tinypng', function () {
			return gulp.src(options.src + '/**/*.{png,jpg,jpeg}')
				.pipe(tinypng({
						key: options.tinypngKey,
						checkSigs: true,
						sigFile: options.src + '/.tinypng-sigs',
						log: true
					}))
				.pipe(gulp.dest(options.output))
				.pipe(new Elixir.Notification('Tinypng Complete!'))
    })
    .watch(options.src + '/**/*.{png,jpg,jpeg}')
});

