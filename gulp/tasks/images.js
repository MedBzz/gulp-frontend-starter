const { src, dest } = require('gulp')
const paths = require('../paths')
const mode = require('gulp-mode')()
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const size = require('gulp-size');

const config = {
    mozjpeg: { quality: 75, progressive: true },
    optipng: { optimizationLevel: 5 },
    svgo: {
      plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
    },
};
  
function images() {
    return src(paths.src.images)
    .pipe(newer(paths.build.images))
    .pipe(
        mode.production(
            imagemin([
                imagemin.mozjpeg(config.mozjpeg),
                imagemin.optipng(config.optipng),
                imagemin.svgo(config.svgo),
            ]),
        ),
    )
    .pipe(size({ showFiles: true }))
    .pipe(dest(paths.build.images));
};
  
module.exports = images;