const webpack = require('webpack');
const environments = 'production'; // 'production' & 'development';

module.exports = {
    entry: {
        "dragonball": "./src/index.js",
    },
    output: {
        path: __dirname + '/public/javascripts',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(environments)
        // }),
        // new webpack.optimize.UglifyJsPlugin({ comments: false,  minimize: false,
        //     sourceMap: true,
        //     debug: false })
    ]
};

