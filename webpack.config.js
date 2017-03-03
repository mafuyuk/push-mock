const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),

    entry: {
        app: './app.js',
    },

    output: {
        path: path.resolve(__dirname, './dest'),
        filename: 'bundle.js',
    },

    devServer: {
        contentBase: 'dest',
        inline: true,
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