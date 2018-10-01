const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function plugins (isProd) {

	const devFiles = [
		{ from: '../test/data/product.json', to: 'product.json' },
		{ from: '../test/data/product-1-eticket.json', to: 'product-1-eticket.json' },
		{ from: '../test/data/product-2-no-eticket.json', to: 'product-2-no-eticket.json' },

		{ from: '../test/data/project-1-eticket.json', to: 'project-1-eticket.json' },
		{ from: '../test/data/project-2-price.json', to: 'project-2-price.json' },
		{ from: '../test/data/project-3-no-eticket.json', to: 'project-3-no-eticket.json' },

		{ from: '../test/data/survey.json', to: 'survey.json' },
		{ from: '../test/data/auth.json', to: 'auth.json' },

		{ from: '../test/data/survey-quotas.json', to: 'survey-quotas.json' },
		{ from: '../test/data/survey-questions.json', to: 'survey-questions.json' }
	];

	const commonFiles = [
		{ from: '../node_modules/pptxgenjs/dist/pptxgen.bundle.js', to: 'pptxgen.js' },
		{ from: '../node_modules/timezones/timezones.json', to: 'timezones.json' },
		{ from: '../node_modules/ui-shared/dist/charts.css', to: 'screen-capture-charts.css' }
	];

	const prodFiles = [
		{ from: '../node_modules/@clubajax/custom-elements-polyfill/index.js', to: 'custom-elements-polyfill.js' },
		{ from: '../node_modules/@clubajax/promise-polyfill/index.js', to: 'promise-polyfill.js' }
	];

	if (isProd) {
		return new CopyWebpackPlugin([...commonFiles, ...prodFiles]);
	}
	return new CopyWebpackPlugin([...commonFiles, ...devFiles], { debug: 'warning' });

};
