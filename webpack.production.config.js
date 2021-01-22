const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: "./src/index.js",
        blog: "./src/blog.js",
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "first page",
            template: "index.html",
            filename: "index.html",
            chunks: ["bundle", "index"]
        }),
        new HtmlWebpackPlugin({
            title: "second page",
            template: "blog.html",
            filename: "blog.html",
            chunks: ["blog"]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: 'assets/css/',
                      },
                }, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: 'assets/css/',
                      },
                }, 'css-loader', 'sass-loader'
             ]
            },
            {
                test: /\.(png|gpe?j|gif|webp)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        publicPath: "assets/img/",
                        outputPath: "/assets/img",
                        name: "[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        publicPath: "assets/fonts/",
                        outputPath: "/assets/fonts",
                        name: "[name].[ext]"
                    }
                }]
            }, {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        ]
    },
    mode: "production"
}