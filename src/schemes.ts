module.exports = [
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/browser/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/browser/schema.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/server/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/server/schema.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/karma/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/karma/schema.json`,
  },
  {
    originalSchemaPath: '@angular-builders/custom-webpack/dist/dev-server/schema.json',
    schemaExtensionPaths: [`${__dirname}/schema.ext.json`],
    newSchemaPath: `${__dirname}/../dist/dev-server/schema.json`,
  },
];
