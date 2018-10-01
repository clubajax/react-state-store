const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const server = require('./server.config');

const args = require('minimist')(process.argv.slice(2));

const ROOT = `${__dirname}/..`;
const PORT = '9002';
const ENV = process.env.API;
process.env.API = process.env.API || 'dev';

const isProd = args.mode === 'production';
const buildServer = args['test-build'];

const appFiles = ['./index.js'];
const appName = isProd ? '[name].[chunkhash].js' : '[name].js';

if (!isProd) {
	process.traceDeprecation = true;
}

const config = {
	mode: isProd ? 'production' : 'development',
	context: `${ROOT}/src`,
	entry: {
		app: appFiles
	},
	output: {
		filename: appName,
		path: ROOT + '/dist',
		publicPath: isProd ? '/' : ENV === 'vm' ? '/' : `http://localhost:${PORT}/`
	},
	optimization: {
		// https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
		minimize: false, //isProd,
		minimizer: [
			new UglifyJSPlugin({
				sourceMap: false,
				parallel: true,
				uglifyOptions: {
					compress: { inline: false },
					output: {
						comments: false,
						beautify: false,
						preserve_line: false,
						semicolons: false,
						indent_level: 0,
						indent_start: 0
					}
				}
			})
		]
	},

	module: {
		rules: require('./rules.config')(isProd, ROOT)
	},

	plugins: require('./plugins.config')(isProd, ROOT, buildServer),

	// eval-source-map caused bugs and creates hard-to-read source code
	devtool: isProd ? 'none' : 'inline-source-map',

	devServer: server(ROOT)
};

module.exports = config;
