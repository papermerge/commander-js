const path = require('path');

let glob = require("glob");
let entry_point = path.resolve(__dirname, 'document-commander/index.ts');
let output_path = path.resolve(__dirname, 'dist');
let output_filename = "document-commander.bundle.js";
// used to map bundles to original code lines 
let devtool = "source-map";
let mode = process.env.NODE_ENV == 'production' ? 'production' : 'development';


if ( process.env.TESTBUILD ) {
  entry_point = glob.sync(__dirname + "/tests/**/*_test.ts");
  output_path = __dirname + "/test-dist/";
  output_filename = "tests.bundle.js";
}

module.exports = {
  mode: mode,
  entry: entry_point,
  output: {
    path: output_path,
    filename: output_filename,
    library: 'DocumentCommander',
  },
  module: {
    rules: [
      { // css/scss
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }, // end of css/scss rule
      {
        test: /\.html$/i,  // used in tests
        loader: 'html-loader',
      },
      {
        test: /\.svg/,
        type: 'asset/source',
      },
      {  // for js files
        test: /\.ts$/,
        exclude: ["/node_modules/"],
        use: [
          "ts-loader",
        ],
      }, // end of js rule
    ]  // end of rules
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: devtool  // correctly map sources in test mode
};