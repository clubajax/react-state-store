const path = require('path');

const libs = 'app,ui-shared,no-dash,date-picker,data-table,base-component,react-web-component'.split(',');
const libsToBabelize = new RegExp(libs.filter(lib => !/app/.test(lib)).join('|'));

module.exports = (isProd, ROOT) => {

	const IS_IE = false;

	const browsers = isProd ?
		['Chrome >= 68', 'Safari >= 12', 'iOS >= 11', 'Firefox >= 62', 'Edge >= 15'] :
		['Chrome >= 68', 'Firefox >= 62'];

	if (IS_IE) {
		browsers.push('ie >= 11');
	}

	const babelConfig = {
		debug: true,
		// false prevents babel from transforming import/exports
		// but false also breaks ui-shared
		modules: true,

		// adds polyfills:
		//useBuiltIns: 'usage',

		// targets: { browsers }
	};

	const prodPlugs = [
		'lodash',
		'date-fns',
	];
	const devPlugs = [
		'react-hot-loader/babel'
	];

	const commonPlugs = [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-transform-modules-commonjs'
	];
	const babelPlugins = (isProd ? prodPlugs : devPlugs).concat(commonPlugs);

	if (IS_IE) {
		// correct version is important for web-components
		// not needed if not supporting IE
		babelPlugins.push('@babel/plugin-transform-classes');
	}

	const included = libs.map((lib) => {
		let filepath;
		if (/app/.test(lib)) {
			filepath = `./${lib}`;
		} else if (/ui-shared/.test(lib)) {
			filepath = `./node_modules/${lib}`;
		} else {
			filepath = `./node_modules/@clubajax/${lib}`;
		}
		return path.join(ROOT, filepath);
	});

	return {
		test: /\.jsx?$/,
		// exclude (filepath) {
		//
		// 	if (!this.babelizeLogged) {
		// 		this.babelizeLogged = true;
		// 		console.log('babelizing...');
		// 	}
		//
		// 	if (/node_modules/.test(filepath) && !libsToBabelize.test(filepath)) {
		// 		return true;
		// 	}
		//
		// 	return false;
		// },
		// include: included,
		use: {
			loader: 'babel-loader',
			options: {
				babelrc: false,
				presets: [
					'@babel/react',
					[
						'@babel/preset-env',
						babelConfig
					]
				],
				plugins: babelPlugins
			}
		}
	};
};
