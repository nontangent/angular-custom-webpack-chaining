# Angular Custom Webpack Chaining
This is a package extends `@angular-builders/custom-webpack` for chaining webpack config function.

## Support
Angular 12++

## Install
```shell
$ ng add angular-custom-webpack-chaining
```

Add webpack file path to `customWebpackConfig.chain` in `angular.json` 

```angular.json
"projects": {
  "app": {
    "architect": {
      "build": {
        "builder": "angular-custom-webpack-chaining:browser",
      },
      "options": {
        "customWebpackConfig": {
          "chain": [
            "plugin-a.config.js",
            "plugin-b.config.js"
          ]
        }
      }
    }
  }
}
```

`plugin-a.config.js`
```plugin-a.config.js
const webpack = require('webpack');

module.exports = (config, options, targetOptions) => ({
  ...config, plugins: [...config.plugins, PLUGIN_A],
});
```

`plugin-b.config.js`
```plugin-b.config.js
const webpack = require('webpack');

module.exports = (config, options, targetOptions) => ({
  ...config, plugins: [...config.plugins, PLUGIN_B],
});
```

output webpack config is following.

```output.webpack.json
{
  plugin: [
    PLUGIN_A,
    PLUGIN_B,
  ]
}
```

