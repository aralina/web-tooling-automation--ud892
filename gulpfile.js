var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'compress'], function() {
	gulp.watch('sass/**/*.scss',['styles']);
	gulp.watch('/index.html', ['copy-html']);
	 browserSync.init({
     server: "./dist"
 });
});

gulp.task('compress', function() {
	return gulp.src('img/*')
	.pipe(imagemin( {
		progressive: true,
		use: [pngquant()]
	}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(concat('al.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
	.pipe(babel())
	.pipe(concat('al.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src('img/*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
