import { BuilderContext } from '@angular-devkit/architect';
import { normalize, getSystemPath } from '@angular-devkit/core';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { Configuration } from 'webpack';
import { 
	CustomWebpackBuilder 
} from '@angular-builders/custom-webpack/dist/custom-webpack-builder';
import { 
	indexHtmlTransformFactory
} from '@angular-builders/custom-webpack/dist/common';
import { CustomWebpackSchema } from './custom-webpack-schema';
import { CustomWebpackBuilderConfig	} from './custom-webpack-builder-config';

export async function resolveChaining(
	options: CustomWebpackSchema, 
	workspaceRoot, 
	target,
	browserWebpackConfig
) {
	const customWebpackConfig: CustomWebpackBuilderConfig 
		= options.customWebpackConfig;
	const chain = customWebpackConfig.chain || [];

	for (const path of chain) {
		browserWebpackConfig = await CustomWebpackBuilder.buildWebpackConfig(
	    normalize(workspaceRoot),
			{...customWebpackConfig, path: path},
			browserWebpackConfig,
			options,
			target
		);
	}
	return browserWebpackConfig;
}

export const customWebpackConfigTransformFactory: (
	options: CustomWebpackSchema,
	context: BuilderContext
) => ExecutionTransformer<Configuration> = (options, { workspaceRoot, target }) => browserWebpackConfig => {
	return resolveChaining(
		options,
		workspaceRoot,
		target,
		browserWebpackConfig
	);
};
  

export const getTransforms = (
	options: CustomWebpackSchema, 
	context: BuilderContext
) => ({
  webpackConfiguration: customWebpackConfigTransformFactory(options, context),
  indexHtml: indexHtmlTransformFactory(options, context),
});

