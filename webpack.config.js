const path = require('path');

module.exports = {
    mode: 'development',
    entry: './webpack/home.js',
    output: {
        path: path.resolve(__dirname, 'assets/js'),
        filename: 'home.bundle.js',
    },
    watch: true
};