var gulp = require('gulp'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglifyjs'),
		cssnano = require('gulp-cssnano'),
		rename = require('gulp-rename'),
		imagemin = require('gulp-imagemin'),
		image = require('gulp-image'),
		cache = require('gulp-cache'),
		pngquant = require('imagemin-pngquant'),
		del = require('del'),
		cssconcat = require('gulp-concat-css'),
		autoprefixer = require('gulp-autoprefixer');


/*	sass=> css, добавление префиксов, вывод в css */
gulp.task('sass', function(){
	return gulp.src('app/sass/*.+(sass|scss)')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream:true}))
});


/*Минификация css-библиотек и добавление суффикса .min */
// gulp.task('css-libs', function(){
// 	return gulp.src('app/css/libs/**/*')
// 	.pipe(cssnano())
// 	.pipe(rename({
// 		basename: 'libs',
// 		suffix: '.min',
// 		extname: '.css'}))
// 	.pipe(gulp.dest('app/css'));
// });


// .pipe(rename({
// 				basename: 'libs',
// 				suffix: '.min',
// 				extname: '.css'}))




gulp.task('css-libs', function() {
    return gulp.src('app/css/libs/*.css') // Выбираем файл для минификации
        .pipe(cssconcat('./libs.min.css'))
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

/*сжатие и минификация скриптов*/
gulp.task('scripts', function(){
	return gulp.src('app/js/libs/*.js')
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});


/*	Удаляем папку dist перед сборкой, не было дублей	*/
gulp.task('clean', function() {
    return del.sync('dist');
});

/*	Оптимизация изображений	*/
gulp.task('img', function () {
  gulp.src('app/img/**/*')
    .pipe(cache(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    })))
    .pipe(gulp.dest('dist/img'));
});


/*	Livereload	*/
gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});


/*Синхронизация*/
gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function(){
	gulp.watch('app/sass/*.sass', ['sass']);
	gulp.watch('app/css/libs/*.sass', ['css-libs']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

/*	Сборка проекта	*/
gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

    var buildCss = gulp.src([ // Переносим библиотеки в продакшен
        'app/css/main.css',
        'app/css/libs.min.css'
        ])
    .pipe(cssnano()) // Сжимаем
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildLibsJs = gulp.src('app/libs/**/*') // Переносим стандарт библиотеки
    .pipe(gulp.dest('dist/libs'))

    var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));

});


gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('default', ['watch']);


