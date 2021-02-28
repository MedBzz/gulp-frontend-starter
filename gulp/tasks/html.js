const { src, dest } = require('gulp');
const paths = require('../paths');
const nunjucks = require('gulp-nunjucks');
const beautify = require('gulp-beautify');

const data = {
    name: 'Starter Kit'
}

function html() {
    return src(paths.src.html)
    .pipe(nunjucks.compile(data))
    .pipe(beautify.html({ indent_size: 4 }))
    .pipe(dest(paths.build.html))
}

module.exports = html;