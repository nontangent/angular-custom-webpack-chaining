import { BuilderContext } from '@angular-devkit/architect';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { indexHtmlTransformFactory } from '@angular-builders/custom-webpack';
import { Configuration } from 'webpack';
import { Schema } from './custom-webpack-schema';
import { resolveChain } from './resolve-chaining';

type WebpackConfigurationTransformFactory = (options: Schema, context: BuilderContext) => ExecutionTransformer<Configuration>;

export const webpackConfigurationTransformFactory: WebpackConfigurationTransformFactory = (options, { workspaceRoot, target }) => {
	return (browserWebpackConfig) => resolveChain(options, workspaceRoot, target!, browserWebpackConfig);
};

export const getTransforms = (options: Schema, context: BuilderContext) => ({
  webpackConfiguration: webpackConfigurationTransformFactory(options, context),
  indexHtml: indexHtmlTransformFactory(options, context),
});