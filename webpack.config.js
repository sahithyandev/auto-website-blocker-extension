const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const getFile = fileName => path.join(__dirname, `src/${fileName}.ts`);

module.exports = {
    mode: "development",
    entry: {
        background: getFile('background'),
        content_script: getFile('content_script')
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
                { from: "assets", to: "../" }
            ]
        })
    ]
}