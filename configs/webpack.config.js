const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const paths = require('./paths');

module.exports = function getWebpackConfig(mode) {
  const production = mode === 'production';
  const development = mode === 'development';

  const src = paths.appSrc;

  const analyzeBundle = process.env.ANALYZE_BUNDLE === 'true';

  return {
    entry: paths.appIndexJs,
    devtool: "source-map",
    mode,
    // node: {
    //   fs: "empty"
    // },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".test.ts", ".test.tsx"],
      alias: {
        components: path.resolve(src, './components'),
        containers: path.resolve(src, './containers'),
        routes: path.resolve(src, './routes'),
        store: path.resolve(src, './store'),
        public: paths.appPublic,
        types: path.resolve(src, './types'),
        utils: path.resolve(src, './utils'),
        modals: path.resolve(src, './modals'),
        api: path.resolve(src, './api'),
        theme: path.resolve(src, './theme'),
        hooks: path.resolve(src, './hooks'),
        context: path.resolve(src, './context'),
        constants: path.resolve(src, './constants'),
        img: path.resolve(src, './img'),
      }
    },
    output: {
      path: paths.appBuild,
      filename: "bundle.min.js",
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'tslint-loader',
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loaders: [{ 
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }],
        },
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader"
            },
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: "file-loader?name=fonts/[name].[ext]",
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'url-loader?limit=10000',
            'img-loader'
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html"
      }),
      new CopyPlugin([
        {
          from: './public/images',
          to: './img/[name].[ext]',
          toType: 'template'
        }
      ]),
      new Dotenv({
        path: '.env', // load this now instead of the ones in '.env'
        // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      }),
      analyzeBundle && new BundleAnalyzerPlugin(),
      production && new webpack.IgnorePlugin(/redux-logger/)
    ].filter(Boolean)
  };
};
