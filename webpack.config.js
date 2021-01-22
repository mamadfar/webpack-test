const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const Notification = require('./webpack-plugins/Notification');

const config = {
    entry: {
        bundle: "./src/index.js",
        blog: "./src/blog.js",
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        }
    },
    plugins: [
        new Notification({
            site: "devsteam.ir"
        }),
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
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
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
            }
        ]
    },
}

module.exports = (env, { mode }) => {
    let isDevelopment = mode === "development";

    if (isDevelopment) {
        config.devServer = {
            contentBase: path.resolve(__dirname, "dist"),
            compress: true,
            index: "index.html",
            publicPath: '/dist/assets/',
            port: 9000,
        };
    };

    config.module.rules.push(...[{
            test: /\.css$/i,
            use: [isDevelopment ? "style-loader" : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: 'assets/css/'
                }
            }, 'css-loader']
        },
        {
            test: /\.s[ac]ss$/i,
            use: [isDevelopment ? "style-loader" : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: 'assets/css/'
                }
            }, 'css-loader', 'sass-loader']
        },
    ]);

    if (!isDevelopment) {

        config.module.rules.push({
            test: /\.js$/i,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        });
        config.output.filename = "[name].[contenthash].js";
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        )
    }

    return config;
}