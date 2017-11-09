var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!sass')
			},
			{
				test: /\.(otf|eot|svg|ttf|woff)/,
				loader: 'url-loader?limit=8192'
			},
			{
				test: /\.(png|jpg|)$/,
				loader: 'url-loader?limit=200000'
			},
        ]
    },
    plugins: [
        new ExtractTextPlugin('dist/styles/main.css', {
            allChunks: true
        })
    ]
};