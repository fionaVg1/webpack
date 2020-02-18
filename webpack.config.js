const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './index.js',
        app2: './app2.js'
    },
    output: {
        filename: '[name].js' //app.hkgd.js
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
            {
                // test: /\.less$/,
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: {
                        loader: 'style-loader',
                        options: {
                            insert: '#mydiv',
                            injectType: "singletonStyleTag"
                        }
                    },
                    use: [{
                            loader: 'css-loader',
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        overrideBrowserslist: [
                                            '>1%'
                                        ]
                                    }),
                                    require('postcss-cssnext')()
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.wy$/,
                use: './wy-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].min.css'
        }),
        new HtmlWebpackPlugin({
            //必须指定filename和template
            filename: 'index.html',
            template: './index.html',
            // minify:{
            //     collapseWhitespace:true,//压缩
            // },
            // //是否将js和css自动引入
            // inject:true,
            // //多入口的时候chunks作用就出来，指定要哪一个入口生成的文件
            chunks: ['app']
        })
    ]
}