const path = require("path");
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');
const serverConfig = {
  target: "node",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build")
  },
  // since we never ship the server side bundle.js down to the browser (we only ship client.js to browser),
  // we can remove the node_modules from the bundle.js file
  // to make the file lighter and app run faster
  externals:[webpackNodeExternals()]
};

module.exports = merge(baseConfig, serverConfig);