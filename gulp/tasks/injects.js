const {src, dest} = require('gulp');
const injectlib = require('gulp-inject');
const paths = require('../paths');

function injects() {
    const sources = src(
        [
            paths.inject.styles, 
            paths.inject.scripts
        ], 
        {
            read: false,
        }
    );

    return src(paths.inject.html)
    .pipe(
        injectlib(sources,{ 
            relative: true,
            removeTags: true
        })
    )
    .pipe(dest(paths.build.html));
};

module.exports = injects;