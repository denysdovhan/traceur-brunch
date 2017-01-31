# traceur-brunch

Adds [Traceur](https://github.com/google/traceur-compiler) ES6 transpiler support to [Brunch](http://brunch.io).

## Usage

Install the plugin via npm with `npm install --save-dev traceur-brunch`.

Or, do manual install:

* Add `"traceur-brunch": "x.y.z"` to `package.json` of your brunch app.
  Pick a plugin version that corresponds to your minor (y) brunch version.
* If you want to use git version of plugin, add
`"traceur-brunch": "git+https://github.com/peterjosling/traceur-brunch.git"`.

**Note:** The entry in your `package.json` file must come before any other plugins which process Javascript (such as javascript-brunch).

## Config

By default all `.js` sources in your `app/` directory will be compiled and wrapped in the module wrapper specified in your brunch config. This path can be overridden in the plugin section of your `config.coffee`.

Extra options may be passed to the compiler under the `options` key in the plugin config.

```js
module.exports = {
  // ...
  plugins: {
    traceur: {
      paths: /^app/,
      options:{
        experimental: true, // Passed to traceur
      }
    }
  }
}
```
