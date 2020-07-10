var path = require('path')
var webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development";//变量：{是否为开发环境的flag}



let entryUrl = './src/lib/index.js'//这地址用于打包
if (isDev) {//如果是开发环境
  entryUrl = './src/main.js';//这地址用于调试
}


module.exports = {
    plugins: [
      new webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      }),
    ],
  //entry: './src/main.js',//这地址用于调试
  entry: entryUrl,//这地址用于打包
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    // filename: 'build.js',
    filename: 'vue-dm-components.js',
    library: 'VueDmComponents',
    // libraryTarget 改为 umd 后，同时可用<script>标签引用组件
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'sass',
      }, 
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}
//这个优化可以减少80%代码体积！！！
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
