var traceur = require('traceur'),
	path = require('path');

function TraceurCompiler(config) {
	this.config = config
}

TraceurCompiler.prototype.brunchPlugin = true;
TraceurCompiler.prototype.type = 'javascript';
TraceurCompiler.prototype.extension = 'js';

TraceurCompiler.prototype.compile = function(data, path, callback) {
	var es5 = traceur.compile(data, {
		sourceMaps: this.config.sourceMaps,
		filename: path,
		modules: false
	});

	callback(null, {
		data: es5.js,
		map: es5.generatedSourceMap
	});
};

TraceurCompiler.prototype.include = [
	path.join(__dirname, 'node_modules', 'traceur', 'bin', 'traceur-runtime.js')
];

module.exports = TraceurCompiler;