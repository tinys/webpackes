const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const join = path.join
const src = path.join(__dirname,"../src")
module.exports =  {
    devtool: 'eval-source-map',
    entry: {
      index:'./src/index.js'
    },
    output: {
      path: path.join(__dirname,'..','dist'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.join(__dirname,'..', "dist"),
      compress: true,
      port: 9000
    },
    plugins: [
      // entry html
      new HtmlWebpackPlugin({
        title: 'test',
        hash: false,
        inject: false,
        appMountId: 'root',
        window: Object.assign({
          'ENV': 'dev'
        }),
        filename: 'index.html',
        template: 'src/templates/index.ejs'
      }),
      new webpack.DefinePlugin(Object.assign({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        },
        'ENV': 'dev'
      })),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        // 第一的位置不能修改
        {
          test: /\.json$/,
          loader: 'json'
        }, {
          test: /\.module\.css$/,
          loader: `style!css?modules!autoprefixer`
        },{
          test (filename) {
            return /\.css$/.test(filename) && !/\.module\.css$/.test(filename)
          },
          loader: `style!css!autoprefixer`,
        }, {
          test: /\.module\.styl$/,
          loader: `style!css?modules!autoprefixer!stylus`,
        }, {
          test (filename) {
            return /\.styl/.test(filename) && !/\.module\.styl/.test(filename)
          },
          loader: `style!css!autoprefixer!stylus`,

          include:join(src)
        }, {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          include: src,
          query: {
            'presets': [
              "babel-preset-fe"
            ],
            'compact': true,
            cacheDirectory: true
          }
        }, {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url'
        },
        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          loader: 'url',
          query: {
            limit: 10000,
            name: 'static/media/[name].[ext]'
          }
        },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=application/octet-stream'},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&minetype=image/svg+xml'},
        {
          test: /\.rt$/,
          loader: 'babel-loader',
          query: {
            'presets': [
              "babel-preset-fe"
            ],
            'compact': true,
            cacheDirectory: true
          }
        },
        {
          test: /\.rt$/,
          loader: 'react-templates-loader?modules=es6'
        },
        {
          test: /\.tpl/,
          loader: 'ejs-loader?variable=data'
        },
        {
          test: /\.module\.less/,
          loader: `style!css?modules!autoprefixer!less`
        },
        {
          test (filename) {
            return /\.less/.test(filename) && !/\.module\.less/.test(filename)
          },
          loader: `style!css!autoprefixer!less`,
        },
        {
          test: /\.txt$/,
          loader: 'raw',
        },
      ]
    }
}
