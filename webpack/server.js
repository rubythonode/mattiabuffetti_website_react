const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./common');
const join = require('path').join;
const nodeExternals = require('../scripts/node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    name: 'server',
    target: 'node',
    externals: nodeExternals,
    entry: [
        join(__dirname, '../src/server/index')
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'app.server.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.styl/,
            exclude: /node_modules/,
            use: [{
                loader: 'css-loader/locals',
                options: {
                    modules: true,
                    localIdentName: '[name]__[local]--[hash:base64:5]'
                }
            }, {
                loader: 'stylus-loader'
            }]
        },{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				use: [
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}),
		},{
				test: /\.(otf|eot|svg|ttf|woff)/,
				loader: 'url-loader?limit=8192&name=dist/font/[hash].[ext]'
			},
			{
				test: /\.(png|jpg|gif|webp|)$/,
				loader: 'url-loader?limit=200000&name=dist/Img/[hash].[ext]'
			}]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
		new ExtractTextPlugin('dist/styles/main.css', {
			allChunks: true
		})
    ]
});
