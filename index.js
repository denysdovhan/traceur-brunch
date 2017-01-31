'use strict';

const path = require('path');
const traceurAPI = require('traceur/src/node/api.js');

class TraceurCompiler {
  constructor(config) {
    this.shouldCompile = /^app/;
    this.options = {
      modules: false,
      sourceMaps: false, // let brunch handle the sourcemaps
    };

    if (typeof config.modules.wrapper === 'string') {
      this.options.modules = config.modules.wrapper;
    }

    if (config.plugins && config.plugins.traceur) {
      this.shouldCompile = config.plugins.traceur.paths || this.shouldCompile;

      Object.assign(this.options, config.plugins.traceur.options);
    }

    this.compiler = new traceurAPI.NodeCompiler(this.options);
  }

  compile(file) {
    if (!this.shouldCompile.test(file.path)) {
      return Promise.resolve(file);
    }

    return new Promise((resolve, reject) => {
      let compiled;

      try {
        compiled = this.compiler.compile(file.data, false, false);
      } catch (e) {
        reject(e);
        return;
      }

      resolve({
        data: `${compiled}\n`,
      });
    });
  }

  get include() {
    return [path.join(__dirname, 'node_modules', 'traceur', 'bin', 'traceur-runtime.js')];
  }
}

TraceurCompiler.prototype.brunchPlugin = true;
TraceurCompiler.prototype.type = 'javascript';
TraceurCompiler.prototype.extension = 'js';

module.exports = TraceurCompiler;
