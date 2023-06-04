const HtmlWebpackPlugin = require('html-webpack-plugin');
const PLUGIN_NAME = 'RemoveTagPlugin';

class RemoveTagPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        PLUGIN_NAME,
        (data, callback) => {
          const { excludeTag } = this.options;
          data.html = data.html.replace(excludeTag, '');

          callback(null, data);
        }
      );
    });
  }
}

module.exports = RemoveTagPlugin;
