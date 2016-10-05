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
        app: "./src/AppMain.tsx"
    },
    output: {
        path: "./build/static",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader?tsconfig=tsconfig.webpack.json"},
            {test: /\.css$/, loader: ExtractTextPlugin.extract(cssLoaderStr)},
            {test: /\.less$/, loader: ExtractTextPlugin.extract(cssLoaderStr + '!less')},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file?name=assets/[name]-[hash:3].[ext]'},
            {test: /\.json$/, loader: 'json'}
        ]
    },
    devtool: "cheap-inline-module-source-map",
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('app.css', {allChunks: true})
    ]
    //if using ts-loader
    // ts: {
    //     configFileName: "tsconfig.webpack.json"
    // }
};

function addExtras() {
    copyStaticAssets();

    if (isProduction) minifyJs();
}

addExtras();

function copyStaticAssets() {
    let copyPlugin = new CopyWebpackPlugin([
        {from: 'index.html', to: '../index.html'},
        {from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'libs/font-awesome/css'},
        {from: 'node_modules/font-awesome/fonts', to: 'libs/font-awesome/fonts'},
        {from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'libs/bootstrap/css'},
        {from: 'node_modules/bootstrap/dist/css/bootstrap.min.css.map', to: 'libs/bootstrap/css'},
        {from: 'node_modules/bootstrap/dist/fonts', to: 'libs/bootstrap/fonts'},
        {from: 'node_modules/toastr/build/toastr.min.css', to: 'libs/toastr'},
        {from: 'node_modules/react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css', to: 'libs/bootstrap-datetimepicker'}

    ], {/*OPTIONS*/});

    module.exports.plugins.push(copyPlugin);
}

function minifyJs() {
    let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    });

    module.exports.plugins.push(uglifyPlugin);
}


