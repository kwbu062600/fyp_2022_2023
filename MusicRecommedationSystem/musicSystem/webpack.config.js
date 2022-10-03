var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {importLoaders: 1},
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({root: loader.resourcePath}),
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body',
    }),
  ],
};
