const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const cssFn = require('./css.config');
const pkg = require('../package.json');
const copy = require('./copy.config');

module.exports = function plugins (isProd, ROOT, buildServer) {

	const css = cssFn(isProd);

	console.log('pkg', pkg.dependencies['ui-shared']);
	const ENV = isProd ? 'production' : process.env.API === 'dev' ? 'dev' : process.env.API;

	console.log('process.env.API', process.env.API);

	const clean = new CleanWebpackPlugin(['dist'], {
		root: ROOT,
		verbose: true,
		dry: false
	});

	const define = new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(ENV)
		},
		LIB_VERSION: JSON.stringify(pkg.dependencies['ui-shared']),
		RELEASE_VERSION: JSON.stringify(process.env.RELEASE_VERSION || 'local'),
		GIT_COMMIT: JSON.stringify(process.env.GIT_COMMIT || 'local'),
		COMMIT_DATE: JSON.stringify(process.env.COMMIT_DATE || 'local'),
		SENTRY_URL: JSON.stringify('https://43cc8eba28734fb28d773f80d1bea1f9@sentry.io/127234'),
	});

	const cssMinify = new OptimizeCSSAssetsPlugin({
		cssProcessor: cssnano,
		cssProcessorOptions: {
			discardComments: {
				removeAll: true,
			},
			// Run cssnano in safe mode to avoid
			// potentially unsafe transformations.
			safe: true,
		},
	});

	const hmr = new webpack.HotModuleReplacementPlugin();
	const names = new webpack.NamedModulesPlugin();
	const force = new CaseSensitivePathsPlugin();
	const html = new HtmlWebpackPlugin({
		title: 'AR Module',
		filename: 'index.html',
		template: 'index.html'
	});


	const analyzer = new BundleAnalyzerPlugin({
		analyzerMode: 'server',
		analyzerHost: '127.0.0.1',
		analyzerPort: 8888,
		reportFilename: 'report.html',
		openAnalyzer: false
	});

	let lastPct;
	const progress = new ProgressPlugin((percentage, msg, current, active, modulepath) => {
		const pct = Math.floor(percentage * 10);
		if (lastPct !== pct) {
			console.log(!pct ? '0%' : `${pct}0%`);
			lastPct = pct;
			if (percentage === 1) {
				setTimeout(() => {
					console.log('build complete');
					if (buildServer) {
						console.log('starting server...');
						require('./build-server');
					}
				}, 30);
			}
		}
	});
	const common = [define, css.plugins.main, html, force, progress];
	const dev = [hmr, names]; //, analyzer

	const prod = [clean, cssMinify];

	return isProd ?
		[...common, ...prod] :
		[...common, ...dev];
};
