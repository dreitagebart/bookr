const path = require('path')

const entryPath = path.resolve(__dirname, 'main.js')
const outputPath = path.resolve(__dirname, 'build')

module.exports = {
  node: {
    __dirname: false,
    process: false,
    Buffer: false
  },
  devtool: 'source-map',
  entry: entryPath,
  target: 'electron-renderer',
  mode: 'production',
  resolve: {
    modules: ['node_modules', path.resolve(__dirname)],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: outputPath,
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {}
          }
        ]
      }
    ]
  }
  // externals: [
  //   {
  //     './cptable': 'var cptable',
  //     '../xlsx': 'var _XLSX'
  //   }
  // ]
}
