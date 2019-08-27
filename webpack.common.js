const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'cau-food-scraper',
    libraryTarget: 'umd'
  },
  target: 'node',
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: [/\.tsx?$/],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'ts-loader'
        ]
      }
    ]
  }
}
