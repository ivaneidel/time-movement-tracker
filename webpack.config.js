const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  watch: false,
  target: "electron-renderer",
  mode: "development",
  devtool: "inline-source-map",
  entry: `./src/renderer.tsx`,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // Injects styles into the DOM
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles SCSS to CSS
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/public/index.html",
          to: "index.html",
        },
        {
          from: "./src/models",
          to: "models",
        },
      ],
    }),
  ],
  target: "electron-main",
};
