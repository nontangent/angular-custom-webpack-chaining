import { BuilderContext } from '@angular-devkit/architect';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import { indexHtmlTransformFactory } from '@angular-builders/custom-webpack';
import { CustomWebpackSchema } from './custom-webpack-schema';
import { resolveChaining } from './resolve-chaining';

export const customWebpackConfigTransformFactory: (
	options: CustomWebpackSchema,
	context: BuilderContext
) => ExecutionTransformer<Configuration> = (options, { workspaceRoot, target }) => browserWebpackConfig => {
	return resolveChaining(options, workspaceRoot, target, browserWebpackConfig);
};

export const getTransforms = (
	options: CustomWebpackSchema, 
	context: BuilderContext
) => ({
  webpackConfiguration: customWebpackConfigTransformFactory(options, context),
  indexHtml: indexHtmlTransformFactory(options, context),
});