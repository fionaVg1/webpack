'use strict';
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');//引入html-webpack-plugin
module.exports = {
    // entry:'./app.js',
    // entry:['./app.js','./app2.js'],
    //这个比较常用
    entry: {
        // app:['babel-polyfill','./app.js'],
        // app:['babel-polyfill','./index.js'],
        app: ['./app2.js','./app3.js'],
        vendor:['./vendor.js']

    },
    output: {
        //path是一个绝对路径，如果没有path，则path默认为__dirname+dist
        path:__dirname+'/dist',
        // filename:'bundle.js'
        //name为entry中的指向key值,hash为默认随机字符串，hash:4为截取前4个
        filename: 'bundle.[name].[chunkhash].js' //app.hkgd.js
    },
    mode: 'production',
    // mode: 'development',
    optimization: {
        usedExports: true,//开启后tree-shaking才有作用，原理会生成/* unused harmony export*/
        sideEffects: false,//tree-shaking
        minimizer:[
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                // include:/\/dist/,
                chunkFilter:(chunk)=>{
                    if(chunk.name === 'vendor'){
                        return false;
                    }
                    return true;
                },
                cache:false,
                parallel:true,               
            })          
        ]
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: '/node_modules/',
                //use 是使用哪个loader来处理对应的文件
                // use: {
                //     loader: 'babel-loader',
                // }
                use:['happypack/loader?id=babel']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                include: [
                    path.resolve(__dirname, "src"),
                    path.resolve(__dirname, "test")
                ],
            }
        ]
    },
    plugins: [    
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.DllReferencePlugin({
            context:path.resolve(__dirname,''),
            manifest:path.resolve(__dirname,'dll/jquery.manifest.json')
        }),
        new HappyPack({
            id:'babel',
            loaders:['babel-loader']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',           
        }),
        new HtmlWebpackPlugin({ //配置
            filename: 'index.html',//输出文件名
            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
        })
    ]
}