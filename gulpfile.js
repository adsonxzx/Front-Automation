// importações
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

const cssInput = './src/styles/sass/**/*.scss'
const cssOutput = './src/styles/css/'

// Funções
// compila sass
function compileSass() {
  return gulp
  .src(cssInput)
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest(cssOutput))
  .pipe(browserSync.stream())
}

// assisti arquivos
function watch(){
  gulp.watch(cssInput, compileSass)
  gulp.watch(['*.html']).on('change', browserSync.reload)
}

// cria server
function server(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

// Tarefas
gulp.task('server', server)

gulp.task('compile-sass', compileSass)

gulp.task('watch', watch)

gulp.task('default', gulp.parallel('server', 'watch'))