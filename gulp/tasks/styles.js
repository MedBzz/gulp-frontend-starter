const { src, dest } = require('gulp')
const paths = require('../paths')
const mode = require('gulp-mode')()
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const size = require('gulp-size');

function styles() {
    return src(paths.src.styles)
    .pipe(plumber())
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass({
        sourceMap: true,
        precision: 3,
        errLogToConsole: true,
    })).on("error", sass.logError)
    .pipe(
      mode.production(
        postcss([
          // usedcss({ html: ['src/*.html'] }),
          autoprefixer(),
          cssnano(),
        ]),
      ),
    )
    .pipe(mode.development(sourcemaps.write()))
    .pipe(size({ showFiles: true }))
    .pipe(concat('app.css'))
    .pipe(mode.production(concat('app.min.css')))
    .pipe(dest(paths.build.styles))
}

module.exports = styles