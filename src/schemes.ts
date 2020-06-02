module.exports = [
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/browser/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/schemes/browser.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/server/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/schemes/server.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/karma/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/schemes/karma.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/dev-server/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/schemes/dev-server.json`,
  },
];
