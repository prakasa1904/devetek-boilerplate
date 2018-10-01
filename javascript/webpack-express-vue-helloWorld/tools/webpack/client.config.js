const path = require("path");
const appRootDir = require("app-root-dir");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const baseResolver = require("../../../shared/utils/path/baseResolver");
const { isDev, isProd, ifDev, ifProd } = require("./helper");

const {
  DIR = "",
  NODE_ENV = "development",
  HOST = "localhost",
  PORT = 9000
} = process.env;

const webpackConfig = {
  target: "web",
  context: appRootDir.get(),
  mode: NODE_ENV,
  devtool: ifDev("eval-source-map", ""),
  performance: isProd,
  entry: {
    client: `${baseResolver(`./${DIR}/src/client.js`)}`
  },
  output: {
    path: baseResolver(`./build/${DIR}/client`),
    filename: ifDev("[name].js", "[name].[hash].js"),
    publicPath: ifDev("/", "/") // change it onto full url e.g: https://cdn.devetek.com/ when using CDN
  },
  optimization: {
    minimizer: ifProd([new UglifyJsPlugin()], []),
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          filename: ifDev("[name].js", "[name].[hash].js")
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([`build/${DIR}`], {
      root: baseResolver("./"),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      template: baseResolver("./public/helloWorld.html"),
      favicon: baseResolver("./public/assets/images/favicon.ico"),
      inject: true
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
    strictExportPresence: true,
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      }
    ]
  }
};

module.exports = webpackConfig;
