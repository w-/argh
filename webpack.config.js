const path = require('path');

const webpack = require('webpack');
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  context: __dirname,

  // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
  entry: {
    // these are all arrays so we can easily manipulate them in any configs that consume these   
    argh: ['./src/index', ],
   
    vendors: [
      'react',
      'react-dom',
      //'bootstrap-sass',
      //'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
    ],
  },

  output: {
    path: path.resolve('assets/'),
    filename: '[name].js'
  },

  plugins: [
    // all common plugins go here
    /*
    */
    new webpack.optimize.CommonsChunkPlugin(
      "vendors", // chunkName
      "vendors.bundle.js" //fileName
    ),
  ],

  module: {
    loaders: [
      // all common loaders go here
      // bootstrap stuff
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      // scss put in per env config for optimization
      {
        test: /\.woff(\?.*$|$)/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]',
      }, {
        test: /\.woff2(\?.*$|$)/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]',
      },
      {
        test: /\.(png|jpg)(\?.*$|$)/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|ttf|svg|gif)(\?.*$|$)/,
        loader: 'file-loader',
      },
      {
        test: /\.js[x]*$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?presets[]=es2015,presets[]=react,plugins[]=transform-decorators-legacy,plugins[]=babel-plugin-transform-class-properties'],
      },
    ],
  },

  resolve: {
    modulesDirectories: ['src', 'node_modules', 'bower_components'],
    extensions: ['', '.js', '.jsx'],
  },


  // need by enzyme testing http://airbnb.io/enzyme/docs/guides/webpack.html
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
};
