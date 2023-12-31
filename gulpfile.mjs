

import gulp from 'gulp';
import watch from 'gulp-watch';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import {deleteSync} from 'del';
import autoprefixer from 'gulp-autoprefixer';


gulp.task('clean', async function(){
  deleteSync('docs')
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

gulp.task('export', function(){
  let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('docs'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('docs/css'));

  let BuildJs = gulp.src('app/js/*.js')
	.pipe(gulp.dest('docs/js'));
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('docs/fonts'));

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('docs/img'));   
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css' ,'scss', 'browser-sync', 'watch'));
