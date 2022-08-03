const path = require('path');
const html = require('html-webpack-plugin');
const workbox = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new html({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new workbox.GenerateSW({
            swDest: 'sw.js',
            skipWaiting: true,
            clientsClaim: true
        })
    ]
}