
module.exports = {
    // entry:'./app.js',
    // entry:['./app.js','./app2.js'],
    //这个比较常用
    entry:{
        app:['babel-polyfill','./app.js'],
        // app:['babel-polyfill','./index.js'],
        // app2:'./app2.js'
    },
    output:{
        //path是一个绝对路径，如果没有path，则path默认为__dirname+dist
        // path:__dirname+'/src/bundle',
        // filename:'bundle.js'
        //name为entry中的指向key值,hash为默认随机字符串，hash:4为截取前4个
        filename:'[name].[hash:4].js'//app.hkgd.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude:'/node_modules/',
                //use 是使用哪个loader来处理对应的文件
                use:{
                    loader:'babel-loader',                                     
                }
            } ,
            {
                test:/\.tsx?$/,          
                use:'ts-loader',              
            }          
        ]
    },
    plugins:[
        // new webpack.DefinePlugin({
        //     'process.env':require('../config/dev.env')
        // }),
        // new webpack.HotModuleReplacementPlugin()
    ]
}