const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const Es3ifyPlugin = require('es3ify-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  context: __dirname,
  entry: {
    main: path.resolve(__dirname, 'lib', 'entry.ts')
  },
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [new GasPlugin(), new Es3ifyPlugin(), new Dotenv()]
};
