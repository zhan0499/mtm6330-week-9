const gulp = require('gulp') // load gulp
const sass = require('gulp-sass') // load gulp-sass
const browserSync = require('browser-sync').create() // load browser-sync and create an instance
const postcss = require('gulp-postcss') // load the postcss library
const autoprefixer = require('autoprefixer') // load the autoprefixer plugin
const cssnano = require('cssnano') // load the cssnano plugin

// Define a task to compile Sass and run autoprefixer and cssnano
gulp.task('sass', function () {
  const plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    cssnano()
  ]
  return gulp
    .src('scss/**/*.scss') // source of any sass files
    .pipe(sass()) // run the sass compiler on the source file
    .pipe(gulp.dest('css')) // destination for the compiled css files
    .pipe(postcss(plugins)) // apply the PostCSS plugins
    .pipe(gulp.dest('css/min')) // path to output the minified css file
    .pipe(browserSync.stream()) // run the browsersync stream
})

// Define the default task
gulp.task('default', function () {
  // initialize browserSync on the current folder
  browserSync.init({ server: './' })
  // watch for changes to any files in scss folder and its sub folders and with .scss extension, run the sass task when a change is found
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  // watch for changes to any files directly inside the js folder and on change run the task scripts
  gulp.watch('*.html').on('change', browserSync.reload)
})
