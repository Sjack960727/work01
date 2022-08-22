const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, "lib"),
    filename: "index.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    open: true,
    port: 30000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "font-[name].[hash:6][ext]",
        },
      },
    ],
  },
};
