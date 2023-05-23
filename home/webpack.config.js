const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/home.js",
  output: {
    // [name] goes for the filename ex.:"index", "my-img"
    filename: "[name].[contenthash].js",
    // need resolve.path, otherwise WP will throw error
    path: path.resolve(__dirname, "./dist"),
    // publicPath was needed for WP4 and lower
    // The base path for all the assets within your application
    publicPath: "http://localhost:9001/",
  },
  devServer: {
    port: 9001,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      index: "home.html",
      writeToDisk: true,
    },
  },
  mode: "development",
  optimization: {
    // optimization of chunks ex.: Lodash Library should be in one chunk and then be used by all other chunks, and not included in each of them separately
    splitChunks: {
      chunks: "all",
      // did not get it
      minSize: 3000,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // @babel/env compiles es6 and above to es5
            presets: ["@babel/env"],
            // @babel/plugin-proposal-class-properties is needed to support Class variables now we don't need it as it is already supported
            // plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    // to reduce bundle size
    new TerserPlugin({ extractComments: false }),
    // extract css to separate file in the bundle, if we are using this plugin, we need to change all the "style-loader" in css rules to MiniCssExtractPlugin.loader
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    // to clean dist folder from old bundles
    new CleanWebpackPlugin({
      // почистить всё в корневой папке dist, и в обозначенной папке build перед командой билда
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        // path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "home.html",
      title: "Main page",
      meta: {
        description: "Main page",
      },
      minify: false,
    }),
    new ModuleFederationPlugin({
      // module name
      name: "HomeApp",
      // where the code of the module is exported
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/button/button.js",
      },
    }),
  ],
};
