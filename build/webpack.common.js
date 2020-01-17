const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pro = require('./webpack.pro.js');
const dev = require('./webpack.dev.js');
//需要一个工具合并配置
const merge = require('webpack-merge');
module.exports = env => {
    var postPlugins = [
        require('autoprefixer')({
            overrideBrowserslist: [
                '>1%'
            ]
        }),
        require('postcss-cssnext')()
    ];
    if(env === 'production'){
        postPlugins.push( require('postcss-sprites')({
            spritePath:'dist/sprite',
            retina:true
        }));
    }
    var common = {
        entry: {
            app: './index.js',            
        },
        output: {
            filename: '[name].js'//app.hkgd.js
        },
        module: {
            rules: [
                {
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
                        },
                        use: [
                            {
                                loader: 'css-loader',
                            }, 
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: postPlugins
                                }
                            },
                            {
                                loader: 'less-loader'
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: env === 'production'?'[name].min.css':'[name].css'
            }),           
        ]
    };
    return merge(common,env === 'production'?pro : dev);
}