const del = require('del');
const paths = require('../paths');

function clean() {
    return del(paths.clean);
};

module.exports = clean;