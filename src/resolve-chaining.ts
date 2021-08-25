import { normalize } from '@angular-devkit/core';
import { TargetOptions } from '@angular-builders/custom-webpack';
import { CustomWebpackBuilder } from '@angular-builders/custom-webpack/dist/custom-webpack-builder';
import { Configuration } from 'webpack';
import { Schema } from './custom-webpack-schema';

export async function resolveChain(
	options: Schema, 
	workspaceRoot: string, 
	target: TargetOptions,
	browserWebpackConfig: Configuration
): Promise<Configuration> {

	const config = options.customWebpackConfig;

	return await (config.chain ?? []).reduce(async (resolved, path) => {
		return await CustomWebpackBuilder.buildWebpackConfig(
	    normalize(workspaceRoot), {...config, path},
			await resolved, options, target
		);
	}, Promise.resolve(browserWebpackConfig as Configuration));
}
