"use strict";

const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: "./client/AppMain.tsx"
    },
    output: {
        path: "./build/client",
        filename: 'bundle.js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {test: /\.js$/, loader: "source-map-loader"}
        ],
        loaders: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader?tsconfig=tsconfig.webpack.json"},
            {test: /\.css$/, loader: ExtractTextPlugin.extract("css?minimize")},
            {test: /\.less$/, loader: ExtractTextPlugin.extract("css?minimize!less")},
            {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'file?name=assets/[name]-[hash:3].[ext]'}
        ]
    },
    devtool: "cheap-inline-module-source-map",
    //devtool: "source-map",
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
}

addExtras();

function copyStaticAssets() {
    let copyPlugin = new CopyWebpackPlugin([
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


