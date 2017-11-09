var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

function getDevTool() {
	if (process.env.NODE_ENV !== 'production') {
		return 'source-map'; //enables source map
	}

	return false;
}

module.exports = {
	entry: {
		main: './src/index.js'
	},
	output: {
		filename: './dist/scripts/main.js'
	},
	devtool: getDevTool(),
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		hot: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader',
					publicPath: '../../',
				}),
			},
			{
				test: /\.(otf|eot|svg|ttf|woff)/,
				loader: 'url-loader?limit=8192&name=dist/font/[hash].[ext]'
			},
			{
				test: /\.(png|jpg|gif|webp|)$/,
				loader: 'url-loader?limit=200000&name=dist/Img/[hash].[ext]'
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('dist/styles/main.css', {
			allChunks: true
		})
	]
};