/* import { CustomWebpackChainSchema } from './custom-webpack-chain-schema'; */
import { BuilderContext } from '@angular-devkit/architect';
import { ExecutionTransformer } from '@angular-devkit/build-angular';
import { 
	CustomWebpackBuilder 
} from '@angular-builders/custom-webpack/dist/custom-webpack-builder';
import { 
	indexHtmlTransformFactory
} from '@angular-builders/custom-webpack/dist/common';
import { CustomWebpackSchema } from './custom-webpack-schema';
import { Configuration } from 'webpack';
import { normalize, getSystemPath } from '@angular-devkit/core';

export interface ChainingBuilderConfig extends CustomWebpackBuilderConfig {
	chain?: string[];
}

export interface CustomWebpackChainingSchema extends CustomWebpackSchema {
	customWebpackConfig: ChainingBuilderConfig;
}

export async function test(
	options: CustomWebpackChainingSchema, 
	workspaceRoot, 
	target,
	browserWebpackConfig
) {
	const customWebpackConfig: ChainingBuilderConfig = options.customWebpackConfig;
	const chain = customWebpackConfig.chain || [];
	delete customWebpackConfig.chain;

	for (const path of chain) {
		browserWebpackConfig = await CustomWebpackBuilder.buildWebpackConfig(
	    normalize(workspaceRoot),
			{...customWebpackConfig, path: path} as CustomWebpackSchema,
			browserWebpackConfig,
			options
		);

		console.log(path);
	}

	return browserWebpackConfig;
}

export const customWebpackChainingFactory: (
	options: CustomWebpackChainingSchema,
	context: BuilderContext
) => ExecutionTransformer<Configuration> = (options, { workspaceRoot, target }) => browserWebpackConfig => {
	return test(
		options,
		workspaceRoot,
		target,
		browserWebpackConfig
	);
};


export const getTransformsChaining = (
	options: CustomWebpackChainingSchema, 
	context: BuilderContext
) => ({
  webpackConfiguration: customWebpackChainingFactory(options, context),
  indexHtml: indexHtmlTransformFactory(options, context),
});

