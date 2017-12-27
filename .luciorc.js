var path = require('path');

module.exports = {
  entry: './example/index.js',
  output: './gh-pages',
  babelLoaderDir: [path.join(__dirname, './src')]
};