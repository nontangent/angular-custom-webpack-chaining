# WIP

# Angular Custom Webpack Chaining
This is a package extends `@angular-builders/custom-webpack` for chaining configuration.

## Install
```shell
$ ng add angular-custom-webpack-chaining
```

Add webpack file path to `customWebpackConfig.chain` in `angular.json` 

```angular.json
"customWebpackConfig": {
  "chain": [
    "extra-webpack1.config.js",
    "extra-webpack2.config.js"
  ]
}

```
