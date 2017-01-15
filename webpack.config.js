/**
 * Created by brian.stallter on 12/3/2016.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
        DEV + "/index.jsx"],
    output: {
        path: OUTPUT,
        filename: "app.js",
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        // enable HMR on the server
        contentBase: OUTPUT,
        // match the output path
        publicPath: '/'
        // match the output `publicPath`
    },
    plugins: [
        //new ExtractTextPlugin('styles.css'),
        new webpack.NamedModulesPlugin(),
        /* new webpack.DefinePlugin({
             'process.env': {
                 NODE_ENV: JSON.stringify('production')
             }
         }),
         new webpack.optimize.UglifyJsPlugin()*/
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: DEV,
                loaders: ["react-hot", "babel-loader"],
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            }
        ],
    }
};

module.exports = config;