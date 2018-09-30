const path = require("path");
const appRootDir = require("app-root-dir");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const openBrowserPlugin = require("open-browser-webpack-plugin");
const baseResolver = require("./../../../shared/utils/path/baseResolver");
const { isDev, isProd, ifDev, ifProd } = require("./helper");

const {
  DIR = "",
  NODE_ENV = "development",
  HOST = "localhost",
  PORT = 1000
} = process.env;

const envPlugins = () => {
  if (isDev) {
    // need to lazy load this plugin
    const StartServerPlugin = require("start-server-webpack-plugin");

    return [
      new StartServerPlugin("server.js"),
      new webpack.HotModuleReplacementPlugin(),
      new openBrowserPlugin({
        url: `http://${HOST}:${PORT}`
      })
    ];
  }

  return [new webpack.optimize.UglifyJsPlugin()];
};

const webpackConfig = {
  target: "node",
  context: appRootDir.get(),
  mode: NODE_ENV,
  devtool: ifDev("eval-source-map", ""),
  performance: isProd,
  entry: {
    server: `${baseResolver(`./${DIR}/app.js`)}`
  },
  output: {
    path: baseResolver(`./build/${DIR}`),
    filename: ifDev("[name].js", "[name].[hash].js"),
    publicPath: ifDev("/", "/") // change it onto full url e.g: https://cdn.devetek.com/ when using CDN
  },
  plugins: [
    ...envPlugins(),
    new CleanWebpackPlugin([`build/${DIR}`], {
      root: baseResolver("./"),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: baseResolver("./public/helloWorld.html"),
      favicon: baseResolver("./public/assets/images/favicon.ico")
    }),
    new webpack.DefinePlugin({
      __BASEDIR__: JSON.stringify(DIR),
      __ENV__: JSON.stringify(NODE_ENV),
      __HOST__: JSON.stringify(HOST),
      __PORT__: JSON.stringify(PORT)
    })
  ],
  module: {
    // Makes missing export becomes compile error
    strictExportPresence: true
  },
  ...ifProd({ externals: [nodeExternals()] }, null) // in order to ignore all modules in node_modules folder in prod
};

module.exports = webpackConfig;
