const path = require('path');
//const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");


const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

module.exports = {
    context: ROOT,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" }
            ],
        })
    ],

    entry: {
        main: 'main.ts'
    },

    output: {
        filename: '[name].bundle.js',
        path: DESTINATION
    },

    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            ROOT,
            'node_modules'
        ]
    },

    module: {
        rules: [
            /****************
            * PRE-LOADERS
            *****************/
             {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              },
              {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                },
             },
             {
               test: /\.(ttf|woff|woff2|eot)$/,
               use: ['file-loader']
             },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            },
            /****************
            * LOADERS
            *****************/
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                use: 'ts-loader'
            }
        ]
    },

    devtool: 'cheap-module-source-map',
    devServer: {}
};