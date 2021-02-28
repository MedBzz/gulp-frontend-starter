const { dest } = require('gulp')
const paths = require('../paths')
const mode = require('gulp-mode')()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify');
const size = require('gulp-size');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps')

function scripts() {
    return browserify({
        entries: ['./src/assets/js/app.js'],
        debug: true,
        transform: [
            babelify.configure({ presets: ['@babel/preset-env'] }),
        ],
    })
    .bundle()
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(mode.production(uglify()))
    .pipe(mode.production(concat('app.bundle.min.js')))
    .pipe(size({ showFiles: true }))
    .pipe(dest(paths.build.scripts))
}
  
module.exports = scripts;

