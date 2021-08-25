import { normalize } from '@angular-devkit/core';
import { TargetOptions } from '@angular-builders/custom-webpack';
import { CustomWebpackBuilder } from '@angular-builders/custom-webpack/dist/custom-webpack-builder';
import { Configuration } from 'webpack';
import { Schema } from './custom-webpack-schema';

const setup = (options: Schema, workspaceRoot: string, target: TargetOptions) => {
	const root = normalize(workspaceRoot);
	const config = options.customWebpackConfig;
	return (base: Configuration, path: string) => {
		return CustomWebpackBuilder.buildWebpackConfig(root, {...config, path}, base, options, target);
	};
}

export async function resolveChain(
	options: Schema, 
	workspaceRoot: string, 
	target: TargetOptions,
	baseWebpackConfig: Configuration
): Promise<Configuration> {

	const { chain } = options.customWebpackConfig;
	const build = setup(options, workspaceRoot, target);

	return (chain ?? []).reduce(async (base, path) => build(await base, path), Promise.resolve(baseWebpackConfig));
}
