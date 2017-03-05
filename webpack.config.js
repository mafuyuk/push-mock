const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),

    entry: {
        bundle: [
            './webpush.js',
            './index.js',
        ],
        sw: './sw.js'
    },

    output: {
        path: path.resolve(__dirname, './dest'),
        filename: '[name].js',
    },

    devServer: {
        contentBase: 'dest',
        inline: true,
        hot: true,
        port: 8000,
        host: 'localhost',
    },

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};