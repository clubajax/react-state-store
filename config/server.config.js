module.exports = function server (ROOT) {

	const ENV = process.env.API;
	let api = ENV === 'dev' || ENV === 'vm' ? 'https://smartar-dev.researchnow.com' : ENV;

	if (!/http/.test(api)) {
		api = `https://${api}`;
	}
	console.log('api:', api);
	return {
		// messages for errors or HMR (quite verbose)
		// Possible values are none, error, warning or info (default).
		clientLogLevel: 'none',
		port: 9002,
		host: '0.0.0.0',
		contentBase: `${ROOT}dist`,
		historyApiFallback: true,
		// if not true, css will trigger a full page reload
		hot: ENV !== 'vm',

		proxy: {
			'/api': {
				target: api,
				changeOrigin: true,
				headers: {
					Referer: api,
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
					'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
				}
			}
		},
	};
};