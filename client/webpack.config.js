"use strict";

const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//from command line (run with --production argument)
const isProduction = process.argv.indexOf('--production') !== -1;

let cssLoaderStr = isProduction ? 'css?minimize' : 'css';

module.exports = {
    entry: {
        app: "./src/AppMain.js"
    },
    output: {
        path: "./build/static",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".js"]
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue', exclude: /node_modules/},
            {test: /\.js$/, loader: "babel", exclude: /node_modules/, query: {presets: ['es2015']}},
            {test: /\.css$/, loader: ExtractTextPlugin.extract(cssLoaderStr)},
            {test: /\.less$/, loader: ExtractTextPlugin.extract(cssLoaderStr + '!less')},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file?name=assets/[name]-[hash:3].[ext]'},
            {test: /\.json$/, loader: 'json', exclude: /node_modules/}
        ]
    },
    devtool: "cheap-inline-module-source-map",
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('app.css', {allChunks: true})
    ],
    vue: {
        loaders: {
            //ts: 'ts'
        }
    }
};

if (isProduction) minifyJs();

function minifyJs() {
    let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    });

    module.exports.plugins.push(uglifyPlugin);
}

copyStaticAssets();

function copyStaticAssets() {
    let copyPlugin = new CopyWebpackPlugin([
        {from: 'public/static', to: ''},
        {from: 'public/index.html', to: '../'}

    ], {/*OPTIONS*/});

    module.exports.plugins.push(copyPlugin);
}