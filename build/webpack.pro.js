const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    optimization: {
        minimize: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',0
            template: './index.html',
            minify: {
                collapseWhitespace: true,//压缩
            },
            // //是否将js和css自动引入
            inject: true,
        })
    ]
}