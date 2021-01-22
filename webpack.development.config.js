const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        bundle: "./src/index.js",
        blog: "./src/blog.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        index: "index.html",
        publicPath: '/dist/assets/',
        port: 9000,
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
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
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
            }
        ]
    },
    mode: "development"
}