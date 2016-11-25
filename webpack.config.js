var path=require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 页面的URL生成
var pageURL = function (arr, root) {
    var tempArr = [];
    arr.forEach(function (item) {
        tempArr.push(root + '/' + item + '/' + item + '.js');
    });
    return tempArr;
}
module.exports={
    entry: ['./src/index.js'].concat(pageURL(['login', 'submit', 'profile', 'history'], './src/pages')),
    output:{
        path: path.resolve(__dirname, "build"),
        // publicPath: "src/libs/",
        filename: "index_bundle.js",
        //chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [    //加载器
            {test: /\.css$/, loader: 'style!css'}, // loader:ExtractTextPlugin.extract("style", "css") },
            {test: /\.html$/, loader: 'html'}
        ]
    },
    externals: {
    jquery: 'window.$'
    },
    resolve: {
        root: 'src',
        alias: {
            'model': 'model/model.js',
            'template': 'libs/template-native.js',
            // 'tips': 'modules/tips/tips.js'
            'modulesPath': path.join(__dirname, "src/modules")
        }

    },
    plugins:[
        // new ExtractTextPlugin("css/[name].css"),    //单独使用style标签加载css并设置其路径
        new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML
            // favicon:'./src/img/favicon.ico', //favicon路径
            filename:'index.html',    //生成的html存放路径，相对于 path
            template:'src/index.html',    //html模板路径
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        })
    ],
    devServer: {
        proxy: {
            '/Report/*': {
                target: 'http://iip.whu.edu.cn',
                secure: false
            }
        }
    }
};