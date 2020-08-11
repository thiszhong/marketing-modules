const pkg = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const banner = `marketing-modules.js v${pkg.version}
https://github.com/thiszhong/marketing-modules
Licensed MIT`;

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: production ? 'marketing-modules.min.js' : 'marketing-modules.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MarketingModulesJS',
    globalObject: 'this',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  optimization: {
    minimize: production,
    minimizer: [
      new TerserPlugin({
        parallel: require('os').cpus().length,
        terserOptions: {
          ecma: 5,
          ie8: false,
          keep_fnames: false,
          output: {
            beautify: false,
            comments: (node, {value, type}) => type == 'comment2' && value.startsWith('!')
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner })
  ]
}