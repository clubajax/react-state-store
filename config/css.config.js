// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let css;

function createCss (isProd) {

	if (!css) {
		// const plugins = {
		// 	main: new MiniCssExtractPlugin({
		// 		filename: isProd ? 'style.[chunkhash].css' : 'style.css'
		// 	})
		// };

		const rules = {
			main: {
				test: /\.s?css$/,
				use: [
					isProd ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: { sourceMap: true }
					}
				]
			}
		};
		css = {
			// plugins,
			rules
		};
	}
	return css;
}

module.exports = function cssConfig (isProd) {
	return createCss(isProd);
};
