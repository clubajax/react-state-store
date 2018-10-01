const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssFn = require('./css.config');
const pkg = require('../package.json');
// const copy = require('./copy.config');

module.exports = function plugins (isProd, ROOT, buildServer) {

	const css = cssFn(isProd);

	const ENV = isProd ? 'production' : process.env.API === 'dev' ? 'dev' : process.env.API;

	console.log('process.env.API', process.env.API);

	const hmr = new webpack.HotModuleReplacementPlugin();
	const names = new webpack.NamedModulesPlugin();
	const html = new HtmlWebpackPlugin({
		title: 'AR Module',
		filename: 'index.html',
		template: 'index.html'
	});


	const common = [html];
	const dev = [hmr, names]; //, analyzer

	const prod = [];

	return isProd ?
		[...common, ...prod] :
		[...common, ...dev];
};
