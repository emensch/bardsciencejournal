var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	csso = require('gulp-csso'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	jade = require('gulp-jade'),
	imagemin = require('gulp-imagemin'),
	gutil = require('gulp-util'),
	del = require('del');

// Blog
gulp.task('blog_styles', function () {
	gulp.src('assets/blog/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('public/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(csso())
		.pipe(gulp.dest('public/css'));
});

gulp.task('blog_jade', function () {
	gulp.src('assets/blog/index.jade')
		.pipe(jade({ pretty: true }).on('error', gutil.log))
		.pipe(gulp.dest('public'));
	gulp.src('assets/blog/partials/*.jade')
		.pipe(jade({ pretty: true }).on('error', gutil.log))
		.pipe(gulp.dest('public/partials')); 
});

gulp.task('blog_scripts', function () {
	gulp.src(['assets/blog/js/app.module.js', 'assets/blog/js/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('public/js'));
});

gulp.task('blog_images', function () {
	gulp.src('assets/blog/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('public/images'));
});

// Admin
gulp.task('admin_styles', function () {
	gulp.src('assets/admin/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest('public/admin/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(csso())
		.pipe(gulp.dest('public/admin/css'));
});

gulp.task('admin_jade', function () {
	gulp.src('assets/admin/index.jade')
		.pipe(jade({ pretty: true }).on('error', gutil.log))
		.pipe(gulp.dest('public/admin'));
	gulp.src('assets/admin/partials/*.jade')
		.pipe(jade({ pretty: true }).on('error', gutil.log))
		.pipe(gulp.dest('public/admin/partials')); 
});

gulp.task('admin_scripts', function () {
	gulp.src(['assets/admin/js/app.module.js', 'assets/admin/js/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/admin/js'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest('public/admin/js'));
});


gulp.task('watch', function () {
	// Blog
	gulp.watch([
		'assets/blog/sass/*.scss',
		], ['blog_styles']);
	gulp.watch([
			'assets/blog/partials/*.jade', 
			'assets/blog/*.jade',
		], ['blog_jade']);
	gulp.watch([
		'assets/blog/js/**/*.js',
		], ['blog_scripts']);
	gulp.watch([
		'assets/blog/images/*'
		], ['blog_images']);
	// Admin
	gulp.watch([
		'assets/admin/sass/*.scss',
		], ['admin_styles']);
	gulp.watch([
			'assets/admin/partials/*.jade', 
			'assets/admin/*.jade',
		], ['admin_jade']);
	gulp.watch([
		'assets/admin/js/**/*.js',
		], ['admin_scripts']);
});

gulp.task('clean', function (cb) {
	del([
			'public/*.*',
			'public/css/*.*',
			'public/js/*.*',
			'public/partials/*.*',
			'public/images/*.*',
			'public/admin/*.*',
			'public/admin/css/*.*',
			'public/admin/js/*.*',
			'public/admin/partials/*.*',
		], cb);
});

gulp.task('default', ['blog_styles', 'blog_jade', 'blog_scripts', 'blog_images', 'admin_styles', 'admin_jade', 'admin_scripts']);