const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const vendors = ['angular']

const PATHS = {
	app: path.resolve(__dirname, 'app/index.js'),
	build: path.join(__dirname, 'dist')
};

config = {
	entry: {
		main: PATHS.app,
		vendor: vendors
	},
	output: {
		path: PATHS.build,
		publicPath: '/dist',
		filename: '[name].[hash].js'
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				include: PATHS.app,
				exclude: /node_modules/,
				use: 'jscs-loader'
			},
			{
				test: /\.css$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
					publicPath: '/dist'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: 'file-loader'
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: '../templates/index.html',
			minify: {
				collapseWhiteSpace: true
			},
			template: './src/template.ejs'
		}),
		new ExtractTextPlugin({
			filename: 'styles.css',
			disable: false,
			allChunks: true
		}),
		new CleanWebpackPlugin([PATHS.build], {
			root: process.cwd()
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		})
	],
	devServer: {
		contentBase: PATHS.build,
		compress: true,
		open: true,
		hot: true
	}
};

module.exports = config;