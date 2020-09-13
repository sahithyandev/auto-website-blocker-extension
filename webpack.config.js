const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const WebExtWebpackPlugin = require('@ianwalter/web-ext-webpack-plugin');
const getFile = fileName => path.join(__dirname, `src/${fileName}.ts`);

module.exports = {
    mode: "none",
    entry: {
        background: getFile('background')
    },
    output: {
        path: path.join(__dirname, "dist/src"),
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.ts/,
                use: 'ts-loader' }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "../" },
                { from: "src/popup", to: "../popup/" }
            ]
        })
        // ,
        // new WebExtWebpackPlugin({
        //     sourceDir: "./dist/"
        // })
    ],
    resolve: {
        extensions: [".ts"]
    }
}