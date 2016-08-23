module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/client/index.js',
  output: {
    path: './public/js',
    filename: 'client.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
